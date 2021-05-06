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

const NewPassword = (
    {
        setStep,
        setUserPassword,
        resetPassword
    }) => {


    const [password, setPassword] = useState('')
    const [reTypePassword, setReTypePassword]= useState('')


    const register = async (event) => {
        event.preventDefault()

        if(password !== reTypePassword){
            alert('Password Not Match')
            return
        }

        resetPassword()


    }

    const change = (data) => {
        setUserPassword(data)
        setPassword(data)
    }


    return <Dialog
        open={true}
        onClose={() => setStep(2)}
        aria-labelledby="add-student"
        maxWidth={"md"}
        fullWidth
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Set A New Password</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={(e) => change(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Re-type Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={reTypePassword}
                            onChange={(e) => setReTypePassword(e.target.value)}
                        />
                    </Grid>
                </Grid>


            </DialogContent>

            <DialogActions>

                <Button type={"submit"} color='primary' onClick={register}>
                    Submit
                </Button>
                <Button onClick={() => setStep(2)} color='secondary'>
                    Back
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default NewPassword