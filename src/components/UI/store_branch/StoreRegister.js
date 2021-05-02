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
import UniqueWord from "../../../utils/uniqueWord/UniqueWord";


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

    const close = () => {
        setShow(false)
    }


    const register = (event) => {


        event.preventDefault()

        if (location.trim().length === 0) {
            alert("Please enter store name")
            return
        }

        const data = {
            location,
            code: UniqueWord,
            email: email,
            postalCode: postalCode.length ===0? 1: postalCode,
            mobile_no: mobileNo.trim().length===0? '': mobileNo,
            tel_no: telNo.trim().length === 0? '': telNo
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
                                   margin="dense"
                                   id="store-email"
                                   label="Store Email"
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
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   name='postal'
                                   value={postalCode}
                                   onChange={e => setPostalCode(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
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
                        <TextField
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


export default StoreRegister