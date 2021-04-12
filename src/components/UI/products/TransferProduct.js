import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    Grid, Snackbar,
    TextField
} from "@material-ui/core"
import {useEffect, useState} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {productDelete, storeList} from "../../../utils/ServerEndPoint";
import {Alert, AlertTitle, Autocomplete} from "@material-ui/lab";


const TransferProduct = (
    {
        closeDialog,
        dialog,
        insertData
    }) => {


    // for autocomplete
    const [stores, setStores] = useState([])

    const [qty, setQty] = useState(1)
    const [code, setCode] = useState('')
    const [store, setStore] = useState()


    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    const close = () => {
        setShow(false)
    }


    const register = (event) => {
        event.preventDefault()

        const data = {
            code,
            qty: parseInt(qty)
        }

        Axios.post(productDelete, data).then(e => {
            setError(false)
            setShow(true)
        }).catch(error => {
            const response = error.response.data
            setErrorMessage(response)
            setError(true)
        })


    }
    useEffect(async () => {
        Axios.get(storeList).then(e => {
            setStores(e.data)
        })


    }, [])
    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"md"}
        fullWidth
    >
        <form  onSubmit={register}>


            <DialogTitle id="add-student">Transfer Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Transfer Product To Another Branch
                </DialogContentText>

                {
                    error ? <Alert variant="filled" severity="error">
                        <AlertTitle><strong>{errorMessage.name}</strong></AlertTitle>
                        <strong>{errorMessage.message}</strong>
                    </Alert> : null
                }

                <br/>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={show} autoHideDuration={3000} onClose={close}>
                    <Alert onClose={closeDialog} severity="success">
                        Product Register Success
                    </Alert>
                </Snackbar>

                <Grid container spacing={1}>

                    <Grid item md={4} xs={12}>
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

                    <Grid item md={4} xs={12}>
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

                    <Grid item md={4} xs={12}>
                        <FormControl variant="outlined" margin='dense' fullWidth>
                            <Autocomplete
                                size={"small"}
                                options={stores}
                                getOptionLabel={(option) => option.name + ' ' + option.state}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, value) => setStore(value)}
                                renderInput={(params) => <TextField {...params} label="Store" variant="outlined"/>}
                            />
                        </FormControl>
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


export default TransferProduct