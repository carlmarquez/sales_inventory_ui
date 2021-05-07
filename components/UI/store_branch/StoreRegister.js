import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core"
import {useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {storeInsert} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";
import {adjectives, animals, colors, uniqueNamesGenerator} from "unique-names-generator";
import CheckEmail from "../../../utils/FormError/CheckEmail";
import RemoveError from "../../../utils/FormError/RemoveError";
import CheckCellPhoneNumber from "../../../utils/FormError/CheckCellphoneNumber";
import CheckTelephoneNumber from "../../../utils/FormError/CheckTelephoneNumber";


const StoreRegister = (
    {
        closeDialog,
        dialog,
        Reload

    }) => {

    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
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
        const code = uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
            separator: '-',
            length: 3,
            style: 'lowerCase'
        })

        event.preventDefault()

        if (location.trim().length === 0) {
            alert("Please enter store name")
            return
        }


        if (email.length >0 &&!CheckEmail(email,setEmailError,setEmailErrorMessage, 'PLease Input A Valid Email')) {
            error = true
        }else{
            RemoveError(setEmailError,setEmailErrorMessage)
        }

        if (mobileNo.length >0&&!CheckCellPhoneNumber(mobileNo,setCellPhoneNumberError,setCellPhoneNumberErrorMessage ,'Please Input A Valid Cellphone Number')) {
            error = true
        }else{
            RemoveError(setCellPhoneNumberError,setCellPhoneNumberErrorMessage)
        }


        if (telNo.length > 0 && !CheckTelephoneNumber(telNo, setTelephoneNumberError, setTelephoneNumberErrorMessage, 'Please Input A Valid Landline')) {
            error = true
        } else {
            RemoveError(setTelephoneNumberError, setTelephoneNumberErrorMessage)
        }

        if (!error) {
            const data = {
                location,
                code,
                email: email,
                postalCode: postalCode.length === 0 ? 1 : postalCode,
                mobile_no: mobileNo.trim().length === 0 ? '' : mobileNo,
                tel_no: telNo.trim().length === 0 ? '' : telNo
            }
            baseUrlWithAuth.post(storeInsert, data).then(ignored => {
                Reload()
                setLocation('')
                setEmail('')
                setPostalCode('')
                setTelNo('')
                setMobileNo('')
                setShow(true)
                setError(false)
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


            <DialogTitle id="add-student">Register Store Branch</DialogTitle>

            <DialogContent>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage='   Supplier Register Success'
                          closeSnackBar={close}
                />

                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Location"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   name='store-name'
                                   value={location}
                                   onChange={(e) => setLocation(e.target.value)}
                        />

                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField
                            error={emailError}
                            helperText={emailErrorMessage}
                            margin="dense"
                            id="store-email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            name='store-email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField
                            margin="dense"
                            label="Postal Code"
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


export default StoreRegister