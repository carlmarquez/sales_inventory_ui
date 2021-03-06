import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from './LoginStyle'
import SignLogo from '../../assets/img/logo/SignLogo.jpg'
import {Avatar} from "@material-ui/core";
import {useState, Fragment} from "react";
import {login as loginEndpoint} from "../../utils/ServerEndPoint";
import {baseUrlNoAuth} from "../../utils/axios/BaseUrl";
import ResetPassword from "./ResetPassword";

const Login = ({setToken, setUser}) => {

    const classes = style();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [step, setStep] = useState(0)
    

    const auth = {
        username: email,
        password
    }
    const login = async () => {

        await baseUrlNoAuth.post(loginEndpoint, auth).then(e => {
            setToken(e.data.accessToken)
            localStorage.setItem('jars-token', e.data.accessToken)
            setError('')
            setUser(e.data.user)
        }).catch(error => {
            setError(`Account ${error.response.data}`)
        })
    }

    const forgotPasswordClick = () => {
        setStep(1)
    }

    const changePassword = (e) => {
        setPassword(e)
    }

    const enter = (e) => {
        if (e.code === "Enter") {
            login()
        }
    }

    return <Fragment>
        <ResetPassword step={step} setStep={setStep}/>
        <Grid container component="main" className={classes.root}>

            <CssBaseline/>

            <Grid item xs={false} sm={false} md={8} className={classes.image}>

            </Grid>
            <Grid item xs={12} sm={12} md={4} component={Paper} elevation={0} square>


                <div className={classes.paper}>
                    <Avatar alt="Cindy Baker" className={classes.avatarLarge} src={SignLogo}/>

                    <Typography component="h1" variant="h5" className={classes.text}>
                        Login Now
                    </Typography>


                    <form className={classes.form} noValidate>
                        <TextField
                            onKeyPress={e => enter(e)}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputProps={{ className: classes.input, pattern: "[a-z]{1,15}" }}
                        />

                        <TextField
                            onKeyPress={e => enter(e)}
                            value={password}
                            onChange={e => changePassword(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Box className={classes.util}>
                            {
                                error.length === 0 ? null : <p style={{margin: 0, marginTop: 10}}>No Account Found</p>
                            }
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={login}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Grid item>
                                    <Button onClick={forgotPasswordClick} color="primary">Forgot Password</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Box mt={5}>
                            {/*<Copyright/>*/}
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    </Fragment>
}


export default Login