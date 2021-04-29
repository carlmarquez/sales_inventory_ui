import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, CircularProgress} from "@material-ui/core";
import {CustomerTable as columns, InsertCustomer as insert} from '../../../utils/tableColumn/CustomerTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {CustomerList} from "../../../utils/ServerEndPoint";


export const Customers = () => {
    const classes = style()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const temp = []
        const getData = async () => {
            await baseUrlWithAuth.get(CustomerList).then((customers) => {
                customers.data.map(customer =>
                    temp.push(insert(customer.id, customer.name, customer.email, customer.address, customer.city, customer.state, customer.postalCode, customer.mobile_no, customer.tel_no))
                )
            })
            setData(temp)
            setLoading(false)
        }

        getData().then(ignored => {})

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
                            Customer List
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


