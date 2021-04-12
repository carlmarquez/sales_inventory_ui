import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Tooltip} from "@material-ui/core";
import {SupplierTable as columns, InsertSupplier as insert} from '../../../utils/tableColumn/SupplierTable'
import MUIDataTable from 'mui-datatables'
import SupplierRegister from "./SupplierRegister";
import {Fragment, useEffect, useState} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {supplierList} from "../../../utils/ServerEndPoint";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteSupplier from "./DeleteSupplier";

export const Supplier = () => {
    const classes = style()

    // dialog
    const [dialog, setDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false)


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        setLoading(true)
        const temp = []
        await Axios.get(supplierList).then((suppliers) => {
            suppliers.data.map(supplier =>
                temp.push(insert(supplier.id, supplier.name, supplier.email, supplier.address, supplier.city, supplier.state, supplier.postalCode, supplier.mobile_no, supplier.tel_no))
            )
        })

        setData(...data, temp)
        setLoading(false)
    }, [])


    const insertData = (supplier) => {
        const newData = [supplier, ...data]
        setData(newData)
    }

    return (
        <Fragment>
            <DeleteSupplier  dialog={deleteDialog} closeDialog={() => setDeleteDialog(false)}/>
            <SupplierRegister dialog={dialog} closeDialog={() => setDialog(false)} insertData={insertData}/>
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Tooltip title="Add Supplier" aria-label="add">
                                <IconButton onClick={() => setDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <PersonAddIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete Supplier" aria-label="add">
                                <IconButton onClick={() => setDeleteDialog(true)} aria-label="addProduct"
                                            color={"secondary"}>
                                    <PersonAddDisabledIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Update Supplier" aria-label="add">
                                <IconButton onClick={() => setDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <UpdateIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                        </Box>

                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                Supplier List
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


