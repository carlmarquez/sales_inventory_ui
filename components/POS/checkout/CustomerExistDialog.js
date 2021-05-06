import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
} from "@material-ui/core";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {CustomerFind} from "../../../utils/ServerEndPoint";

const CustomerExistDialog = ({
                                 dialog,
                                 cancel,
                                 findCustomer,
                                 registerCustomer,
                                 print,
                                 setCustomer
                             }) => {

    const namelessClick = async () => {

        await baseUrlWithAuth.post(CustomerFind, {email:'Hidden@email.com'}).then(e => {
           setCustomer(e.data)
        }).catch(error => {
            console.log(error)
        })

        print()
    }
    return (
        <Dialog
            open={dialog}
            onClose={cancel}
            aria-labelledby="add-student"
            maxWidth={"md"}
            fullWidth
        >
            <form style={{textAlign:'center'}}>
                <DialogTitle id="add-student" style={{paddingBottom: 0, paddingTop:5}}><b>Customer Exist</b></DialogTitle>
                <DialogContent>

                    {/*<Response showError={error}*/}
                    {/*          errorTitle={errorTitle}*/}
                    {/*          errorMessage={errorMessage}*/}
                    {/*          showSnackBar={show}*/}
                    {/*          successMessage={"Product Find Success"}*/}
                    {/*          closeSnackBar={() => setShow(false)}*/}
                    {/*/>*/}


                    <br/>

                    <Grid container spacing={4} style={{marginBottom: 5}}>
                        <Grid item md={6} xs={6}>
                            <Button onClick={() => findCustomer(true)}
                                    fullWidth variant={"contained"}
                                    color={'primary'}
                                    disableElevation>Yes</Button>
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <Button
                                onClick={() => registerCustomer(true)}
                                fullWidth variant={"contained"}
                                color={'secondary'}
                                disableElevation>No</Button>
                        </Grid>
                        <Grid item md={12}>
                            <Button onClick={namelessClick}
                                    fullWidth variant={"contained"}
                                    style={{backgroundColor:'#333', color:'white'}}
                                    disableElevation>Nameless Transaction</Button>
                        </Grid>
                    </Grid>

                </DialogContent>

            </form>
        </Dialog>
    )
}

export default CustomerExistDialog