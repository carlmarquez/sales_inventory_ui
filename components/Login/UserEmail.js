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
import {baseUrlNoAuth} from "../../utils/axios/BaseUrl";
import {resetPasswordFindUser} from "../../utils/ServerEndPoint";

const FindProduct = (
    {
        setStep,
        branch,
        setUser
    }) => {


    const [email, setEmail] = useState('')



    const register = async (event) => {
        event.preventDefault()
        const data = {
            email,
            StoreId: branch.id
        }

        await baseUrlNoAuth.post(resetPasswordFindUser,data).then(e=> {
            setUser(e.data)
            setStep(3)
        }).catch(ignored => {
           alert("Can't Find User")
        })


    }


    return <Dialog
        open={true}
        onClose={() =>setStep(1)}
        aria-labelledby="add-student"
        maxWidth={"md"}
        fullWidth
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Find Email</DialogTitle>
            <DialogContent>

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Email"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='primary' onClick={register}>
                    Next
                </Button>
                <Button onClick={()=>setStep(1)} color='secondary'>
                    Back
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default FindProduct