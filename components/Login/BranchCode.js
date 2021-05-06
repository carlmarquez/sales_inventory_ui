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
import {resetPasswordFindBranch} from "../../utils/ServerEndPoint";
import {baseUrlNoAuth} from "../../utils/axios/BaseUrl";

const BranchCode = (
    {
        setBranch,
        setStep
    }) => {


    const [code, setCode] = useState('')


    const register = async (event) => {
        event.preventDefault()

        const data= {
            code
        }
        await baseUrlNoAuth.post(resetPasswordFindBranch, data).then(e=> {
            setStep(2)
            setBranch(e.data)
            console.log(e.data)
        }).catch(ignored => {
            alert('Invalid Code')
        })

    }


    return <Dialog
        open={true}
        onClose={() =>setStep(0)}
        aria-labelledby="branch-code"
        maxWidth={"md"}
        fullWidth
    >
        <form onSubmit={register}>

            <DialogTitle id="add-student">Find Branch Code</DialogTitle>
            <DialogContent>

                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Store Code"
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
                <Button onClick={() =>setStep(0)} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}


export default BranchCode