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
import {useState} from "react"
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth"
import {storeDelete} from "../../../utils/ServerEndPoint"
import Response from "../../../utils/Response/Response"

const StoreDelete = (
    {
        closeDialog,
        dialog,
        Reload
    }) => {


    // user data
    const [code, setCode] = useState('')


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

        baseUrlWithAuth.post(storeDelete, {code}).then(ignored => {
            setCode('')
            setShow(true)
            Reload()
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
        maxWidth={"sm"}
        fullWidth
    >
        <form noValidate={false} onSubmit={register}>


            <DialogTitle id="add-student">Remove Store Branch</DialogTitle>
            <DialogContent>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage='Store Deleted Success'
                          closeSnackBar={close}
                />

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Enter Store Code"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={code}
                                   onChange={(e) => setCode(e.target.value)}
                        />

                    </Grid>

                </Grid>
            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='secondary' onClick={register}>
                    Delete
                </Button>
                <Button onClick={() => closeDialog(false)} color='primary' >
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default StoreDelete