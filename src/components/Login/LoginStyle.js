import {makeStyles} from "@material-ui/core/styles";
import ue from '../../assets/img/logo/ue.png'
import bg from '../../assets/img/logo/bg.jpg'
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    util: {
        display: 'flex',
        justifyContent: 'space-between',
        '& p': {
            color: 'red'
        }
    },

    progress: {
        marginTop: 10,
        width: '100%'
    },

    avatarLarge: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: 10,
        border: '4px solid rgba(0, 0, 0, 0.08)'
    },

    text:{
        fontFamily: 'Oswald,sans-serif',
        fontSize: 25,
        fontWeight: "bold",
        color:'black'
    }

}));

export default useStyles;