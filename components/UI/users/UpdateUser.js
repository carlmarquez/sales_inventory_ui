import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    Grid, InputLabel, Select,
    TextField
} from "@material-ui/core"
import {useState, Fragment, useEffect} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {
    userUpdate,
} from "../../../utils/ServerEndPoint";
import Response from "../../../utils/Response/Response";
import FindUser from "./FindUser";
import {Autocomplete} from "@material-ui/lab";
import CreateError from "../../../utils/FormError/CreateError";
import RemoveError from "../../../utils/FormError/RemoveError";
import CheckEmail from "../../../utils/FormError/CheckEmail";


const UpdateUser = (
    {
        closeDialog,
        dialog,
        Reload,
        stores,
        user
    }) => {


    // data
    const [id, setId] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState(1)
    const [password, setPassword] = useState('')
    const [reTypePassword, setRetypePassword] = useState('')
    const [storeId, setStoreId] = useState('')


    const [findUserDialog, setFindUserDialog] = useState(false)

    const RemoveFormError = () => {
        RemoveError(setFirstNameError, setFirstNameErrorMessage);
        RemoveError(setLastNameError, setLastNameErrorMessage)
        RemoveError(setEmailError, setEmailErrorMessage)
        RemoveError(setStoreError, setStoreErrorMessage)
        RemoveError(setPasswordError, setPasswordErrorMessage)
        RemoveError(setPasswordReError, setPasswordReErrorMessage)
    }

    // for snack bar
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // error state
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordReError, setPasswordReError] = useState(false)
    const [storeError, setStoreError] = useState(false)


    // error message
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('')
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [passwordReErrorMessage, setPasswordReErrorMessage] = useState('')
    const [storeErrorMessage, setStoreErrorMessage] = useState('')


    const register = async (event) => {
        event.preventDefault()

        RemoveFormError()
        let error = false

        if (password !== reTypePassword) {
            CreateError(setPasswordReError, setPasswordReErrorMessage, 'Password Do Not Match')
            CreateError(setPasswordError, setPasswordErrorMessage, 'Password Do Not Match')

            error = true
        }

        if (firstName.trim().length === 0) {
            error = true
            CreateError(setFirstNameError, setFirstNameErrorMessage, 'Please Insert Firstname')

        }

        if (lastName.trim().length === 0) {
            error = true
            CreateError(setLastNameError, setLastNameErrorMessage, 'Please Insert LastName')

        }

        if (!CheckEmail(email,setEmailError,setEmailErrorMessage, 'PLease Input A Valid Email')) {
            error = true
        }
        if (storeId.length === 0) {
            error = true
            CreateError(setStoreError, setStoreErrorMessage, 'Please Select Branch')
        }

        if (password.trim().length === 0) {
            error = true
            CreateError(setPasswordError, setPasswordErrorMessage, 'Please Enter Password')
        }

        if (reTypePassword.length === 0) {
            error = true
            CreateError(setPasswordReError, setPasswordReErrorMessage, 'Please Enter Password')
        }

        if (!error) {
            const data = {
                id,
                email,
                password,
                firstName,
                lastName,
                role,
                StoreId: user.role === 3?parseInt(storeId.id): user.StoreId,
                status: 1
            }


            await baseUrlWithAuth.post(userUpdate, data).then(ignored => {
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
        setStoreId(storeTemp)
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
                    <form noValidate={false} onSubmit={register}>
                        <DialogTitle id="add-student">Update User</DialogTitle>
                        <DialogContent>

                            <Response showError={error}
                                      errorTitle={errorTitle}
                                      errorMessage={errorMessage}
                                      showSnackBar={show}
                                      successMessage='User Register Success'
                                      closeSnackBar={() => setShow(false)}
                            />

                            <Grid container spacing={1}>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        error={firstNameError}
                                        helperText={firstNameErrorMessage}
                                        required
                                        autoFocus
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
                                        error={lastNameError}
                                        helperText={lastNameErrorMessage}
                                        required
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
                                        required
                                        error={emailError}
                                        helperText={emailErrorMessage}
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
                                        required
                                        error={passwordError}
                                        helperText={passwordErrorMessage}
                                        margin="dense"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        autoComplete={"on"}
                                    />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={passwordReError}
                                        helperText={passwordReErrorMessage}
                                        required
                                        margin="dense"
                                        label="Re-type Password"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        value={reTypePassword}
                                        onChange={e => setRetypePassword(e.target.value)}
                                        autoComplete={"on"}
                                    />
                                </Grid>

                                <Grid item md={user.role === 3? 6: 12} xs={12}>
                                    <FormControl variant="outlined" margin='dense' fullWidth>
                                        <InputLabel
                                            htmlFor="role">{'Role'}</InputLabel>
                                        <Select
                                            required
                                            native
                                            value={role}
                                            label={'Role'}
                                            inputProps={{
                                                name: 'role',
                                                id: 'role',
                                            }}
                                            onChange={(event => setRole(parseInt(event.target.value)))}
                                        >
                                            <option value='1'>Cashier</option>
                                            <option value='2'>Manager</option>
                                            {
                                                user.role === 3? <option value='3'>Owner</option>: null
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {
                                    user.role === 3? <Grid item md={6} xs={12}>
                                        <FormControl variant="outlined" margin='dense' fullWidth>
                                            <Autocomplete
                                                size={"small"}
                                                id="combo-box-demo"
                                                value={storeId}
                                                options={stores}
                                                getOptionLabel={(option) => option.location}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                onChange={(event, value) => setStoreId(value !== null ? value : '')}
                                                renderInput={(params) =>
                                                    <TextField error={storeError} helperText={storeErrorMessage}
                                                               required {...params}
                                                               label="Branch Name"
                                                               variant="outlined"/>}
                                            />
                                        </FormControl>
                                    </Grid>:null
                                }

                            </Grid>
                        </DialogContent>

                        <DialogActions>

                            <Button type={"submit"} color='primary' onClick={register}>
                                Update
                            </Button>
                            <Button onClick={() => closeDialog(false)} color='secondary'>
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
        }
    </Fragment>

}

export default UpdateUser