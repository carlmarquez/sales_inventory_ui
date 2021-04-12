import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, TextField
} from "@material-ui/core"
import {useState} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {supplierInsert} from "../../../utils/ServerEndPoint";
import Response from '../../../utils/Response/Response'


const SupplierRegister = (
    {
        closeDialog,
        dialog,
        insertData

    }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [telNo, setTelNo] = useState('')


    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const close = () => {
        setShow(false)
    }


    const register = (event) => {


        event.preventDefault()

        if (name.trim() === '') {
            setError(true)
            return
        }

        const data = {
            name: name,
            email: email,
            address: address,
            city: city,
            state: state,
            postalCode: postalCode,
            mobile_no: mobileNo,
            tel_no: telNo
        }


        Axios.post(supplierInsert, data).then(e => {
            insertData(data)
            setName('')
            setEmail('')
            setAddress('')
            setState('')
            setCity('')
            setPostalCode('')
            setTelNo('')
            setMobileNo('')
            setError(false)
            setShow(true)
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
        <form onInvalid onSubmit={register}>


            <DialogTitle id="add-student">Register Supplier</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insert if you have any note
                </DialogContentText>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage='Supplier Register Success'
                          closeSnackBar={close}
                />

                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   id="supplier-name"
                                   label="Supplier Name"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   name='supplier-name'
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                        />

                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   id="supplier-email"
                                   label="Supplier Email"
                                   type="email"
                                   fullWidth
                                   variant="outlined"
                                   name='supplier-email'
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   id="address"
                                   label="Home Address"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   name='address'
                                   value={address}
                                   onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   id="city"
                                   label="City"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   name='city'
                                   value={city}
                                   onChange={(e) => setCity(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   id="state"
                                   label="State"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   name='state'
                                   value={state}
                                   onChange={e => setState(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   id="postal"
                                   label="postal code"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   name='postal'
                                   value={postalCode}
                                   onChange={e => setPostalCode(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   id="mobile-no"
                                   label="Mobile No."
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   name='mobile-no'
                                   value={mobileNo}
                                   onChange={e => setMobileNo(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   id="telNo"
                                   label="Telephone No."
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   name='telNo'
                                   value={telNo}
                                   onChange={e => setTelNo(e.target.value)}
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


export default SupplierRegister