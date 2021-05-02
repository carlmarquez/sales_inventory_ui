import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress,Button} from "@material-ui/core";
import {SalesTable as columns, InsertSales as insert} from '../../../utils/tableColumn/SalesTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {salesList} from "../../../utils/ServerEndPoint";
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
export const Sales = () => {
    const classes = style()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(new Date())

    useEffect(() => {

        const getData = async () => {
            setLoading(true)
            const temp = []
            await baseUrlWithAuth.get(salesList).then((sales) => {
                sales.data.map(sale =>
                    temp.push(insert(sale.Product.code, sale.Product.name, sale.Product.price,  sale.Transaction.code, sale.createdAt))
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
                        <label htmlFor="dateStart">Date Start : </label>
                        <input style={{marginRight: 10}} value={date1} onChange={e => setDate1(e.target.value)} type="date" id="dateStart" name="dateStart"/>

                        <label htmlFor="dateEnd" >Date End : </label>
                        <input type="date" id="dateEnd" name="dateEnd" value={date2} onChange={(e) => setDate2(e.target.value)}/>
                    </Box>
                    <Button variant={"contained"} disableElevation color={'primary'}>
                        Print This Data
                    </Button>
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


