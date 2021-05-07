import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    Grid,
    TextField
} from "@material-ui/core"
import {useState} from "react";
import {Autocomplete} from "@material-ui/lab";
import Response from "../../../utils/Response/Response";
import CreateError from "../../../utils/FormError/CreateError";
import RemoveError from "../../../utils/FormError/RemoveError";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {supplierReceiptCreate} from "../../../utils/ServerEndPoint";
import {adjectives, animals, colors, uniqueNamesGenerator} from "unique-names-generator";


const ProductRegister = (
    {
        closeDialog,
        dialog,
        suppliers,
        getData
    }) => {


    // for form value
    const [supplier, setSupplier] = useState('')
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')


    // for snack bar
    const [showing, setShowing] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // form error

    const [supplierIdError, setSupplierIdError] = useState(false)


    // form errorMessage
    const [supplierIdErrorMessage, setSupplierIdErrorMessage] = useState('')

    const register = async (event) => {

        event.preventDefault()
        let error = false

        if(file.length === 0){
            alert("Please Input A File")
            return
        }

        if (!supplier) {
            error = true
            CreateError(setSupplierIdError, setSupplierIdErrorMessage, 'Please select a supplier')
        } else {
            RemoveError(setSupplierIdError, setSupplierIdErrorMessage)
        }


        if (!error) {
            const code = uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals],
                separator: '-',
                length: 3,
                style: 'lowerCase'
            })

            const formData = new FormData()

            formData.append('picture', file)
            formData.append('code', code)
            formData.append('SupplierId', supplier.id)
            formData.append('description', description)
            await baseUrlWithAuth.post(supplierReceiptCreate, formData).then(ignored => {
                getData().then(ignored => {
                })
                setError(false)
                setShowing(true)
                setDescription('')
                setFile('')
            }).catch(error => {
                const response = error.response.data
                setErrorMessage(response.message)
                setErrorTitle(response.title)
                setError(true)
            })
        }

    }

    const change = (event) => {
        setFile(event.target.files[0])
    }


    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"md"}
        fullWidth
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Upload Supplier Receipt</DialogTitle>
            <DialogContent>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={showing}
                          successMessage='Product Insert Success'
                          closeSnackBar={() => setShowing(false)}
                />

                <Grid container spacing={1}>

                    <Grid item md={6} xs={12}>
                        <FormControl variant="outlined" margin='dense' fullWidth>
                            <Autocomplete
                                size={"small"}
                                options={suppliers}
                                getOptionLabel={(option) => option.name}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, value) => value === null ? setSupplier('') : setSupplier(value)}
                                renderInput={(params) =>
                                    <TextField
                                        autoFocus
                                        error={supplierIdError}
                                        helperText={supplierIdErrorMessage}
                                        {...params}
                                        label="Supplier"
                                        variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField

                            margin="dense"
                            type="file"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => change(e)}
                        />
                    </Grid>


                    <Grid item md={12} xs={12}>
                        <TextField
                            label={'Description'}
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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