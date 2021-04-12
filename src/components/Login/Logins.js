import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import style from './LoginStyle'
import SignLogo from '../../assets/img/logo/SignLogo.jpg'
import {Avatar} from "@material-ui/core";

const Login = () => {

    const classes = style();

    return (
        <Grid container component="main" className={classes.root}>

            <CssBaseline/>

            <Grid item xs={false} sm={false} md={8} className={classes.image}>

            </Grid>
            <Grid item xs={12} sm={12} md={4} component={Paper} elevation={0} square>


                <div className={classes.paper}>
                    <Avatar alt="Cindy Baker" className={classes.avatarLarge} src={SignLogo} />

                    <Typography component="h1" variant="h5" className={classes.text}>
                         Login Now
                    </Typography>


                    <form className={classes.form} noValidate>
                        <TextField

                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"

                            autoFocus
                        />
                        <TextField
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
                        {/*<Box className={classes.util}>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={<Checkbox value="remember" color="primary"/>}*/}
                        {/*        label="Remember me"*/}
                        {/*    />*/}
                        {/*    /!*<p>No Account Found</p>*!/*/}
                        {/*</Box>*/}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Grid item>
                                    <Button color="primary">Forgot Password</Button>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button color="primary" >Sign Up</Button>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            {/*<Copyright/>*/}
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}


export default Login