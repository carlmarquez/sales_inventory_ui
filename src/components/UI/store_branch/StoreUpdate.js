import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core"
import {useState, Fragment, useEffect} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {
    storeUpdate,
} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";
import StoreFind from "./StoreFind";
import CheckEmail from "../../../utils/FormError/CheckEmail";
import RemoveError from "../../../utils/FormError/RemoveError";
import CheckCellPhoneNumber from "../../../utils/FormError/CheckCellphoneNumber";
import CheckTelephoneNumber from "../../../utils/FormError/CheckTelephoneNumber";


const StoreUpdate = (
    {
        closeDialog,
        dialog,
        Reload,
    }) => {


    // data
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [telNo, setTelNo] = useState('')
    const [code, setCode] = useState('')


    const [findStoreDialog, setFindStoreDialog] = useState(false)

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

    const register = async (event) => {
        event.preventDefault()
        let error = false


        if (location.trim().length === 0) {
            alert("Please enter a email")
            return
        }

        if (location.trim().length === 0) {
            alert("Please enter store name")
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
                location,
                code,
                email: email,
                postalCode: postalCode.length === 0 ? 1 : postalCode,
                mobile_no: mobileNo.trim().length === 0 ? '' : mobileNo,
                tel_no: telNo.trim().length === 0 ? '' : telNo
            }

            await baseUrlWithAuth.post(storeUpdate, data).then(ignored => {
                setError(false)
                Reload()
                alert("Update Success")
                setFindStoreDialog(true)
            }).catch(error => {
                console.log(error)
                const response = error.response.data
                setErrorMessage(response.message)
                setErrorTitle(response.title)
            })
        }


    }

    useEffect(() => {
        setFindStoreDialog(dialog)
    }, [dialog])

    // update
    const updateStore = (store) => {
        setLocation('')
        setEmail(store.email)
        setMobileNo(store.mobile_no)
        setPostalCode(store.postalCode)
        setTelNo(store.tel_no)
        setLocation(store.location)
        setCode(store.code)
        setFindStoreDialog(false)
    }


    return <Fragment>
        {
            findStoreDialog === true ?
                <StoreFind updateClose={closeDialog} closeDialog={() => setFindStoreDialog(false)}
                           updateStore={updateStore} dialog={findStoreDialog}/>
                :
                <Dialog
                    open={dialog}
                    onClose={closeDialog}
                    aria-labelledby="add-student"
                    maxWidth={"md"}
                >
                    <form noValidate={false} onSubmit={register}>


                        <DialogTitle id="add-student">Update Supplier</DialogTitle>
                        <DialogContent>

                            <Response showError={error}
                                      errorTitle={errorTitle}
                                      errorMessage={errorMessage}
                                      showSnackBar={show}
                                      successMessage='Supplier Register Success'
                                      closeSnackBar={() => setShow(false)}
                            />

                            <Grid container spacing={1}>
                                <Grid item md={4} xs={12}>
                                    <TextField autoFocus
                                               margin="dense"
                                               label="Location"
                                               type="text"
                                               fullWidth
                                               variant="outlined"
                                               value={location}
                                               onChange={(e) => setLocation(e.target.value)}
                                    />

                                </Grid>

                                <Grid item md={4} xs={12}>
                                    <TextField
                                        error={emailError}
                                        helperText={emailErrorMessage}
                                        margin="dense"
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        variant="outlined"
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
                                Update
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

export default StoreUpdate