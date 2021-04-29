import './Receipt.css'

import {useEffect, useRef, Fragment, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, TableCell, TextField} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Response from "../../../utils/Response/Response";

var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const Receipt = ({
                     dialog,
                     cancel
                 }) => {

    const [today, setToday] = useState('')

    useEffect(() => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        setToday(months[mm - 1] + '/' + dd + '/' + yyyy)
    }, [])

    const print = () => {
        const mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('<style>' +
            '@media print {\n' +
            '  body {-webkit-print-color-adjust: exact;}\n' +
            '}\n' +
            '.invoice {\n' +
            '    width: 100%\n' +
            '}\n' +
            '\n' +
            '.invoice-company {\n' +
            '    font-size: 20px;\n' +
            '    display: flex;\n' +
            '    justify-content: space-between;\n' +
            '}\n' +
            '\n' +
            '.invoice-company p{\n' +
            '    margin: 0;\n' +
            '}\n' +
            '\n' +
            '.invoice-header {\n' +
            '    background: #f0f3f4;\n' +
            '    padding: 10px;\n' +
            '    display: flex;\n' +
            '    justify-content: space-between;\n' +
            '}\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '.invoice-date .date,\n' +
            '.invoice-from strong,\n' +
            '.invoice-to strong {\n' +
            '    font-size: 16px;\n' +
            '    font-weight: 600\n' +
            '}\n' +
            '\n' +
            '.invoice-date {\n' +
            '    text-align: right;\n' +
            '    padding-left: 20px\n' +
            '}\n' +
            '\n' +
            '.invoice-price {\n' +
            '    background: #f0f3f4;\n' +
            '    display: table;\n' +
            '    width: 100%\n' +
            '}\n' +
            '\n' +
            '.invoice-price .invoice-price-left,\n' +
            '.invoice-price .invoice-price-right {\n' +
            '    display: table-cell;\n' +
            '    padding: 20px;\n' +
            '    font-size: 20px;\n' +
            '    font-weight: 600;\n' +
            '    width: 75%;\n' +
            '    position: relative;\n' +
            '    vertical-align: middle\n' +
            '}\n' +
            '\n' +
            '.invoice-price .invoice-price-left .sub-price {\n' +
            '    display: table-cell;\n' +
            '    vertical-align: middle;\n' +
            '    padding: 0 20px\n' +
            '}\n' +
            '\n' +
            '.invoice-price small {\n' +
            '    font-size: 12px;\n' +
            '    font-weight: 400;\n' +
            '    display: block\n' +
            '}\n' +
            '\n' +
            '.invoice-price .invoice-price-row {\n' +
            '    display: table;\n' +
            '    float: left\n' +
            '}\n' +
            '\n' +
            '.invoice-price .invoice-price-right {\n' +
            '    width: 25%;\n' +
            '    background: #2d353c;\n' +
            '    color: #fff;\n' +
            '    font-size: 28px;\n' +
            '    text-align: right;\n' +
            '    vertical-align: bottom;\n' +
            '    font-weight: 300\n' +
            '}\n' +
            '\n' +
            '.invoice-price .invoice-price-right small {\n' +
            '    display: block;\n' +
            '    opacity: .6;\n' +
            '    position: absolute;\n' +
            '    top: 10px;\n' +
            '    left: 10px;\n' +
            '    font-size: 12px\n' +
            '}\n' +
            '\n' +
            '.invoice-footer {\n' +
            '    border-top: 1px solid #ddd;\n' +
            '    padding-top: 10px;\n' +
            '    font-size: 10px\n' +
            '}\n' +
            '\n' +
            '.invoice-note {\n' +
            '    color: #999;\n' +
            '    margin-top: 80px;\n' +
            '    font-size: 85%\n' +
            '}\n' +
            '\n' +
            '.invoice>div:not(.invoice-footer) {\n' +
            '    margin-bottom: 20px\n' +
            '}\n' +
            '\n' +
            '.btn.btn-white, .btn.btn-white.disabled, .btn.btn-white.disabled:focus, .btn.btn-white.disabled:hover, .btn.btn-white[disabled], .btn.btn-white[disabled]:focus, .btn.btn-white[disabled]:hover {\n' +
            '    color: #2d353c;\n' +
            '    background: #fff;\n' +
            '    border-color: #d9dfe3;\n' +
            '}\n' +
            '\n' +
            '.printButton{\n' +
            '    display: flex;\n' +
            '    justify-content: center;\n' +
            '}\n</style>')
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title + '</h1>');
        mywindow.document.write(document.getElementById('receipts').innerHTML);
        mywindow.document.write('</body></html>');

        // mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        // mywindow.close();

        return true
    }

    return (
        <Fragment>
            <Dialog
                open={dialog}
                onClose={cancel}
                aria-labelledby="add-student"
                maxWidth={"md"}
                fullWidth
            >
                <Box id="receipts" component={Paper}>
                    <div className="col-md-12">
                        <div className="invoice">
                            {/*begin invoice-company*/}
                            <div className="invoice-company text-inverse f-w-600">
                                <p><b>Jars Cecullar, Inc</b></p>
                                <p><b>Assign Cashier</b></p>
                            </div>
                            {/*end invoice-company */}
                            {/*begin invoice-header */}
                            <div className="invoice-header">
                                <div className="invoice-from">
                                    <small>From:</small>
                                    <address className="">
                                        <strong className="text-inverse">JAR'S CELLULAR PHONES & ACCESSORIES
                                            HAUS<sup>-2</sup></strong><br/>
                                        2nd Flr. San Pablo Shopping Mall<br/>
                                        San Pablo City<br/>
                                    </address>
                                </div>
                                <div className="invoice-to">
                                    <small>To:</small>
                                    <address className="m-t-5 m-b-5">
                                        <strong className="text-inverse">Customer Name</strong><br/>
                                        Street Address<br/>
                                        City, Zip Code<br/>
                                    </address>
                                </div>
                                <div className="invoice-date">
                                    <small>Transaction:</small>
                                    <div className="date text-inverse m-t-5">{today}</div>
                                    <div className="invoice-detail">
                                        transaction id<br/>
                                    </div>
                                </div>
                            </div>
                            {/*end invoice-header*/}
                            {/*begin invoice-content*/}
                            <div className="invoice-content">
                                {/*begin table-responsive*/}
                                <div className="table-responsive">
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>Product Name</b></TableCell>
                                                <TableCell><b>Product Code</b></TableCell>
                                                <TableCell><b>Price</b></TableCell>
                                                <TableCell><b>Quantity</b></TableCell>
                                                <TableCell align="right"><b>Total</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                <span
                                                    className="text-inverse">Website design &amp; development</span><br/>
                                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                        id
                                                        sagittis
                                                        arcu.</small>
                                                </TableCell>
                                                <TableCell>39</TableCell>
                                                <TableCell>$50.00</TableCell>
                                                <TableCell>50</TableCell>
                                                <TableCell align="right">$2,500.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                <span
                                                    className="text-inverse">Website design &amp; development</span><br/>
                                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                        id
                                                        sagittis
                                                        arcu.</small>
                                                </TableCell>
                                                <TableCell>39</TableCell>
                                                <TableCell>$50.00</TableCell>
                                                <TableCell>50</TableCell>
                                                <TableCell align="right">$2,500.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                <span
                                                    className="text-inverse">Website design &amp; development</span><br/>
                                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                        id
                                                        sagittis
                                                        arcu.</small>
                                                </TableCell>
                                                <TableCell>39</TableCell>
                                                <TableCell>$50.00</TableCell>
                                                <TableCell>50</TableCell>
                                                <TableCell align="right">$2,500.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                <span
                                                    className="text-inverse">Website design &amp; development</span><br/>
                                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                        id
                                                        sagittis
                                                        arcu.</small>
                                                </TableCell>
                                                <TableCell>39</TableCell>
                                                <TableCell>$50.00</TableCell>
                                                <TableCell>50</TableCell>
                                                <TableCell align="right">$2,500.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                <span
                                                    className="text-inverse">Website design &amp; development</span><br/>
                                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                        id
                                                        sagittis
                                                        arcu.</small>
                                                </TableCell>
                                                <TableCell>39</TableCell>
                                                <TableCell>$50.00</TableCell>
                                                <TableCell>50</TableCell>
                                                <TableCell align="right">$2,500.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                <span
                                                    className="text-inverse">Website design &amp; development</span><br/>
                                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                        id
                                                        sagittis
                                                        arcu.</small>
                                                </TableCell>
                                                <TableCell>39</TableCell>
                                                <TableCell>$50.00</TableCell>
                                                <TableCell>50</TableCell>
                                                <TableCell align="right">$2,500.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                <span
                                                    className="text-inverse">Website design &amp; development</span><br/>
                                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                        id
                                                        sagittis
                                                        arcu.</small>
                                                </TableCell>
                                                <TableCell>39</TableCell>
                                                <TableCell>$50.00</TableCell>
                                                <TableCell>50</TableCell>
                                                <TableCell align="right">$2,500.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                <span
                                                    className="text-inverse">Website design &amp; development</span><br/>
                                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                        id
                                                        sagittis
                                                        arcu.</small>
                                                </TableCell>
                                                <TableCell>39</TableCell>
                                                <TableCell>$50.00</TableCell>
                                                <TableCell>50</TableCell>
                                                <TableCell align="right">$2,500.00</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                {/*end table-responsive*/}
                                {/*begin invoice-price*/}
                                <div className="invoice-price">
                                    <div className="invoice-price-left">
                                        <div className="invoice-price-row">
                                            <div className="sub-price">
                                                <small>INITIAL AMOUNT</small>
                                                <span className="text-inverse">$4,500.00</span>
                                            </div>
                                            <div className="sub-price">
                                                <i className="fa fa-plus text-muted"/>
                                            </div>
                                            <div className="sub-price">
                                                <small>DISCOUNT</small>
                                                <span className="text-inverse">$108.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="invoice-price-right">
                                        <small>TOTAL</small> <span className="f-w-600">$4508.00</span>
                                    </div>
                                </div>
                                {/*end invoice-price*/}
                            </div>


                        </div>
                    </div>
                </Box>
                <span className="printButton">
                <Button style={{marginBottom: 20, marginTop: 20}} onClick={print} variant={"contained"}
                        color={"primary"}>
                    Print
                </Button>
            </span>
            </Dialog>
        </Fragment>
    )
}

export default Receipt