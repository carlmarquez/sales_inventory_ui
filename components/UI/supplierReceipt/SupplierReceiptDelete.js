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
import {supplierReceiptDelete} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";


const DeleteReceipt = (
    {
        closeDialog,
        dialog,
        getData
    }) => {

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

        const data = {
            code
        }

        baseUrlWithAuth.post(supplierReceiptDelete, data).then(ignored => {
            getData().then(ignored=> {})
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
        <form  onSubmit={register}>


            <DialogTitle id="add-student">Delete Supplier Receipt</DialogTitle>
            <DialogContent>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage='Supplier Receipt Delete Success'
                          closeSnackBar={close}
                />

                <Grid container spacing={1}>

                    <Grid item md={12} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Receipt Code"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={code}
                                   onChange={e => setCode(e.target.value)}
                        />
                    </Grid>


                </Grid>
            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='secondary' onClick={register}>
                    Delete
                </Button>
                <Button onClick={closeDialog} color='primary'  >
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default DeleteReceipt