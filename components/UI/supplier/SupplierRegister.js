import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, TextField
} from "@material-ui/core"
import {useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {supplierInsert} from "../../../utils/ServerEndPoint";
import Response from '../../../utils/Response/Response'
import CheckCellPhoneNumber from '../../../utils/FormError/CheckCellphoneNumber'
import CheckEmail from '../../../utils/FormError/CheckEmail'
import RemoveError from "../../../utils/FormError/RemoveError";
import CheckTelephoneNumber from "../../../utils/FormError/CheckTelephoneNumber";

const SupplierRegister = (
    {
        closeDialog,
        dialog,
        Reload

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
            alert("Please enter store name")
            return
        }

        if (email.length >0 && !CheckEmail(email,setEmailError,setEmailErrorMessage, 'PLease Input A Valid Email')) {
            error = true
        }else{
            RemoveError(setEmailError,setEmailErrorMessage)
        }

        if (mobileNo.length > 0 && !CheckCellPhoneNumber(mobileNo,setCellPhoneNumberError,setCellPhoneNumberErrorMessage ,'Please Input A Valid Cellphone Number')) {
            error = true
        }else{
            RemoveError(setCellPhoneNumberError,setCellPhoneNumberErrorMessage)
        }


        if(telNo.length >0 && !CheckTelephoneNumber(telNo,setTelephoneNumberError,setTelephoneNumberErrorMessage,'Please Input A Valid Landline')){
            error = true
        }else{
            RemoveError(setTelephoneNumberError,setTelephoneNumberErrorMessage)
        }


        if(!error){
            const data = {
                name: name,
                email: email,
                address: address,
                city: city,
                postalCode: postalCode.length === 0 ? 1 : postalCode,
                mobile_no: mobileNo,
                tel_no: telNo
            }


            baseUrlWithAuth.post(supplierInsert, data).then(ignored => {
                Reload()
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


            <DialogTitle id="add-student">Register Supplier</DialogTitle>
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
                                   label="Company Name"
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
                            label="Company Email"
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
                            label="Company Address"
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
                            label="Postal Code"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                            error={cellPhoneNumberError}
                            helperText={cellPhoneNumberErrorMessage}
                            margin="dense"
                            label="Mobile Number"
                            type="text"
                            fullWidth
                            variant="outlined"
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
                            type="number"
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


export default SupplierRegister