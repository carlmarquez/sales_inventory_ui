import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    content: {
        width: '100%',
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: 20
        },
        marginTop:50
    },
    title: {
        flex: 1
    },


    badge: {
        backgroundColor: 'white !important',
        borderRadius: 50,
        padding: 4,

        marginRight: 10,
    },

    dropDownDark: {
        color: 'black !important',
    },
    dropDownLight: {
        backgroundColor: 'white !important',
        borderRadius: 50,
        fontSize: 31,
        marginTop:10,
        // marginRight: 10,
        marginBottom: 4,
    }

}));

export default useStyles