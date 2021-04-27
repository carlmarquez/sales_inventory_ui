import { Button, CircularProgress, Divider, makeStyles, TextField, Tooltip} from "@material-ui/core"
import ProductCard from "./ProductCard"
import {useEffect, useState} from "react"
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import IconButton from "@material-ui/core/IconButton";

const style = makeStyles(() => ({
    productList: {
        width: '100%',
        backgroundColor: '#F8F8F8',
    },
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
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
        flex: 1,
        overflowY: 'auto',
        marginBottom: 10,
        maxHeight: '70%'
    },
    product: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 150,
        height: 150,
        marginLeft: 10,
        marginTop: 10,

    },
    productTop: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '& p': {
            marginTop: 5,
            marginBottom: 10,
        },
        '& img': {
            width: '50%',
            height: '50%',
        },
    },
    productTopButtonRight: {
        display: 'flex',
        justifyContent:'center',
        alignItems:"center"
    }
}))


const ProductList = ({user,switchUser,logout,checkOut, data}) => {

    const [search,setSearch] = useState('')
    const [tempData,setTempData] = useState([])

    const [loading, setLoading] = useState(true)

    const searchChange = (e) => {
        setSearch(e)
       if(e.length !== 0) {
           const result = data.filter(product => product.name.toUpperCase().startsWith(search.toUpperCase()))
           setTempData(result)
           return
       }

       setTempData(data)
    }

    useEffect(() => {
        setLoading(true)
        setTempData(data)
        setLoading(false)
    }, [data])

    const classes = style()
    return (
        <div className={classes.productList}>
            <div className={classes.navigation}>
                <Button onClick={checkOut} variant={'contained'} style={{marginLeft: 20}} color={'primary'}
                        disableElevation>CheckOut</Button>

                <TextField id="outlined-basic" value={search} onChange={(e) => {searchChange(e.target.value)}} size="small" placeholder={"Search"} variant="outlined"/>

                <div className={classes.productTopButtonRight}>
                    <p>{`${user.firstName} ${user.lastName}`}</p>

                    <Tooltip onClick={logout} title="Logout" aria-label="logout">
                        <IconButton aria-label="logout"
                                    color={"primary"}>
                            <ExitToAppIcon fontSize={"large"}/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip onClick={switchUser} title="Switch" aria-label="switch">
                        <IconButton aria-label="Switch"
                                    color={"primary"}>
                            <SwapHorizIcon fontSize={"large"}/>
                        </IconButton>
                    </Tooltip>


                </div>
            </div>
            <Divider/>

            <div className={classes.products}>
                {
                    loading ? <CircularProgress style={{marginTop: 20}}/> :
                        tempData.slice(0, 20).map(product =>
                            <ProductCard key={product.id} price={product.price} classes={classes} name={product.name}
                                         id={product.code} picture={product.photo}/>)
                }

            </div>

        </div>
    )
}

export default ProductList