const ItemCard = ({classes, name, price, brand, qty}) => {
    return (
        <div className={classes.itemCard}>
            <div className={classes.titlePrice}>
                <p>{name}</p>
                <p>{price}</p>
            </div>
            <div className={classes.productDescription}>
                <p>{brand}</p>
                <p>{qty}</p>
            </div>
        </div>
    )
}

export default ItemCard