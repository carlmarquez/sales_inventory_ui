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
import {useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {
    supplierFind
} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";


const FindSupplier = (
    {
        closeDialog,
        dialog,
        updateSupplier,
        updateClose
    }) => {

    const [email, setEmail] = useState('')


    // for snack bar
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [show,setShow] = useState(false)


    const register = async (event) => {
        event.preventDefault()

        await baseUrlWithAuth.post(supplierFind, {email}).then(e => {
            setError(false)
            updateSupplier(e.data[0])
            closeDialog(false)
        }).catch(error => {
            const response = error.response.data
            setErrorMessage(response.message)
            setErrorTitle(response.title)
            setError(true)
        })

    }

    const cancel = () => {
        updateClose(false)
        closeDialog(false)
    }

    return <Dialog
        open={dialog}
        onClose={cancel}
        aria-labelledby="add-student"
        maxWidth={"md"}
        fullWidth
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Find Supplier</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    if you have note for this add  or delete it
                </DialogContentText>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage={"Product Find Success"}
                          closeSnackBar={() => setShow(false)}
                />


                <br/>

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Enter Supplier Email"
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

                <Button type={"submit"} color='primary' onClick={register}>
                    Next
                </Button>
                <Button onClick={cancel} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default FindSupplier