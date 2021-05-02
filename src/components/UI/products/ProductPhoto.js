import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, Snackbar,
    TextField
} from "@material-ui/core"
import {useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {productPhoto} from "../../../utils/ServerEndPoint";
import {Alert, AlertTitle} from "@material-ui/lab";


const SupplierRegister = (
    {
        closeDialog,
        dialog,
        insertPicture
    }) => {

    const [file, setFile] = useState(0)


    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)

    const close = () => {
        setShow(false)
    }

    const change = (event) => {
        setFile(event.target.files[0])
    }


    const register = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('picture', file)
        baseUrlWithAuth.post(productPhoto, formData).then(ignored => {
            setError(false)
            setShow(true)
            insertPicture()
        }).catch(ignored => {
            setError(true)
        })
    }

    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"sm"}
        fullWidth={true}
    >
        <form onSubmit={register} encType="multipart/form-data">


            <DialogTitle id="add-student">Upload Photo For Prouduct</DialogTitle>
            <DialogContent>
                {
                    error ? <Alert variant="filled" severity="error">
                        <AlertTitle><strong>Can't upload photo</strong></AlertTitle>
                        <strong>Please Select Proper Photo</strong>
                    </Alert> : null
                }

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={show} autoHideDuration={3000} onClose={close}>
                    <Alert onClose={closeDialog} severity="success">
                        Photo Upload Success
                    </Alert>
                </Snackbar>

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField autoFocus
                                   margin="dense"
                                   type="file"
                                   fullWidth
                                   variant="outlined"
                                   name='product_photo'
                                   onChange={(e) => change(e)}
                        />

                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='primary' onClick={register}>
                    Upload
                </Button>
                <Button onClick={() => closeDialog(false)} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default SupplierRegister