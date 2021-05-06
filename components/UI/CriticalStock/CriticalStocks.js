import { useEffect, useState} from "react";
import style, {TableOptions as options} from "../_style/TableStyle";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {getCriticalStockProduct} from "../../../utils/ServerEndPoint";
import {CriticalStockTable as columns, InsertCriticalStock as insert} from "../../../utils/tableColumn/CriticalStocks";
import {CircularProgress, Grid, Paper} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography";
const CriticalStocks = () => {


    const classes = style()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const temp = []
            await baseUrlWithAuth.get(getCriticalStockProduct).then((stocks) => {
                stocks.data.map(stock => temp.push(insert(stock.product.code,stock.product.name,stock.branch.location)))
            }).catch(error => {
                console.log(error)
            })
            setData(temp)
        }


        getData().then(ignored => {}).catch(error => {
            console.log(error)
        })
        setLoading(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Grid component="main" className={classes.root}>
            <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>

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