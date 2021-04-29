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
    storeFind
} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";


const FindStore = (
    {
        closeDialog,
        dialog,
        updateStore,
        updateClose
    }) => {

    const [code, setCode] = useState('')


    // for snack bar
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [show,setShow] = useState(false)


    const register = async (event) => {
        event.preventDefault()

        await baseUrlWithAuth.post(storeFind, {code}).then(e => {
            setError(false)
            updateStore(e.data[0])
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
        aria-labelledby="StoreFind"
        maxWidth={"md"}
        fullWidth
    >
        <form noValidate={false} onSubmit={register}>

            <DialogTitle>Find Store Branch</DialogTitle>
            <DialogContent>


                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage={"Store Find Success"}
                          closeSnackBar={() => setShow(false)}
                />


                <br/>

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            autoFocus
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


export default FindStore