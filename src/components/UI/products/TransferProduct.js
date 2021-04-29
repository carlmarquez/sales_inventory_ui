import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    Grid,
    TextField
} from "@material-ui/core"
import {useEffect, useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {productTransfer, storeList} from "../../../utils/ServerEndPoint";
import {Autocomplete} from "@material-ui/lab";
import Response from "../../../utils/Response/Response";


const TransferProduct = (
    {
        closeDialog,
        dialog,
        transfer
    }) => {


    // for autocomplete
    const [stores, setStores] = useState([])

    const [qty, setQty] = useState(1)
    const [code, setCode] = useState('')
    const [store, setStore] = useState(null)


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
        if(store === null){
            alert("Please insert store to transfer")
            return
        }
        const data = {
            code,
            qty: parseInt(qty),
            storeID: store.id
        }

        baseUrlWithAuth.post(productTransfer, data).then(e => {
            setError(false)
            setShow(true)
            transfer()
        }).catch(error => {
            const response = error.response.data
            setErrorMessage(response.message)
            setErrorTitle(response.title)
            setError(true)
        })


    }
    useEffect(() => {
        baseUrlWithAuth.get(storeList).then(e => {
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
        <form onSubmit={register}>


            <DialogTitle id="add-student">Transfer Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Transfer Product To Another Branch
                </DialogContentText>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage='Product Transfer Success'
                          closeSnackBar={close}
                />

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
                            onChange={e => setQty(e.target.value < 0 ? 1 : e.target.value)}
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

                <Button type={"submit"} color='primary' onClick={register}>
                    Transfer
                </Button>
                <Button onClick={() => closeDialog(false)} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default TransferProduct