import {useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {CustomerInsert} from "../../../utils/ServerEndPoint";
import CheckTelephoneNumber from "../../../utils/FormError/CheckTelephoneNumber";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core";
import Response from "../../../utils/Response/Response";
import RemoveError from "../../../utils/FormError/RemoveError";
import CheckEmail from "../../../utils/FormError/CheckEmail";
import CheckCellPhoneNumber from '../../../utils/FormError/CheckCellphoneNumber'

const CustomerForm = (
    {
        closeDialog,
        dialog
    }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [telNo, setTelNo] = useState('')


    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // form validation
    const [emailError, setEmailError] = useState(false)
    const [cellPhoneNumberError, setCellPhoneNumberError] = useState(false)
    const [telephoneNumberError, setTelephoneNumberError] = useState(false)

    // form validation message
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [cellPhoneNumberErrorMessage, setCellPhoneNumberErrorMessage] = useState('')
    const [telephoneNumberErrorMessage, setTelephoneNumberErrorMessage] = useState('')

    const close = () => {
        setShow(false)
    }


    const register = (event) => {

        let error = false
        event.preventDefault()

        if (name.trim().length === 0) {
            alert("Please Enter Customer Name")
            return
        }

        if (email.length > 0 && !CheckEmail(email, setEmailError, setEmailErrorMessage, 'PLease Input A Valid Email')) {
            error = true
        } else {
            RemoveError(setEmailError, setEmailErrorMessage)
        }

        if (mobileNo.length > 0 && !CheckCellPhoneNumber(mobileNo, setCellPhoneNumberError, setCellPhoneNumberErrorMessage, 'Please Input A Valid Cellphone Number')) {
            error = true
        } else {
            RemoveError(setCellPhoneNumberError, setCellPhoneNumberErrorMessage)
        }


        if (telNo.length > 0 && !CheckTelephoneNumber(telNo, setTelephoneNumberError, setTelephoneNumberErrorMessage, 'Please Input A Valid Landline')) {
            error = true
        } else {
            RemoveError(setTelephoneNumberError, setTelephoneNumberErrorMessage)
        }

        if (!error) {
            const data = {
                name,
                email,
                address: address.trim().length === 0 ? 'Hidden' : address,
                city: city.trim().length === 0 ? 'Hidden' : city,
                postalCode: postalCode.length === 0 ? 1 : postalCode,
                mobile_no: mobileNo.trim().length === 0 ? 'Hidden' : mobileNo,
                tel_no: telNo.trim().length === 0 ? 'Hidden' : telNo
            }


            baseUrlWithAuth.post(CustomerInsert, data).then(ignored => {
                setName('')
                setEmail('')
                setAddress('')
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


    }

    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"md"}
    >
        <form noValidate={false} onSubmit={register}>


            <DialogTitle id="add-student">Register Customer</DialogTitle>
            <DialogContent>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage='Supplier Register Success'
                          closeSnackBar={close}
                />

                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Customer Name"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                        />

                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                            error={emailError}
                            helperText={emailErrorMessage}
                            margin="dense"
                            label="Customer Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={8} xs={12}>
                        <TextField
                            margin="dense"
                            label="Home Address"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={2} xs={12}>
                        <TextField
                            margin="dense"
                            label="City"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Grid>


                    <Grid item md={2} xs={12}>
                        <TextField
                            margin="dense"
                            id="postal"
                            label="postal code"
                            type="number"
                            fullWidth
                            variant="outlined"
                            name='postal'
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                            error={cellPhoneNumberError}
                            helperText={cellPhoneNumberErrorMessage}
                            margin="dense"
                            id="mobile-no"
                            label="Mobile Number"
                            type="text"
                            fullWidth
                            variant="outlined"
                            name='mobile-no'
                            value={mobileNo}
                            onChange={e => setMobileNo(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                            error={telephoneNumberError}
                            helperText={telephoneNumberErrorMessage}
                            margin="dense"
                            label="Telephone Number"
                            type="text"
                            fullWidth
                            variant="outlined"
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


export default CustomerForm