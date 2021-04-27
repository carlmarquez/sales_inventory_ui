import style, { TableOptions as options } from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Tooltip} from "@material-ui/core";
import { TransactionTable as columns, InsertTransaction as insert } from '../../../utils/tableColumn/TransactionTable'
import MUIDataTable from 'mui-datatables'
import {Fragment, useEffect, useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {transactionList} from "../../../utils/ServerEndPoint";
import SupplierRegister from "../supplier/SupplierRegister";
import Typography from "@material-ui/core/Typography";
import ReceiptIcon from '@material-ui/icons/Receipt';
import IconButton from "@material-ui/core/IconButton";
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
export const Transaction = () => {
    const classes = style()
    const [dialog, setDialog] = useState(false);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        const temp = []
        const get = async () => {
            setLoading(true)

            await baseUrlWithAuth.get(transactionList).then((transactions) => {
                transactions.data.map(transaction =>
                    temp.push(insert(transaction.id,`${transaction.User.firstName} ${transaction.User.lastName}`, transaction.amount,
                        transaction.discount,`${transaction.Customer.name}`,transaction.Store.name,transaction.createdAt))
                )
            })
            setData(...data,temp)
            setLoading(false)
        }
        get().then(ignored => {})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const insertData = (supplier) => {
        const newData = [supplier,...data]
        setData(newData)
    }

    return (
        <Fragment>
            <SupplierRegister  dialog={dialog} closeDialog={() => setDialog(false)} insertData={insertData}/>
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
                                {loading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
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


