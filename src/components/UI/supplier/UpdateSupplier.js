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
    supplierUpdate,
} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";
import FindSupplier from "./FindSupplier";
import CheckEmail from "../../../utils/FormError/CheckEmail";
import RemoveError from "../../../utils/FormError/RemoveError";
import CheckCellPhoneNumber from "../../../utils/FormError/CheckCellphoneNumber";
import CheckTelephoneNumber from "../../../utils/FormError/CheckTelephoneNumber";


const UpdateSupplier = (
    {
        closeDialog,
        dialog,
        Reload,
    }) => {


    // data
    const [id, setId] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [telNo, setTelNo] = useState('')


    const [findSupplierDialog, setFindSupplierDialog] = useState(false)

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
        let error = false
        event.preventDefault()
        if (name.trim().length === 0) {
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
                id,
                name: name,
                email: email,
                address: address,
                city: city,
                state: state,
                postalCode: postalCode.length === 0 ? 1 : postalCode,
                mobile_no: mobileNo,
                tel_no: telNo
            }


            await baseUrlWithAuth.post(supplierUpdate, data).then(ignored => {
                setError(false)
                Reload()
                alert("Update Success")
                setFindSupplierDialog(true)

            }).catch(error => {
                const response = error.response.data
                setErrorMessage(response.message)
                setErrorTitle(response.title)
            })
        }


    }

    useEffect(() => {
        setFindSupplierDialog(dialog)
    }, [dialog])

    // update
    const updateSupplier = (supplier) => {
        setId(supplier.id)
        setName(supplier.name)
        setAddress(supplier.address)
        setCity(supplier.city)
        setEmail(supplier.email)
        setMobileNo(supplier.mobile_no)
        setPostalCode(supplier.postalCode)
        setState(supplier.state)
        setTelNo(supplier.tel_no)
        setFindSupplierDialog(false)
    }


    return <Fragment>
        {
            findSupplierDialog === true ?
                <FindSupplier updateClose={closeDialog} closeDialog={() => setFindSupplierDialog(false)}
                              updateSupplier={updateSupplier} dialog={findSupplierDialog}/>
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
                                <Grid item md={6} xs={12}>
                                    <TextField autoFocus
                                               margin="dense"
                                               label="Supplier Name"
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
                                        label="Supplier Email"
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
    </Fragment>

}

export default UpdateSupplier