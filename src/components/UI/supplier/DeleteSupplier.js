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
import {Axios} from "../../../utils/axios/Axios"
import {supplierDelete} from "../../../utils/ServerEndPoint"
import Response from "../../../utils/Response/Response"

const DeleteSupplier = (
    {
        closeDialog,
        dialog,
        Reload
    }) => {

    // user data
    const [email, setEmail] = useState('')


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

        Axios.post(supplierDelete, {email}).then(ignored => {
            setEmail('')
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
        <form onInvalid onSubmit={register}>


            <DialogTitle id="add-student">Remove Supplier</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insert Supplier Email to delete the supplier
                </DialogContentText>
                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage='Supplier Register Success'
                          closeSnackBar={close}
                />

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Email"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
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


export default DeleteSupplier