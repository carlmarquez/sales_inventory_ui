import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";
import Response from "../../../utils/Response/Response";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {transactionReturnItem} from "../../../utils/ServerEndPoint";
import {useEffect, useState} from "react";
import FindTransaction from "./FindTransaction";

const ReturnItem = ({
                        dialog,
                        closeDialog
                    }) => {

    const [code, setCode] = useState('')
    const [reason, setReason] = useState('')
    const [transactionCode, setTransactionCode] = useState('')
    const [find, setFindDialog] = useState(false)
    const [sales, setSales]= useState([])




    // for snack bar
    const [showing, setShowing] = useState(false)
    const [error] = useState(false)
    const [errorTitle] = useState('')
    const [errorMessage] = useState('')

    const register = async (event) => {

        event.preventDefault()
        let itemId = 0
        const result = sales.find(e => {

            itemId = e.id

            return e.Product.code === parseInt(code)
        })

        if(result === undefined){
            alert("Product Code Is Not In The Transaction")
            return
        }
        const data = {
            ProductId:itemId,
            TransactionId: transactionCode.id,
            code: transactionCode.code,
            reason
        }

        await baseUrlWithAuth.post(transactionReturnItem,data).then(e => {
            setShowing(transactionCode)
            console.log(e)
        }).catch(error => {
            console.log(error)
        })


    }

    const updateTransactionCode = (transaction) => {
        setTransactionCode(transaction.transaction)
        setSales(transaction.sales)
        setFindDialog(false)
    }

    useEffect(() => {
        setFindDialog(dialog)
    }, [dialog])

    const cancel = () => {
        setFindDialog(false)
        closeDialog(false)
    }

    return find === true ?
        <FindTransaction dialog={find} closeDialog={cancel} updateTransactionCode={updateTransactionCode}/> :
        <Dialog
            open={dialog}
            onClose={cancel}
            aria-labelledby="add-student"
            maxWidth={"md"}
            fullWidth
        >
            <form onSubmit={register}>

                <DialogTitle id="add-student">Please Input The Product Code And Reason</DialogTitle>
                <DialogContent>
                    <Response showError={error}
                              errorTitle={errorTitle}
                              errorMessage={errorMessage}
                              showSnackBar={showing}
                              successMessage={"Product Returned Success"}
                              closeSnackBar={() => setShowing(false)}
                    />
                    <br/>

                    <Grid container spacing={1}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Enter Product Code"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                margin="dense"
                                label="Enter Reason"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>

                    <Button type={"submit"} color='primary' onClick={register}>
                        Return
                    </Button>
                    <Button onClick={cancel} color='secondary'>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

}

export default ReturnItem