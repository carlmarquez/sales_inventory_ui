import {Paper} from "@material-ui/core";
import {serverEndpoint} from "../../../utils/ServerEndPoint";

const ProductCard = ({classes, price, name, id, picture}) => {
    return (
        <Paper className={classes.product} variant={'outlined'}>
            <div className={classes.productTop}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img src={`${serverEndpoint}/product/getImage/${picture}`}
                     alt={`Product Picture${id}`}/>
                <p style={{margin: 0, marginTop: 5}}>{name}</p>
                <p style={{margin: 0, marginTop: 5}}>{`₱ ${price}`}</p>
            </div>

            <p style={{
                margin: 0,
                backgroundColor: '#E0E0E0',
                width: '100%',
                textAlign: 'center',
                padding: 2,
                fontSize: 18
            }}>{id}</p>

        </Paper>
    )
}

export default ProductCard