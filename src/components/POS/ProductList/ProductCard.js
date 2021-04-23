import {Button, makeStyles, Paper, TextField} from "@material-ui/core";
import {serverEndpoint} from "../../../utils/ServerEndPoint";

const ProductCard = ({classes,price, name, id,picture}) => {


    return (
        <Paper className={classes.product} variant={'outlined'}>
            <img src={`${serverEndpoint}`+`product/getImage/${picture}`}/>
            <p style={{margin:0}}>{name}</p>
            <p style={{margin:0}}>{`${price} $`}</p>
            <TextField
                inputProps={{min: 0, style: {textAlign: 'center'}}}
                value={id}/>
        </Paper>
    )
}

export default ProductCard
