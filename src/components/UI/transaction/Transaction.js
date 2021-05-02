import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Tooltip} from "@material-ui/core";
import {TransactionTable as columns, InsertTransaction as insert} from '../../../utils/tableColumn/TransactionTable'
import MUIDataTable from 'mui-datatables'
import {Fragment, useEffect, useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {transactionList} from "../../../utils/ServerEndPoint";
import Typography from "@material-ui/core/Typography";
import ReceiptIcon from '@material-ui/icons/Receipt';
import IconButton from "@material-ui/core/IconButton";
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Receipt from "../../POS/checkout/Receipt";
import FindTransaction from "./FindTransaction";

export const Transaction = () => {
    const classes = style()
    const [dialog, setDialog] = useState(false)
    const [receiptDialog, setReceiptDialog] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [transaction, setTransaction] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        const temp = []
        const get = async () => {
            setLoading(true)

            await baseUrlWithAuth.get(transactionList).then((transactions) => {
                transactions.data.map(transaction =>
                    temp.push(insert(transaction.code, `${transaction.User.firstName} ${transaction.User.lastName}`, transaction.amount,
                        transaction.discount, `${transaction.Customer.name}`, transaction.Store.location, transaction.createdAt))
                )
            })
            setData(...data, temp)
            setLoading(false)
        }
        get().then(ignored => {
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateTransaction = (transaction) => {
        setItems(transaction.sales)
        setTransaction(transaction)
        setUser(transaction.transaction.User)
        setReceiptDialog(true)
    }

    return (
        <Fragment>
            <FindTransaction dialog={dialog} closeDialog={setDialog}
                             updateTransaction={updateTransaction}/>
            {
                receiptDialog === true ?
                    <Receipt

                        customer={transaction.transaction.Customer}
                        user={user}
                        transaction={transaction.transaction}
                        item={items}
                        posOn={false}
                        dialog={receiptDialog}
                        cancel={() => setReceiptDialog(false)}/> : null
            }
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Tooltip title="View Transaction" aria-label="add">
                                <IconButton onClick={() => setDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <ReceiptIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Return Item" aria-label="add">
                                <IconButton onClick={() => setDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <CompareArrowsIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                        </Box>

                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                Transaction List
                                {loading &&
                                <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}}/>}
                            </Typography>
                        }
                        data={data}
                        columns={columns}
                        options={options(loading)}
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}


