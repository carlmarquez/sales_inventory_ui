import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
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


const StoreUpdate = (
    {
        closeDialog,
        dialog,
        Reload,
    }) => {


    // data
    const [id,setId] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [telNo, setTelNo] = useState('')


    const [findStoreDialog, setFindStoreDialog] = useState(false)

    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const register = async (event) => {
        event.preventDefault()
        if(name.trim().length === 0){
            alert("Please enter a name")
            return
        }

        if(email.trim().length === 0){
            alert("Please enter a email")
            return
        }

        const data = {
            id,
            name: name,
            email: email,
            address: address.trim().length === 0? '':address,
            city: city.trim().length ===0?'':city,
            state: state.trim().length ===0? '': state,
            postalCode: postalCode.length ===0? 1: postalCode,
            mobile_no: mobileNo.trim().length===0? '': mobileNo,
            tel_no: telNo.trim().length === 0? '': telNo
        }

        await baseUrlWithAuth.post(storeUpdate, data).then(ignored => {
            setError(false)
            Reload()
            alert("Update Success")
            setFindStoreDialog(true)
        }).catch(error => {
            const response = error.response.data
            setErrorMessage(response.message)
            setErrorTitle(response.title)
        })


    }

    useEffect(() => {
        setFindStoreDialog(dialog)
    }, [dialog])

    // update
    const updateStore = (store) => {

        setId(store.id)
        setName(store.name)
        setAddress(store.address)
        setCity(store.city)
        setEmail(store.email)
        setMobileNo(store.mobile_no)
        setPostalCode(store.postalCode)
        setState(store.state)
        setTelNo(store.tel_no)
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
                            <DialogContentText>
                                Insert if you have any note when updating supplier
                            </DialogContentText>

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
                                               id="supplier-name"
                                               label="Store Name"
                                               type="text"
                                               fullWidth
                                               variant="outlined"
                                               name='supplier-name'
                                               value={name}
                                               onChange={(e) => setName(e.target.value)}
                                    />

                                </Grid>

                                <Grid item md={4} xs={12}>
                                    <TextField
                                        margin="dense"
                                        id="supplier-email"
                                        label="Store Email"
                                        type="email"
                                        fullWidth
                                        variant="outlined"
                                        name='supplier-email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>

                                <Grid item md={4} xs={12}>
                                    <TextField
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
                                    <TextField
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
                                    <TextField
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
                                    <TextField
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