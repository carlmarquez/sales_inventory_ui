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
import {Axios} from "../../../utils/axios/Axios";
import {
    productFind,
} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";


const FindProduct = (
    {
        closeDialog,
        dialog,
        updateProduct,
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

        await Axios.post(productFind, {code}).then(e => {
            setCode('')
            setError(false)
            updateProduct(e.data[0])
            setShow(true)
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

            <DialogTitle id="add-student">Find Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your product code
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
                            label="Product Code"
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


export default FindProduct