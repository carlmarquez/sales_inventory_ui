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
import {productDelete} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";


const DeleteProduct = (
    {
        closeDialog,
        dialog,
        deleteProduct,
        branch
    }) => {

    const [qty, setQty] = useState(1)
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
            code,
            qty: parseInt(qty),
            branch
        }

        baseUrlWithAuth.post(productDelete, data).then(e => {
            setError(false)
            setShow(true)
            deleteProduct(data)
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


            <DialogTitle id="add-student">Delete Product</DialogTitle>
            <DialogContent>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage='Product Deleted Success'
                          closeSnackBar={close}
                />

                <Grid container spacing={1}>

                    <Grid item md={6} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   label="Product Code"
                                   type="text"
                                   fullWidth
                                   variant="outlined"
                                   value={code}
                                   onChange={e => setCode(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                                   margin="dense"
                                   label="QTY"
                                   type="number"
                                   fullWidth
                                   variant="outlined"
                                   value={qty}
                                   onChange={e => setQty(e.target.value < 0? 1: e.target.value)}
                        />
                    </Grid>

                </Grid>
            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='secondary'onClick={register}>
                    Delete
                </Button>
                <Button onClick={() => closeDialog(false)} color='primary'  >
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default DeleteProduct