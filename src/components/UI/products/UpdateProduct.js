import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    Grid,
    TextField
} from "@material-ui/core"
import {useState, Fragment, useEffect} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {
    productUpdate,
} from "../../../utils/ServerEndPoint";
import {Autocomplete} from "@material-ui/lab";
import Response from "../../../utils/Response/Response";
import FindProduct from "./FindProduct";


const ProductRegister = (
    {
        closeDialog,
        dialog,
        stores,
        suppliers,
        images,
        reload,
    }) => {

    const [brand, setBrand] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [supplier, setSupplier] = useState('')
    const [store, setStore] = useState('')
    const [photo, setPhoto] = useState()
    const [code, setCode] = useState()

    const [findProductDialog, setFindProductDialog] = useState(false)

    // for snack bar
    const [showing, setShowing] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const register = async (event) => {
        event.preventDefault()
        if (brand.trim() === '') {
            setError(true)
            return
        }

        const data = {
            brand,
            code,
            name,
            type,
            price:price,
            status: 'Available',
            photo,
            SupplierId: parseInt(supplier.id),
            StoreId: parseInt(store.id),
        }


        await Axios.post(productUpdate, data).then(ignored => {
            setBrand('')
            setName('')
            setType('')
            setPrice('')
            setCode('')
            setPhoto('')
            alert("Update Success")
            setError(false)
            setFindProductDialog(true)
            reload()
        }).catch(error => {
            const response = error.response.data
            setErrorMessage(response.message)
            setErrorTitle(response.title)
            setError(true)
        })


    }

    useEffect(() => {
        setFindProductDialog(dialog)
    },[dialog])

    // update

    const updateProduct = (product) => {
        setBrand(product.brand)
        setCode(product.code)
        setName(product.name)
        setType(product.type)
        setPrice(product.price)

        const storeTemp = stores.find(e => e.id === product.StoreId)
        const photoTemp = images.find(e => e === product.photo)
        const supplierTemp = suppliers.find(e => e.id === product.SupplierId)

        setSupplier(supplierTemp)
        setStore(storeTemp)
        setPhoto(photoTemp)
    }



    return <Fragment>
        {
            findProductDialog === true?<FindProduct updateClose={closeDialog} closeDialog={setFindProductDialog} updateProduct={updateProduct} dialog={findProductDialog}/>
            :
                <Dialog
                    open={dialog}
                    onClose={closeDialog}
                    aria-labelledby="add-student"
                    maxWidth={"md"}
                >
                    <form onSubmit={register}>

                        <DialogTitle id="add-student">Update Product</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Product Update Node
                            </DialogContentText>

                            <Response showError={error}
                                      errorTitle={errorTitle}
                                      errorMessage={errorMessage}
                                      showSnackBar={showing}
                                      successMessage={"Product Update Success"}
                                      closeSnackBar={() => setShowing(false)}
                            />

                            <Grid container spacing={1}>
                                <Grid item md={4} xs={12}>
                                    <FormControl variant="outlined" margin='dense' fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={"small"}
                                            options={images}
                                            value={photo}
                                            getOptionLabel={(option) => option}
                                            getOptionSelected={(option, value) => option === value}
                                            onChange={(event, value) => setPhoto(value)}
                                            renderInput={(params) => <TextField autoFocus {...params} label="Product Images"
                                                                                variant="outlined"/>}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        margin="dense"
                                        label="Product Brand"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    />

                                </Grid>

                                <Grid item md={4} xs={12}>
                                    <TextField
                                        margin="dense"
                                        label="Product Name"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>

                                <Grid item md={4} xs={12}>
                                    <TextField
                                        margin="dense"
                                        label="Product Type"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </Grid>

                                <Grid item md={4} xs={12}>
                                    <TextField
                                        margin="dense"
                                        label="Product Price"
                                        type="number"
                                        fullWidth
                                        variant="outlined"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value < 0 ? 1 : e.target.value)}
                                    />
                                </Grid>

                                <Grid item md={4} xs={12}>
                                    <FormControl variant="outlined" margin='dense' fullWidth>
                                        <Autocomplete
                                            size={"small"}
                                            value={store}
                                            options={stores}
                                            getOptionLabel={(option) => option.name + ' ' + option.state}
                                            getOptionSelected={(option, value) => option.id === value.id}
                                            onChange={(event, value) => setStore(value)}
                                            renderInput={(params) => <TextField {...params} label="Store" variant="outlined"/>}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <FormControl variant="outlined" margin='dense' fullWidth>
                                        <Autocomplete
                                            size={"small"}
                                            options={suppliers}
                                            value={supplier}
                                            getOptionLabel={(option) => option.name + ' ' + option.state}
                                            getOptionSelected={(option, value) => option.id === value.id}
                                            onChange={(event, value) => setSupplier(value)}
                                            renderInput={(params) => <TextField {...params} label="Supplier"
                                                                                variant="outlined"/>}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <TextField
                                        margin="dense"
                                        label="Product Code"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        value={code}
                                        onChange={e => setCode(e.target.value)}
                                    />
                                </Grid>

                            </Grid>
                        </DialogContent>

                        <DialogActions>

                            <Button type={"submit"} color='primary' onClick={register}>
                                Register
                            </Button>
                            <Button onClick={() => closeDialog(false)} color='secondary'>
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
        }
    </Fragment>

}

export default ProductRegister