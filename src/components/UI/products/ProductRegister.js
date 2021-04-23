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
import {useState} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {
    productInsert
} from "../../../utils/ServerEndPoint";
import {Autocomplete} from "@material-ui/lab";
import Response from "../../../utils/Response/Response";


const ProductRegister = (
    {
        closeDialog,
        dialog,
        stores,
        suppliers,
        images,
        reload
    }) => {


    //
    const [brand, setBrand] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState(1)
    const [supplier, setSupplier] = useState()
    const [store, setStore] = useState()
    const [photo, setPhoto] = useState()
    const [code, setCode] = useState()


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
            price: parseFloat(price),
            status: 'Available',
            photo,
            SupplierId: parseInt(supplier.id),
            StoreId: parseInt(store.id),
            qty
        }


        await Axios.post(productInsert, data).then(ignored => {
            setError(false)
            setShowing(true)
            setBrand('')
            setName('')
            setType('')
            setPrice('')
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


    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"md"}
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Register Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                   Insert Message
                </DialogContentText>

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
                                options={stores}
                                getOptionLabel={(option) => option.name + ' ' + option.state}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, value) => setStore(value)}
                                renderInput={(params) => <TextField {...params} label="Store" variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" margin='dense' fullWidth>
                            <Autocomplete
                                size={"small"}
                                options={suppliers}
                                getOptionLabel={(option) => option.name + ' ' + option.state}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, value) => setSupplier(value)}
                                renderInput={(params) => <TextField {...params} label="Supplier"
                                                                    variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item md={4} xs={12}>
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


                    <Grid item md={4} xs={12}>
                        <TextField
                            margin="dense"
                            label="QTY"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={qty}
                            onChange={e => setQty(e.target.value < 0 ? 1 : e.target.value)}
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