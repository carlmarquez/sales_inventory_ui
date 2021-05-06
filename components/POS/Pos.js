import {Grid, Divider} from "@material-ui/core";
import ItemList from "./ItemBuy/ItemList";
import InputItem from "./InputItem/InputItem";
import ProductList from "./ProductList/ProductList";
import {style} from "./PosStyle";
import {useEffect, useState, Fragment, lazy} from "react";
import {baseUrlWithAuth} from "../mainUI/BaseUrlWithAuth";
import {productFindById, productList} from "../../utils/ServerEndPoint";

const CustomerExistDialog = lazy(() => import(`./checkout/CustomerExistDialog`))
const CustomerForm = lazy(() => import(`./checkout/CustomerForm`))
const FindCustomer = lazy(() => import(`./checkout/FindCustomer`))
const Receipt = lazy(() => import(`./checkout/Receipt`))

const Pos = ({setPosOn, user}) => {
    const classes = style()

    const [products, setProducts] = useState([])
    const [code, setCode] = useState('')
    const [itemBuy, setItemBuy] = useState([])
    const [qty, setQty] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)
    const [customer, setCustomer] = useState()

    // dialog
    const [checkOutDialog, setCheckOutDialog] = useState(false)
    const [customerFormDialog, setCustomerFormDialog] = useState(false)
    const [findCustomerDialog, setFindCustomerDialog] = useState(false)
    const [printReceipt, setPrintReceipt] = useState(false)


    useEffect(() => {

        getData().then(ignored => {})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getData = async () => {
        const temp = []
        await baseUrlWithAuth.get(productList, {
            params: {
                branch: user.StoreId,
                status: 'available'
            }
        }).then(async (products) => {
            products.data.map(product =>
                temp.push(product)
            )
            setProducts(temp)
        })

    }


    const insert = (item, qty) => {
        const product = item[0]
        return {
            productName: product.name,
            productBrand: product.brand,
            price: product.price,
            qty,
            code,
            id: product.id
        }
    }

    const remove = async () => {
        if (itemBuy.length === 0) {
            alert("The Item Is Empty")
            return
        }
        let code = prompt('Enter Product Code');

        let index = 0

        const find = itemBuy.find((e, i) => {
            index = i;
            return e.code === code
        })


        // if the item code is invalid
        if (find === undefined) {
            alert("Product Code Invalid")
            return
        }

        // deleting item in left side bar
        let checkoutItem = [...itemBuy]
        if(find.qty === 1){
            checkoutItem.splice(index, 1)
            setItemBuy(checkoutItem)
        }else{
           checkoutItem[index].qty = checkoutItem[index].qty - 1
        }

        const currentTotalPrice = totalPrice - find.price;
        setTotalPrice(currentTotalPrice)
        const currentProduct = [...products]
        await baseUrlWithAuth.get(productFindById, {id: find.id}).then(e => {
            currentProduct.push(e.data)
        }).catch(error => {
            console.log(error)
        })
        setProducts(currentProduct)

    }

    const cancelTransaction =  () => {
        getData().then(ignored => {})
        setItemBuy([])
        setTotalPrice(0)
        alert("Transaction Cancel Successful")
    }


    const buy = async (event) => {

        if (event.which === 13) {
            let tempQ = qty

            const tempData = [...products]
            let last = null
            while (tempQ !== 0) {
                let current = null;
                const product = await tempData.find((e, index) => {
                    current = index
                    return e.code.toString() === code
                })

                if (current !== null && product !== undefined) {
                    last = tempData.splice(current, 1)

                } else {
                    alert("We don't have enough Supply")
                    break;
                }

                tempQ--
            }


            if (tempQ === 0) {
                const product = insert(last, qty)
                const newData = [...itemBuy, product]
                const newTotalPrice = totalPrice + (last[0].price * qty)

                setTotalPrice(newTotalPrice)
                setItemBuy(newData)
                setProducts(tempData)
                setQty(1)
                setCode('')
            }
        }

    }

    const checkOut = () => {
        if (itemBuy.length === 0) {
            alert("Please Buy First To Checkout")
            return
        }
        setCheckOutDialog(true)
    }

    const logout = () => {
        localStorage.clear()
        window.location.reload(true);

    }

    const switchUser = () => {
        if (user.role === 1) {
            alert("can't switch")
            return;
        }
        setPosOn(false)
    }

    const print = () => {
        setPrintReceipt(true)
    }

    return (
        <Fragment>
            <CustomerExistDialog
                setCustomer={setCustomer}
                registerCustomer={setCustomerFormDialog}
                findCustomer={setFindCustomerDialog}
                dialog={checkOutDialog}
                print={print}
                cancel={() => setCheckOutDialog(false)}/>


            {
                printReceipt ? <Receipt
                    getData={getData}
                    setCheckOutDialog={setCheckOutDialog}
                    setPrice={setTotalPrice}
                    item={itemBuy}
                    setItem={setItemBuy}
                    customer={customer}
                    initialAmount={totalPrice}
                    dialog={printReceipt}
                    user={user}
                    cancel={() => setPrintReceipt(false)}
                    posOn={true}/> : null
            }
            <FindCustomer setCustomer={setCustomer} print={print} dialog={findCustomerDialog}
                          closeDialog={() => setFindCustomerDialog(false)}/>

            <CustomerForm dialog={customerFormDialog} closeDialog={() => setCustomerFormDialog(false)}/>


            <Grid container className={classes.root}>
                <Grid container item md={3} className={classes.left}>
                    <p className={classes.leftText}>Sales And Inventory</p>
                    <Divider className={classes.divider} light/>

                    <ItemList
                        totalPrice={totalPrice}
                        items={itemBuy}
                        classes={classes}/>

                    <InputItem qty={qty}
                               setQty={setQty}
                               code={code}
                               setCode={setCode}
                               buy={buy}
                               classes={classes}
                    />
                </Grid>
                <Grid container item md={9} className={classes.right}>
                    <ProductList
                        cancelTransaction={cancelTransaction}
                        logout={logout}
                        checkOut={checkOut}
                        switchUser={switchUser}
                        user={user}
                        remove={remove}
                        data={products}/>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Pos
