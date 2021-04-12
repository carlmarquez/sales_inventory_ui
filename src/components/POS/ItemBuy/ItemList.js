import ItemCard  from "./ItemCard";
import ScrollToBottom from 'react-scroll-to-bottom';
const ItemList = ({classes,items}) => {
    console.log("The item here")
    console.log(items)

    return (
        <ScrollToBottom className={classes.itemList}>
            {
                items.map((item,index) =>
                    <ItemCard key={index} classes={classes} name={item.productName} brand={item.productBrand} price={item.price} qty={item.qty}/>)
            }

        </ScrollToBottom>
    )
}

export default ItemList