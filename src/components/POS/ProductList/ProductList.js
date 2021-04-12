import {Button, CircularProgress, Divider, makeStyles, TextField} from "@material-ui/core";
import ProductCard from "./ProductCard";
import {useEffect} from "react";

const style = makeStyles(() => ({
    productList: {
        width: '100%'
    },
    navigation: {

        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 13,
        marginBottom: 12,
        alignItems: 'center',
        textAlign: 'center',
        '& div': {
            marginLeft: 10,

        },
        '& p': {
            marginTop: 0,
            marginBottom: 0,
            marginRight: 20
        }
    },
    products: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflowY: 'auto',
        marginBottom: 10,
        maxHeight: 700
    },
    product: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 220,
        height: 190,
        marginLeft: 10,
        marginTop: 10,
        '& p': {
            marginTop: 5,
            marginBottom: 10,
        },
        '& img': {
            width: '50%',
            height: '50%',
        },
    }
}))


const ProductList = ({loading, data}) => {
    useEffect(() => {

    },[data])
    const classes = style()
    return (
        <div className={classes.productList}>
            <div className={classes.navigation}>
                <Button variant={'contained'} style={{marginLeft:20}} color={'primary'} disableElevation>CheckOut</Button>
                <TextField id="outlined-basic" size="small" placeholder={"Search"} variant="outlined"/>
                <p>Assign User</p>
            </div>
            <Divider/>

            <div className={classes.products}>
                {
                    loading ? <CircularProgress style={{marginTop: 20}}/> :
                        data.map(product =>
                            <ProductCard key={product.id} price={product.price} classes={classes} name={product.name} id={product.code} picture={product.photo}/>)
                }

            </div>

        </div>
    )
}

export default ProductList