import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Tooltip} from "@material-ui/core";
import {
    SupplierReceiptTable as columns,
    InsertSupplierReceipt as insert
} from '../../../utils/tableColumn/SupplierReceiptTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState, Fragment} from "react";

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {productImages, storeList, supplierList, supplierReceiptList} from "../../../utils/ServerEndPoint";
import SupplierReceiptCreate from "./SupplierReceiptCreate";
import SupplierReceiptDelete from "./SupplierReceiptDelete";

export const SupplierReceipt = ({user}) => {
    const classes = style()

    // for dialog
    const [supplierReceiptCreateDialog, setSupplierReceiptCreateDialog] = useState(false);
    const [supplierReceiptDeleteDialog, setSupplierReceiptDeleteDialog] = useState(false)


    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {



        getData().then()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = async () => {
        const temp = []
        await baseUrlWithAuth.get(supplierList).then(e => {
            setSuppliers(e.data)
        })

        await baseUrlWithAuth.get(supplierReceiptList).then(receipts => {
            receipts.data.map(receipt => temp.push(insert(receipt.code,receipt.description,receipt.Supplier.name, receipt.Supplier.email,receipt.Supplier.contactPerson,receipt.image)))
        }).catch(ignored => {
        })

        setData(temp)
    }

    return (
        <Fragment>
            {/*Pop up*/}
            <SupplierReceiptDelete getData={getData} dialog={supplierReceiptDeleteDialog} closeDialog={() => setSupplierReceiptDeleteDialog(false)}/>

            <SupplierReceiptCreate
                getData={getData}
                suppliers={suppliers}
                dialog={supplierReceiptCreateDialog}
                closeDialog={() => setSupplierReceiptCreateDialog(false)}/>
            {/*Table*/}
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Tooltip title="Add Receipt" aria-label="add">
                                <IconButton onClick={() => setSupplierReceiptCreateDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <AddCircleIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete Receipt" aria-label="add">
                                <IconButton onClick={() => setSupplierReceiptDeleteDialog(true)}
                                            aria-label="deleteProduct"
                                            color={"primary"}>
                                    <DeleteIcon fontSize={"large"} aria-label="Delete Product" color={"secondary"}/>
                                </IconButton>

                            </Tooltip>


                        </Box>


                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        rowSel
                        title={
                            <Typography variant="h6">
                                Supplier Receipts
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


