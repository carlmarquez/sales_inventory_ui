import {makeStyles} from "@material-ui/core";

export const style = makeStyles(() => ({
    root: {
        height: '100%',
        backgroundColor:'#F8F8F8',
        fontFamily: 'Oswald,sans-serif'
    },
    left: {
        height: '100%',
        display: 'flex',
        justifyContent:"center",
        flexFlow: 'column',
        borderRight: '1px solid rgba(0, 0, 0, 0.08)'
    },
    leftText:{
        fontSize: 30,
        marginTop:10,
            marginBottom:6.5,
            marginLeft: 10
    },
    right: {
        height: '100%'
    },
    itemList: {
        color:'black',
        flex:1,
        width: '100%',
        overflowY: 'auto'
    },
    divider: {
        width: '100%'
    },
    titlePrice:{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight:10,
        '& p':{
            marginTop:10,
            marginBottom:0
        }
    },
    itemCard:{
        width: '100%',
    },
    productDescription:{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight:10,
        '& p':{
            marginTop: 0,
            fontSize: 12
        }
    },
    inputItem:{
        backgroundColor: 'white',
        width: '100%',
        marginBottom: 10,
        display:'flex',
        justifyContent: "center",

    }
}))