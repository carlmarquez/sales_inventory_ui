import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Tooltip} from "@material-ui/core";
import {SalesTable as columns, InsertSales as insert} from '../../../utils/tableColumn/SalesTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {salesList} from "../../../utils/ServerEndPoint";
import IconButton from "@material-ui/core/IconButton";
import TimelineIcon from '@material-ui/icons/Timeline';

export const Sales = () => {
    const classes = style()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        const getData = async () => {
            setLoading(true)
            const temp = []
            await baseUrlWithAuth.get(salesList).then((sales) => {
                sales.data.map(sale =>
                    temp.push(insert(sale.id, sale.Product.name, sale.Product.price, sale.qty, sale.total, sale.Transaction.id, sale.createdAt))
                )
            })
            setData(...data, temp)
            setLoading(false)
        }
        
        getData().then(ignored => {})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid component="main" className={classes.root}>
            <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                <Toolbar>
                    <Box className={classes.tableNavbarBox}>
                        <Tooltip title="View Sales By Date" aria-label="add">
                            <IconButton aria-label="addProduct"
                                        color={"primary"}>
                                <TimelineIcon fontSize={"large"}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <p style={{margin: 0}}>
                        <b>Total Sales:</b>
                    </p>
                </Toolbar>
            </Grid>
            <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                <MUIDataTable
                    title={
                        <Typography variant="h6">
                            Sales List
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


