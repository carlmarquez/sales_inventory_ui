import ItemCard  from "./ItemCard";
import ScrollToBottom from 'react-scroll-to-bottom';
import {Divider} from "@material-ui/core";
const ItemList = ({classes,items,totalPrice}) => {
    return (
        <ScrollToBottom className={classes.itemList}>
            {
                items.map((item,index) =>
                    <ItemCard key={index} classes={classes} name={item.productName} brand={item.productBrand} price={item.price} qty={item.qty}/>)
            }
            <Divider/>
            <p className={classes.titlePrice} ><b>Total:</b>₱{totalPrice}</p>
        </ScrollToBottom>
    )
}

export default ItemList