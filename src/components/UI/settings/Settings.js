import style from "../_style/TableStyle";
import {Fragment, useEffect, useState} from "react";
import {
    Divider,
    Grid,
    ListItem, ListItemText,
    Paper,
    TextField,
    Tooltip
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';
import {
    InsertProductType,
    ListProductType,
    productImages,
    productDeleteImage, DeleteProductType, SetCriticalStock,GetCriticalStock
} from "../../../utils/ServerEndPoint";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";

const useStyles = makeStyles(() => ({
    settingsContainer: {
        marginLeft: 20,
        marginRight: 20,
    },
    btnProductType: {
        marginTop: 10,
        display: 'flex',
        marginBottom: 10
    },
    footer: {
        textAlign: "right",
        marginBottom: 10,
        marginRight: 20
    },
    productTypeContainer: {
        backgroundColor: '#DEDEDE',
        maxHeight: 200,
        minHeight: 200,
        overflowY: 'auto'
    }

}));


const Setting = () => {
    const classes = style()
    const settingStyle = useStyles()

    const [edit, setEdit] = useState(false)
    const [productTypes, setProductTypes] = useState([])
    const [productPhoto, setProductPhoto] = useState([])
    const [criticalStock, setCriticalStock] = useState(0)

    useEffect(() => {
        getProductType().then(ignored => {})
        getPhoto().then(ignored => {})
        getCriticalStock().then(ignored => {})


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const cancel = () => {
        alert('Exiting Edit Mode')
        setEdit(false)
    }

    const submit = () => {
        const data = {value: criticalStock}
        baseUrlWithAuth.post(SetCriticalStock, data)
            .then((ignored) => {
                alert('Update Success')
            }).catch(error => {
            console.log(error)
            alert(error.response.data)
        })
    }

    const editClick = () => {
        alert('Edit Mode Is On')
        setEdit(true)
    }

    const changeCriticalStock = (value) => {
        if (edit) setCriticalStock(value)
    }

    const addProductTypeClick = () => {
        const value = window.prompt('Enter Product Type')
        const temp = [...productTypes]
        const data = {name: value}
        baseUrlWithAuth.post(InsertProductType, data)
            .then(e => {
                console.log(e)
                const type = {id: e.data.id, name: e.data.name}
                temp.push(type)
                setProductTypes(temp)
                alert("Product Type Add Success")
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteProductTypeClick = () => {
        const value = window.prompt('Enter Product Type')
        const data = {name: value}
        baseUrlWithAuth.post(DeleteProductType, data)
            .then(e => {
                getProductType().then(ignored => {
                })
                alert(e.data.message)
            })
            .catch(e => {
                alert(e.response.data.message)
            })
    }

    const deletePhotoClick = async () => {
        const value = window.prompt('Enter Product Type')
        const data = {name: value}
        await baseUrlWithAuth.post(productDeleteImage, data)
            .then((e) => {
                alert(e.data.message)
                getPhoto().then(ignored => {
                })
            })
            .catch((error) => {
                alert(error.response.data.message)
            })
    }

    const getProductType = async () => {
        await baseUrlWithAuth.get(ListProductType)
            .then(e => {
                const temp = []
                e.data.map(productType => temp.push(productType))
                setProductTypes(temp)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getPhoto = async () => {
        await baseUrlWithAuth.get(productImages)
            .then(e => {
                const temp = []
                e.data.map(photo => temp.push(photo))
                setProductPhoto(temp)
            })
    }

    const getCriticalStock = async () => {
        await baseUrlWithAuth.get(GetCriticalStock).then(e => {
            setCriticalStock(e.data.stock.critical_stock)
        })
    }

    return (
        <Grid component={Paper} className={classes.tableContainerWrapper}>
            <div className={settingStyle.settingsContainer}>
                <h1>Settings</h1>
                <Divider/>
                <form noValidate={false}>
                    <h2>Stock Management</h2>

                    <Grid item md={12} xs={12}>
                        <TextField
                            onChange={e => changeCriticalStock(e.target.value)}
                            value={criticalStock}
                            autoFocus
                            label="Critical Stock"
                            type="number"
                            fullWidth
                            variant="filled"
                        />
                    </Grid>
                    <h2>Product Management</h2>
                    <Divider/>
                    <Grid container spacing={5}>
                        <Grid item md={6} xs={12}>
                            <h3 style={{marginBottom: 0}}>Product Type:</h3>

                            <List className={settingStyle.productTypeContainer}>
                                {
                                    productTypes.map((e, id) => (
                                            <ListItem key={id}>
                                                <ListItemText primary={e.name}/>
                                            </ListItem>
                                        )
                                    )
                                }
                            </List>

                            <div className={settingStyle.btnProductType}>
                                {
                                    edit ?
                                        <Fragment>
                                            <Tooltip onClick={addProductTypeClick} title="Add Product Type"
                                                     aria-label="addProduct">
                                                <IconButton aria-label="addProduct"
                                                            color={"primary"}>
                                                    <AddIcon aria-label="addProduct"
                                                             fontSize={"large"}
                                                             color={"primary"}/>
                                                </IconButton>
                                            </Tooltip>


                                            <Tooltip onClick={deleteProductTypeClick} title="Delete Product Type"
                                                     aria-label="delete">
                                                <IconButton aria-label="deleteProductType"
                                                            color={"secondary"}>
                                                    <DeleteIcon aria-label="deleteProductType"
                                                                fontSize={"large"}
                                                                color={"secondary"}/>
                                                </IconButton>
                                            </Tooltip>
                                        </Fragment> : null
                                }
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <h3 style={{marginBottom: 0}}>Product Photo:</h3>

                            <List className={settingStyle.productTypeContainer}>
                                {
                                    productPhoto.map((e, id) => (
                                            <ListItem key={id}>
                                                <ListItemText primary={e}/>
                                            </ListItem>
                                        )
                                    )
                                }
                            </List>

                            <div className={settingStyle.btnProductType}>
                                {
                                    edit ?
                                        <Fragment>
                                            <Tooltip onClick={deletePhotoClick} title="Delete Photo"
                                                     aria-label="addProduct">
                                                <IconButton aria-label="addProduct"
                                                            color={"secondary"}>
                                                    <DeleteIcon aria-label="addProduct"
                                                                fontSize={"large"}
                                                                color={"secondary"}/>
                                                </IconButton>
                                            </Tooltip>


                                        </Fragment> : null
                                }
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <footer className={settingStyle.footer}>
                {
                    edit ? null : <Tooltip title="Edit Settings" aria-label="edit" onClick={editClick}>
                        <IconButton aria-label="editSetting"
                                    color={"primary"}>
                            <EditIcon aria-label="edit"
                                      fontSize={"large"}
                                      color={"primary"}/>
                        </IconButton>
                    </Tooltip>
                }

                {
                    edit ?
                        <Fragment>
                            <Tooltip onClick={submit} title="Submit" aria-label="submit">
                                <IconButton aria-label="submit"
                                            color={"primary"}>
                                    <PublishIcon aria-label="submit"
                                                 fontSize={"large"}
                                                 color={"primary"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip onClick={cancel} title="Cancel" aria-label="cancel">
                                <IconButton aria-label="cancelEdit"
                                            color={"primary"}>
                                    <CancelIcon aria-label="cancelEdit"
                                                fontSize={"large"}
                                                color={"secondary"}/>
                                </IconButton>
                            </Tooltip>
                        </Fragment>
                        : null
                }


            </footer>
        </Grid>

    )
}

export default Setting