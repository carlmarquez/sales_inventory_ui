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
import {
    ReceiveTransfer,
} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";


const ReceiveItem = (
    {
        closeDialog,
        dialog,
        getData
    }) => {


    const [code, setCode] = useState('')


    // for snack bar
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [show, setShow] = useState(false)


    const register = async (event) => {
        event.preventDefault()
        const data = {code}
        await baseUrlWithAuth.post(ReceiveTransfer, data).then(ignored => {
            getData()
            setError(false)
            setShow(true)
            setCode('')
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
        fullWidth
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Find Transfer Code</DialogTitle>
            <DialogContent>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage={"Transfer Success"}
                          closeSnackBar={() => setShow(false)}
                />


                <br/>

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Transaction Code"
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
                    Receive
                </Button>
                <Button onClick={closeDialog} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default ReceiveItem