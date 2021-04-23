import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    Grid, InputLabel, Select,
    TextField
} from "@material-ui/core"
import {useState, Fragment, useEffect} from "react";
import {Axios} from "../../../utils/axios/Axios";
import {
   userUpdate,
} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";
import FindUser from "./FindUser";
import {Autocomplete} from "@material-ui/lab";


const UpdateUser = (
    {
        closeDialog,
        dialog,
        Reload,
        stores
    }) => {


    // data
    const [id,setId] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState(1)
    const [password, setPassword] = useState('')
    const [reTypePassword, setRetypePassword] = useState('')
    const [store, setStore] = useState('')


    const [findUserDialog, setFindUserDialog] = useState(false)

    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const register = async (event) => {
        event.preventDefault()

        const data = {
            id,
            email,
            password,
            firstName,
            lastName,
            role,
            StoreId: store.id,
            status: 1
        }


        await Axios.post(userUpdate, data).then(ignored => {
            setError(false)
            Reload()
            alert("Update Success")
            setFindUserDialog(true)

        }).catch(error => {
            const response = error.response.data
            setErrorMessage(response.message)
            setErrorTitle(response.title)
        })


    }

    useEffect(() => {
        setFindUserDialog(dialog)
    }, [dialog])

    // update
    const updateUser = (user) => {
        setId(user.id)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setRole(user.role)
        setPassword(user.password)
        setRetypePassword(user.password)
        setFindUserDialog(false)
        const storeTemp = stores.find(e => e.id === user.StoreId)
        setStore(storeTemp)
    }


    return <Fragment>
        {
            findUserDialog === true ?
                <FindUser updateClose={closeDialog} closeDialog={() => setFindUserDialog(false)}
                          updateUser={updateUser} dialog={findUserDialog}/>
                :
                <Dialog
                    open={dialog}
                    onClose={closeDialog}
                    aria-labelledby="add-student"
                    maxWidth={"md"}
                >
                    <DialogTitle id="add-student">Update User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Insert if you have any note
                        </DialogContentText>

                        <Response showError={error}
                                  errorTitle={errorTitle}
                                  errorMessage={errorMessage}
                                  showSnackBar={show}
                                  successMessage='User Register Success'
                                  closeSnackBar={() => setShow(false)}
                        />

                        <Grid container spacing={1}>
                            <Grid item md={4} xs={12}>
                                <TextField autoFocus
                                           margin="dense"
                                           label="First Name"
                                           type="text"
                                           fullWidth
                                           variant="outlined"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                />

                            </Grid>

                            <Grid item md={4} xs={12}>
                                <TextField
                                    margin="dense"
                                    label="Last Name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>

                            <Grid item md={4} xs={12}>
                                <TextField
                                    margin="dense"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    margin="dense"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    margin="dense"
                                    label="Re-type Password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    value={reTypePassword}
                                    onChange={e => setRetypePassword(e.target.value)}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <FormControl variant="outlined" margin='dense' fullWidth>
                                    <InputLabel htmlFor="Major">Role</InputLabel>
                                    <Select
                                        native
                                        value={role}
                                        label="Major"
                                        inputProps={{
                                            name: 'age',
                                            id: 'Major',
                                        }}
                                        onChange={(event => setRole(parseInt(event.target.value)))}
                                    >
                                        <option value='1'>User</option>
                                        <option value='2'>Manager</option>
                                        <option value='3'>Owner</option>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <FormControl variant="outlined" margin='dense' fullWidth>
                                    <Autocomplete
                                        size={"small"}
                                        id="combo-box-demo"
                                        value={store}
                                        options={stores}
                                        getOptionLabel={(option) => option.name + ' ' + option.state}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        onChange={(event, value) => setStore(value.id)}
                                        renderInput={(params) => <TextField {...params} label="Store Branch"
                                                                            variant="outlined"/>}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                    </DialogContent>

                    <DialogActions>

                        <Button type={"submit"} color='primary' onClick={register}>
                            Register
                        </Button>
                        <Button onClick={() => closeDialog(false)} color='secondary'>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
        }
    </Fragment>

}

export default UpdateUser