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
import {useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {userInsert} from "../../../utils/ServerEndPoint";
import {Autocomplete} from "@material-ui/lab";
import Response from "../../../utils/Response/Response";
import RemoveError from "../../../utils/FormError/RemoveError";
import CreateError from "../../../utils/FormError/CreateError";


const UserRegister = (
    {
        closeDialog,
        dialog,
        Reload,
        stores
    }) => {


    // user data
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState(1)
    const [password, setPassword] = useState('')
    const [reTypePassword, setRetypePassword] = useState('')
    const [storeId, setStoreId] = useState('')


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
    const close = () => {
        setShow(false)
    }

    const RemoveFormError = () => {
        RemoveError(setFirstNameError,setFirstNameErrorMessage);
        RemoveError(setLastNameError, setLastNameErrorMessage)
        RemoveError(setEmailError,setEmailErrorMessage)
        RemoveError(setStoreError,setStoreErrorMessage)
        RemoveError(setPasswordError,setPasswordErrorMessage)
        RemoveError(setPasswordReError,setPasswordReErrorMessage)

    }

    const register = (event) => {
        event.preventDefault()
        RemoveFormError()
        let error = false

        if (password !== reTypePassword || reTypePassword !== password) {
            CreateError(setPasswordReError,setPasswordReErrorMessage,'Password Do Not Match')
            CreateError(setPasswordError,setPasswordErrorMessage,'Password Do Not Match')

            error = true
        }

        if(firstName.trim().length === 0){
            error = true
            CreateError(setFirstNameError,setFirstNameErrorMessage, 'Please Insert Firstname')

        }

        if(lastName.trim().length === 0){
            error = true
            CreateError(setLastNameError,setLastNameErrorMessage,'Please Insert LastName')

        }

        if(email.trim().length===0){
            error = true
            CreateError(setEmailError, setEmailErrorMessage, 'Please Insert Email')
        }
        if(storeId.length===0){
            error = true
            CreateError(setStoreError, setStoreErrorMessage,'Please Select Branch')
        }

        if(password.trim().length ===0){
            error =true
            CreateError(setPasswordError, setPasswordErrorMessage, 'Please Enter Password')
        }

        if(reTypePassword.length===0){
            error = true
            CreateError(setPasswordReError, setPasswordReErrorMessage, 'Please Enter Password')
        }

        if (!error) {
            const data = {
                email,
                password,
                firstName,
                lastName,
                role,
                StoreId: parseInt(storeId),
                status: 1
            }

            baseUrlWithAuth.post(userInsert, data).then(ignored => {
                Reload()
                setFirstName('')
                setEmail('')
                setLastName('')
                setRetypePassword('')
                setPassword('')
                setStoreId('')
                setError(false)
                setShow(true)
                RemoveFormError()
            }).catch(error => {
                const response = error.response.data
                setErrorMessage(response.message)
                setErrorTitle(response.title)
                setError(true)
            })
        }


    }


    return <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="add-student"
        maxWidth={"md"}
    >
        <form noValidate={false} onSubmit={register}>


            <DialogTitle id="add-student">Register User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insert if you have any note
                </DialogContentText>

                <Response showError={error}
                          errorTitle={errorTitle}
                          errorMessage={errorMessage}
                          showSnackBar={show}
                          successMessage='User Register Success'
                          closeSnackBar={close}
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
                            autoComplete="on"
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
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
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
                                options={stores}
                                getOptionLabel={(option) => option.name + ' ' + option.state}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, value) => setStoreId(value!==null?value.id:'')}
                                renderInput={(params) =>
                                    <TextField error={storeError} helperText={storeErrorMessage} required {...params}
                                               label="Store Branch"
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
        </form>
    </Dialog>
}


export default UserRegister