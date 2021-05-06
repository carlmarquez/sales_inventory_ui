import style, {TableOptions as options} from '../_style/TableStyle'
import {
    Paper,
    Grid,
    Box,
    Toolbar,
    CircularProgress,
    Button,
    TextField,
    InputLabel,
    Select,
    FormControl
} from "@material-ui/core";
import {SalesTable as columns, InsertSales as insert} from '../../../utils/tableColumn/SalesTable'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {salesList, storeList} from "../../../utils/ServerEndPoint";
import PrintSales from "./printSales/PrintSales";

const curr = new Date();
const date = curr.toISOString().substr(0, 10);

const convertDateToWord = (date) => {
    const arr_date = date.split('-')

    const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return months[parseInt(arr_date[1], 10)] + ' ' + arr_date[2] + ', ' + arr_date[0]
}

export const Sales = ({user}) => {
    const classes = style()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [stores, setStores] = useState([])

    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(date)
    const [toPrintData, setToPrintData] = useState([])
    const [total, setTotal] = useState(0)
    const [branch, setBranch] = useState(user.StoreId)
    const [location, setLocation] = useState('')
    const role = user.role

    useEffect(() => {

        getData().then(ignored => {})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate, branch])


    const getData = async () => {
        setLoading(true)
        const temp = []
        const params = new URLSearchParams()
        params.append('startDate', startDate)
        params.append('endDate', endDate)
        params.append('branch', branch)
        await baseUrlWithAuth.get(storeList).then(e => {
            setStores(e.data)

            if (parseInt(branch) !== 0) {
                e.data.find(store => {
                    if (store.id === parseInt(branch)) {
                        setLocation(store.location)
                    }

                    return store.id === parseInt(branch)
                })
            }else{
                setLocation('All Branches')
            }


        })

        await baseUrlWithAuth.get(salesList, {params}).then((sales) => {
            sales.data.map(sale =>
                temp.push(insert(sale.Product.code, sale.Product.name, sale.Product.price, sale.Transaction.code, sale.createdAt))
            )
        })


        setData(temp)
        setLoading(false)
    }

    const changeStartDate = async (value) => {
        setStartDate(value)
    }

    const changeEndDate = async (value) => {
        setEndDate(value)
    }


    const printClick = async () => {
        await setTotal(0)
        const map = new Map()
        const productMap = new Map()
        for (let i = 0; i < data.length; i++) {

            if (map.get(data[i].productCode) === undefined) {
                map.set(data[i].productCode, 0)
                productMap.set(data[i].productCode, data[i])
            }

             map.set(data[i].productCode, map.get(data[i].productCode) + 1)
        }

        const tempPrint = []
        let tempValue = 0
        for (let key of map.entries()) {
            const tempTotal = key[1] * productMap.get(key[0]).price
            const templatePrint = {
                productCode: key[0],
                productName: productMap.get(key[0]).productName,
                price: productMap.get(key[0]).price,
                quantity: key[1],
                total: tempTotal
            }

            tempValue += tempTotal

            tempPrint.push(templatePrint)
        }

        setTotal(tempValue)

        await setToPrintData(tempPrint)
        console.log(toPrintData)

        // ---------- Print Data --------- //


        const mywindow = window.open('', 'PRINT', 'height=400,width=600');

        await mywindow.document.write('<html lang="" onload="window.print()"><head><title>Sales Print</title>');
        await mywindow.document.write('<style>' +
            '.bodyReceipt{\n' +
            '    font-family: "Helvetica Neue", Helvetica, Arial;\n' +
            '    font-size: 14px;\n' +
            '    line-height: 20px;\n' +
            '    font-weight: 400;\n' +
            '    -webkit-font-smoothing: antialiased;\n' +
            '    font-smoothing: antialiased;\n' +
            '    margin: 0;\n' +
            '}\n' +
            '\n' +
            '.wrapper {\n' +
            '    margin: 0 auto;\n' +
            '}\n' +
            '\n' +
            '.table {\n' +
            '    margin: 0 0 40px 0;\n' +
            '    width: 100%;\n' +
            '    display: table;\n' +
            '}\n' +
            '@media screen and (max-width: 580px) {\n' +
            '    .table {\n' +
            '        display: block;\n' +
            '    }\n' +
            '}\n' +
            '\n' +
            '.row {\n' +
            '    display: table-row;\n' +
            '    background: #f6f6f6;\n' +
            '}\n' +
            '.row:nth-of-type(odd) {\n' +
            '    background: #e9e9e9;\n' +
            '}\n' +
            '.row.header {\n' +
            '    font-weight: 900;\n' +
            '    color: #ffffff;\n' +
            '    background: #ea6153;\n' +
            '}\n' +
            '.row.green {\n' +
            '    background: #27ae60;\n' +
            '}\n' +
            '@media screen and (max-width: 580px) {\n' +
            '    .row {\n' +
            '        padding: 8px 0;\n' +
            '        display: block;\n' +
            '    }\n' +
            '}\n' +
            '\n' +
            '.cell {\n' +
            '    padding: 6px 12px;\n' +
            '    display: table-cell;\n' +
            '}\n' +
            '@media screen and (max-width: 580px) {\n' +
            '    .cell {\n' +
            '        padding: 2px 12px;\n' +
            '        display: block;\n' +
            '    }\n' +
            '}\n' +
            '.table_heading{\n' +
            '    display: flex;\n' +
            '    justify-content: space-between;\n' +
            '}\n' +
            '\n' +
            '.prices{\n' +
            '    display: flex;\n' +
            '}\n' +
            '\n' +
            '.format{\n' +
            '    font-family:\'Segoe UI,Tahoma, Geneva, Verdana, sans-serif\';\n' +
            '}\n' +
            '@media print {\n' +
            '    body {\n' +
            '        -webkit-print-color-adjust: exact;\n' +
            '    }\n' +
            '}\n' +
            '\n' +
            '.transaction_info{\n' +
            '    display: flex;\n' +
            '    justify-content: space-between;\n' +
            '    margin-bottom: 10px;\n' +
            '}\n' +
            '\n' +
            '.printButton{\n' +
            '    display: flex;\n' +
            '    justify-content: center;\n' +
            '}\n</style>')
        await mywindow.document.write('</head><body >');
        await mywindow.document.write(document.getElementById('printSales').innerHTML);
        await mywindow.document.write('</body></html>');


        // mywindow.document.close(); // necessary for IE >= 10
        await mywindow.focus(); // necessary for IE >= 10*/

        await mywindow.print();
        // mywindow.close();


    }

    return (
        <Grid component="main" className={classes.root}>
            <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                <Toolbar>
                    <Box className={classes.tableNavbarBox}>
                        <TextField
                            id="date"
                            label="Start Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={startDate}
                            onChange={e => changeStartDate(e.target.value)}
                        />


                        <TextField
                            style={{marginLeft: 30}}
                            label="End Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => changeEndDate(e.target.value)}
                            value={endDate}
                        />

                    </Box>
                    <Button variant={"contained"} onClick={printClick} disableElevation color={'primary'}>
                        Print This Data
                    </Button>
                    <FormControl style={{marginLeft: 10}} variant="outlined" margin='dense'>
                        <InputLabel htmlFor="Status">Branch</InputLabel>
                        <Select
                            native
                            value={branch}
                            label="Branch"
                            inputProps={{
                                name: 'Status',
                                id: 'Status',
                            }}
                            onChange={(e) => role === 3 ? setBranch(e.target.value) : null}
                        >
                            <option value='0'>All</option>
                            {
                                stores.map((e) => {
                                    return <option key={e.id} value={e.id}>{e.location}</option>
                                })
                            }
                        </Select>
                    </FormControl>
                </Toolbar>


            </Grid>
            <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>

                <PrintSales startDate={convertDateToWord(startDate)} endDate={convertDateToWord(endDate)}
                            data={toPrintData} location={location} total={total}/>
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


