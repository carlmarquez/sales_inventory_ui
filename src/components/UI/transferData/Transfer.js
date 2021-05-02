import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress,Button} from "@material-ui/core";
import {ProductTransfer as columns, InsertProductTransfer as insert} from '../../../utils/tableColumn/ProductTransfer'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {salesList} from "../../../utils/ServerEndPoint";
import 'react-dates/lib/css/_datepicker.css';
 const Transfered = () => {
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

        }

        getData().then(ignored => {})
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid component="main" className={classes.root}>
            <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                <Toolbar>
                    <Box className={classes.tableNavbarBox}>
                        <Button variant={"contained"} disableElevation color={'primary'}>
                            Recieve Item
                        </Button>
                    </Box>

                </Toolbar>


            </Grid>
            <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                <MUIDataTable
                    title={
                        <Typography variant="h6">
                            Transfered List
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

export default Transfered

