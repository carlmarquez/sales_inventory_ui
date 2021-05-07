import { useEffect, useState} from "react";
import style, {TableOptions as options} from "../_style/TableStyle";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {getCriticalStockProduct, storeCreateRequest} from "../../../utils/ServerEndPoint";
import {CriticalStockTable as columns, InsertCriticalStock as insert} from "../../../utils/tableColumn/CriticalStocks";
import {Box, CircularProgress, Grid, Paper, Toolbar} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const CriticalStocks = () => {


    const classes = style()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const temp = []
            await baseUrlWithAuth.get(getCriticalStockProduct).then((stocks) => {
                console.log(stocks)
                stocks.data.map(stock => temp.push(insert(stock.product.code,stock.product.name,stock.branch.location)))
            }).catch(error => {
                setLoading(false)
                console.log(error)
            })
            setLoading(false)
            setData(temp)
        }


        getData().then(ignored => {}).catch(error => {
            console.log(error)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const requestClick = async () => {
        await baseUrlWithAuth.post(storeCreateRequest).then(e => {
            alert("Store Stock Request Is Created")
        }).catch(ignored => {
            alert("Store Stock Request Is Already Created")
        })
    }

    return (
        <Grid component="main" className={classes.root}>
            <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                <Toolbar>
                    <Box className={classes.tableNavbarBox}>
                        <Button onClick={requestClick} variant={"contained"} color={'primary'} disableElevation>
                            Request Stock
                        </Button>



                    </Box>
                </Toolbar>
            </Grid>
            <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                <MUIDataTable
                    title={
                        <Typography variant="h6">
                            Critical Stock List
                            {loading &&
                            <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}}/>}
                        </Typography>
                    }
                    data={data}
                    columns={columns}
                    options={options(loading)}
                />
            </Grid>
        </Grid>
    )
}

export default CriticalStocks