import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Tooltip} from "@material-ui/core";
import {ProductTable as columns, InsertProduct as insert} from '../../../utils/tableColumn/ProductTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState, Fragment} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {productImages, productList, storeList, supplierList} from "../../../utils/ServerEndPoint";
import ProductRegister from "./ProductRegister";
import ProductPhoto from "./ProductPhoto";
import DeleteProduct from "./DeleteProduct";
import TransferProduct from "./TransferProduct";

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import UpdateProduct from "./UpdateProduct";

export const Products = () => {
    const classes = style()

    // for dialog
    const [registerDialog, setRegisterDialog] = useState(false);
    const [photoUpload, setPhotoUpload] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [transferDialog, setTransferDialog] = useState(false)
    const [updateDialog, setUpdateDialog] = useState(false)


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    // for autoComplete in Dialog
    const [stores, setStores] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [images, setImages] = useState([])

    useEffect(async () => {
        setLoading(true)
        const temp = []
        await Axios.get(productList).then((products) => {
            products.data.map(product =>
                temp.push(insert(product.code, product.brand, product.name, product.type, product.price, product.Supplier.name, product.Store.name, product.status))
            )
        })
        setData(...data, temp)
        setLoading(false)

        Axios.get(storeList).then(e => {
            setStores(e.data)
        })

        Axios.get(supplierList).then(e => {
            setSuppliers(e.data)
        })

        Axios.get(productImages).then(e => {
            setImages(e.data)
        })

    }, [])


    const insertImage = () => {

        Axios.get(productImages).then(e => {
            setImages(e.data)
        })


    }


    const deleteProduct = (item) => {

        const tempData = [...data]
        let tempQ = item.qty
        const code = item.code

        while (tempQ !== 0) {
            let current;

            tempData.find((e, index) => {
                current = index
                return e.code.toString() === code
            })

            tempData.splice(current, 1)

            tempQ--

        }

        setData(tempData)
    }


    const Reload = async () => {
        const temp = []
        await Axios.get(productList).then((products) => {
            products.data.map(product =>
                temp.push(insert(product.code, product.brand, product.name, product.type, product.price, product.Supplier.name, product.Store.name, product.status))
            )
        })

        setData(temp)
    }

    return (
        <Fragment>
            {/*Pop up*/}

            <ProductRegister images={images}
                             stores={stores}
                             suppliers={suppliers}
                             dialog={registerDialog}
                             closeDialog={() => setRegisterDialog(false)}
                             reload={Reload}
            />

            <UpdateProduct images={images}
                           stores={stores}
                           suppliers={suppliers}
                           dialog={updateDialog}
                           closeDialog={() => setUpdateDialog(false)}
                           reload={Reload}/>

            <ProductPhoto insertPicture={insertImage} dialog={photoUpload} closeDialog={() => setPhotoUpload(false)}/>

            <DeleteProduct
                dialog={deleteDialog}
                closeDialog={() => setDeleteDialog(false)}
                deleteProduct={deleteProduct}
            />

            <TransferProduct transfer={Reload} dialog={transferDialog}
                             closeDialog={() => setTransferDialog(false)}/>


            {/*Table*/}
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Tooltip title="Add Product" aria-label="add">
                                <IconButton onClick={() => setRegisterDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <AddCircleIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete Product" aria-label="add">
                                <IconButton onClick={() => setDeleteDialog(true)} aria-label="deleteProduct"
                                            color={"primary"}>
                                    <DeleteIcon fontSize={"large"} aria-label="Delete Product" color={"secondary"}/>
                                </IconButton>

                            </Tooltip>

                            <Tooltip title="Update Product" aria-label="add">
                                <IconButton onClick={() => setUpdateDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <UpdateIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Transfer Product" aria-label="add">
                                <IconButton onClick={() => setTransferDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <CompareArrowsIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Upload Photo" aria-label="add">
                                <IconButton onClick={() => setPhotoUpload(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <PhotoCameraIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>
                        </Box>

                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                Product List
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


