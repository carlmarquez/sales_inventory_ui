import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Tooltip} from "@material-ui/core";
import {StoreTable as columns, InsertStore as insert} from '../../../utils/tableColumn/StoreTable'
import MUIDataTable from 'mui-datatables'
import {useEffect, useState, Fragment} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {storeList} from "../../../utils/ServerEndPoint";
import StoreRegister from "./StoreRegister";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import StoreIcon from '@material-ui/icons/Store';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import UpdateIcon from '@material-ui/icons/Update';
import StoreDelete from "./StoreDelete";
import StoreUpdate from "./StoreUpdate";

const StoreBranch = () => {
    const classes = style()

    const [dialog, setDialog] = useState(false);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [storeDeleteDialog, setDeleteStoreDialog] = useState(false)
    const [storeUpdateDialog, setStoreUpdateDialog] = useState(false)


    useEffect(() => {
        Reload().then(ignored => {
        })
    }, [])

    const Reload = async () => {
        setLoading(true)
        const temp = []
        await baseUrlWithAuth.get(storeList).then((stores) => {
            stores.data.map(store =>
                temp.push(insert(store.id, store.name, store.email, store.address, store.city, store.state, store.postalCode, store.mobile_no, store.tel_no))
            )
        })
        setData(temp)
        setLoading(false)
    }


    return (
        <Fragment>
            <StoreRegister dialog={dialog} closeDialog={() => setDialog(false)} Reload={Reload}/>
            <StoreDelete dialog={storeDeleteDialog} closeDialog={() => setDeleteStoreDialog(false)} Reload={Reload}/>
            <StoreUpdate dialog={storeUpdateDialog} closeDialog={() => setStoreUpdateDialog(false)} Reload={Reload}/>
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>

                            <Tooltip title="Add Store" aria-label="add">
                                <IconButton onClick={() => setDialog(true)} aria-label="AddStore"
                                            color={"primary"}>
                                    <StoreIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete Store" aria-label="add">
                                <IconButton onClick={() => setDeleteStoreDialog(true)} aria-label="DeleteStore"
                                            color={"secondary"}>
                                    <RemoveShoppingCartIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Update Store" aria-label="add">
                                <IconButton onClick={() => setStoreUpdateDialog(true)} aria-label="UpdateStore"
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
                                Store List
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


export default StoreBranch