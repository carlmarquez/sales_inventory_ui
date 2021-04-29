import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    Grid, InputLabel, Select,
    TextField
} from "@material-ui/core"
import {useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {
    productInsert
} from "../../../utils/ServerEndPoint";
import {Autocomplete} from "@material-ui/lab";
import Response from "../../../utils/Response/Response";
import CreateError from "../../../utils/FormError/CreateError";
import RemoveError from "../../../utils/FormError/RemoveError";


const ProductRegister = (
    {
        closeDialog,
        dialog,
        stores,
        suppliers,
        images,
        reload,
        type
    }) => {


    // for form value
    const [brand, setBrand] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)
    const [qty, setQty] = useState(1)
    const [supplier, setSupplier] = useState('')
    const [store, setStore] = useState('')
    const [photo, setPhoto] = useState('')
    const [code, setCode] = useState('')
    const [productTypeId,setProductTypeId] = useState(0)


    // for snack bar
    const [showing, setShowing] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState(type.length >0?type[0].id:null)

    // form error
    const [productImagesError, setProductImagesError] = useState(false)
    const [productBrandError, setProductBrandError] = useState(false)
    const [productNameError, setProductNameError] = useState(false)
    const [productTypeError, setProductTypeError] = useState(false)
    const [storeIdError, setStoreIdError] = useState(false)
    const [supplierIdError, setSupplierIdError] = useState(false)
    const [productCodeError, setProductCodeError] = useState(false)


    // form errorMessage
    const [productImagesErrorMessage, setProductImagesErrorMessage] = useState('')
    const [productBrandErrorMessage, setProductBrandErrorMessage] = useState('')
    const [productNameErrorMessage, setProductNameErrorMessage] = useState('')
    const [productTypeErrorMessage, setProductTypeErrorMessage] = useState('')
    const [storeIdErrorMessage, setStoreIdErrorMessage] = useState('')
    const [supplierIdErrorMessage, setSupplierIdErrorMessage] = useState('')
    const [productCodeErrorMessage, setProductCodeErrorMessage] = useState('')

    const register = async (event) => {

        event.preventDefault()
        RemoveFormError()
        let error = false

        if (brand.trim().length === 0) {
            error = true
            CreateError(setProductBrandError, setProductBrandErrorMessage, 'please enter brand')
        }

        if (!photo) {
            error = true
            CreateError(setProductImagesError, setProductImagesErrorMessage, 'Please enter a photo')
        }

        if (name.trim().length === 0) {
            error = true
            CreateError(setProductNameError, setProductNameErrorMessage, 'Please enter product name')
        }

        if (productTypeId===null) {
            error = true
            CreateError(setProductTypeError, setProductTypeErrorMessage, 'Please enter a product type')
        }

        if (!store) {
            error = true
            CreateError(setStoreIdError, setStoreIdErrorMessage, 'Please select a branch')
        }

        if (!supplier) {
            error = true
            CreateError(setSupplierIdError, setSupplierIdErrorMessage, 'Please select a supplier')
        }

        if (code.trim().length === 0) {
            error = true
            CreateError(setProductCodeError, setProductCodeErrorMessage, 'Please enter a product code')
        }


        if (!error) {
            const data = {
                brand,
                code,
                name,
                ProductTypeId: productTypeId,
                price: price,
                status: 'Available',
                photo,
                SupplierId: parseInt(supplier.id),
                StoreId: parseInt(store.id),
                qty
            }

            await baseUrlWithAuth.post(productInsert, data).then(ignored => {
                setError(false)
                setShowing(true)
                setBrand('')
                setName('')
                setPrice(1)
                setCode('')
                setQty(1)
                reload()
            }).catch(error => {
                const response = error.response.data
                setErrorMessage(response.message)
                setErrorTitle(response.title)
                setError(true)
            })
        }

    }

    const RemoveFormError = () => {
        RemoveError(setStoreIdError, setStoreIdErrorMessage)
        RemoveError(setProductImagesError, setProductImagesErrorMessage)
        RemoveError(setProductBrandError, setProductBrandErrorMessage)
        RemoveError(setProductNameError, setProductNameErrorMessage)
        RemoveError(setProductTypeError, setProductTypeErrorMessage)
        RemoveError(setStoreIdError, setStoreIdErrorMessage)
        RemoveError(setSupplierIdError, setSupplierIdErrorMessage)
        RemoveError(setProductCodeError, setProductCodeErrorMessage)
    }

    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"md"}
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Register Product</DialogTitle>
            <DialogContent>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={showing}
                          successMessage='Product Insert Success'
                          closeSnackBar={() => setShowing(false)}
                />

                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" margin='dense' fullWidth>
                            <Autocomplete
                                autoSelect
                                size={"small"}
                                options={images}
                                getOptionLabel={(option) => option}
                                getOptionSelected={(option, value) => option === value}
                                onChange={(event, value) => setPhoto(value)}
                                renderInput={(params) =>
                                    <TextField
                                        error={productImagesError}
                                        helperText={productImagesErrorMessage}
                                        autoFocus {...params}
                                        label="Product Images"
                                        variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField
                            error={productBrandError}
                            helperText={productBrandErrorMessage}
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
                            error={productNameError}
                            helperText={productNameErrorMessage}
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
                        <FormControl
                            error={productTypeError}
                            variant="outlined" margin='dense' fullWidth>
                            <InputLabel
                                htmlFor="role">{productTypeError? productTypeErrorMessage: 'Product Type'}</InputLabel>
                            <Select

                                required
                                native
                                label={productTypeError? productTypeErrorMessage: 'Product Type'}
                                inputProps={{
                                    name: 'Product Type',
                                    id: 'role',
                                }}
                                value={productTypeId}
                                onChange={(e => setProductTypeId(e.target.value))}
                            >
                                {
                                    type.map(e => <option value={e.id} key={e.id}>{e.name}</option>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField
                            margin="dense"
                            label="Product Price"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={price}
                            onChange={(e) => setPrice(e.target.value < 1 ? 1 : e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" margin='dense' fullWidth>
                            <Autocomplete
                                size={"small"}
                                options={stores}
                                getOptionLabel={(option) => option.location}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, value) => value === null ? setStore('') : setStore(value)}
                                renderInput={(params) =>
                                    <TextField
                                        error={storeIdError}
                                        helperText={storeIdErrorMessage}
                                        {...params}
                                        label="Store"
                                        variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" margin='dense' fullWidth>
                            <Autocomplete
                                size={"small"}
                                options={suppliers}
                                getOptionLabel={(option) => option.name}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, value) => value === null ? setSupplier('') : setSupplier(value)}
                                renderInput={(params) =>
                                    <TextField
                                        error={supplierIdError}
                                        helperText={supplierIdErrorMessage}
                                        {...params}
                                        label="Supplier"
                                        variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField
                            error={productCodeError}
                            helperText={productCodeErrorMessage}
                            margin="dense"
                            label="Product Code"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </Grid>


                    <Grid item md={4} xs={12}>
                        <TextField
                            margin="dense"
                            label="QTY"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={qty}
                            onChange={e => setQty(e.target.value <= 0 ? 1 : e.target.value)}
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

export default ProductRegister