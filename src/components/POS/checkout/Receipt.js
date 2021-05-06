import './Receipt.css'

import {useEffect, Fragment, useState} from "react";
import {Dialog} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {transactionInsert} from "../../../utils/ServerEndPoint";
import ShortUniqueId from 'short-unique-id';
import {months, MonthsWord} from "../../../utils/date/ConvertMonthWord";


const Receipt = ({
                     dialog,
                     cancel,
                     user,
                     customer,
                     initialAmount,
                     item,
                     setItem,
                     posOn,
                     transaction,
                     setPrice,
                     setCheckOutDialog,
                     getData
                 }) => {

    const [today, setToday] = useState('')
    const [discount, setDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [step, setStep] = useState(1)
    const [code, setCode] = useState('')
    const [valid, setValid] = useState(true)
    const [items, setItems] = useState([])
    const [initAmount, setInitAmount] = useState(initialAmount)
    console.log(user)
    useEffect(() => {
        if (posOn) {
            const codeGenerate = new ShortUniqueId()
            const c_today = new Date();
            const dd = String(c_today.getDate()).padStart(2, '0');
            const mm = String(c_today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = c_today.getFullYear();
            setToday(months[mm - 1] + '/' + dd + '/' + yyyy)
            const tempCode = `${codeGenerate()}-${mm}-${dd}`
            setCode(tempCode)
            setItems(item)
        } else {
            setStep(3)
            setToday(MonthsWord(transaction.createdAt))
            setTotalPrice(transaction.amount)
            setCode(transaction.code)
            setDiscount(transaction.discount)
            setInitAmount(transaction.amount - transaction.discount)
            const map = new Map()

            for (let i = 0; i < item.length; i++) {
                const code = item[i].Product.code
                if (map.get(code) === undefined) {
                    map.set(code, 1)
                    continue
                }

                map.set(code, map.get(code) + 1)
            }

            const tempData = item.filter((v, i, a) => a.findIndex(t => (t.code === v.code)) === i)
            const tempItem = []
            for (let code of map.keys()) {
                const product = tempData.find(e => e.Product.code === code)
                tempItem.push({
                    productName: product.Product.name,
                    productBrand: product.Product.brand,
                    price: product.Product.price,
                    qty: map.get(code),
                    code,
                    id: product.Product.id
                })

            }

            setItems(tempItem)
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (posOn) {
            const amount = initialAmount - discount
            setTotalPrice(amount)
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [discount])

    const back = () => {
        if (step >= 2) {
            setStep(step - 1)
        }
    }

    const applyDiscount = () => {
        const tempDiscount = prompt('Enter Discount Value');
        if (tempDiscount > initialAmount) {
            alert("Make Sure Discount Is Lower Or Equal Than Initial Amount")
            return
        }


        if (tempDiscount <= 0) {
            alert("Make Sure Discount Is Greater Than Zero")
            return
        }

        setDiscount(tempDiscount)

    }

    const saveTransaction = async () => {
        setStep(step + 1)
        const data = {
            code,
            amount: initialAmount,
            discount: discount,
            CustomerId: customer.id,
            StoreId: user.StoreId,
            UserId: user.id,
            items
        }
        if (valid) {
            await baseUrlWithAuth.post(transactionInsert, data).then(ignored => {
                alert("Transaction Save")
                setValid(false)
                setItem([])
                getData()
                setPrice(0)
            }).catch(error => {
                console.log(error)
            })

        }

    }


    const print = () => {
        const mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html lang="" onload="window.print()"><head><title>' + document.title + '</title>');
        mywindow.document.write('<style>' +
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
            '</style>')
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById('receipts').innerHTML);
        mywindow.document.write('</body></html>');

        // mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        // mywindow.close();
        cancel()

        setCheckOutDialog(false)
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
                    <div className="col-md-12 bodyReceipt">
                        <div className="table_heading">
                            <p><b>Jars Cecullar, Inc</b></p>
                            <p><b>Cashier Assign: </b>{user.firstName} {user.lastName}</p>
                        </div>
                        <div className="transaction_info">

                            <div className="from">
                                <h4 style={{marginBottom: 0}}>From:</h4>
                                <address className="">
                                    <strong className="text-inverse">JAR'S CELLULAR PHONES & ACCESSORIES
                                        HAUS<sup>-2</sup></strong><br/>
                                    2nd Flr. San Pablo Shopping Mall<br/>
                                    San Pablo City<br/>
                                </address>
                            </div>
                            <div className="to">
                                <h4 style={{marginBottom: 0}}>To:</h4>

                                <address className="m-t-5 m-b-5">
                                    <strong className="text-inverse">{customer.name}</strong><br/>
                                    {customer.address}<br/>
                                    {customer.city}, {customer.postalCode}<br/>
                                </address>
                            </div>

                            <div className="transaction_data">
                                <h4 style={{marginBottom: 0}}>Transction:</h4>
                                <div className="date text-inverse m-t-5">{today}</div>
                                <div className="invoice-detail">
                                    <b>{code}</b>
                                    <br/>
                                </div>
                            </div>


                        </div>
                        <div className="wrapper">

                            <div className="table">

                                <div className="row header green">
                                    <div className="cell">
                                        Product Name
                                    </div>
                                    <div className="cell">
                                        Product Code
                                    </div>
                                    <div className="cell">
                                        Price
                                    </div>
                                    <div className="cell">
                                        Quantity
                                    </div>
                                    <div className="cell" style={{textAlign: 'right'}}>
                                        Total
                                    </div>
                                </div>

                                {
                                    items.map((item, id) =>
                                        <div key={id} className="row">
                                            <div className="cell">
                                                {item.productName}
                                            </div>
                                            <div className="cell">
                                                {item.code}
                                            </div>
                                            <div className="cell">
                                                ₱ {item.price}
                                            </div>
                                            <div className="cell">
                                                {item.qty}
                                            </div>
                                            <div className="cell" style={{textAlign: 'right'}}>
                                                ₱ {item.price * item.qty}
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>

                        <div className="prices">
                            <div className="format" style={{paddingLeft: 50, backgroundColor: '#e9e9e9'}}>
                                <p>Initial Amount</p>
                                <h2>₱ {initAmount}</h2>
                            </div>

                            <div className="format" style={{paddingLeft: 50, flex: 1, backgroundColor: '#e9e9e9'}}>
                                <p>DISCOUNT</p>
                                <h2>₱ {discount}</h2>
                            </div>

                            <div className="format"
                                 style={{backgroundColor: '#DEDEDE', width: 300, textAlign: 'right'}}>
                                <div style={{textAlign: 'left', marginLeft: 20}}>
                                    <p style={{width: '100%', fontSize: 20}}><b>Total</b></p>
                                </div>
                                <h2 style={{marginRight: 20}}>₱ {totalPrice}</h2>
                            </div>

                        </div>
                    </div>
                </Box>
                <span className="printButton">

                    {
                        step === 1 ?
                            <Fragment>
                                <Button style={{marginBottom: 20, marginTop: 20}} onClick={applyDiscount}
                                        variant={"contained"}
                                        color={"primary"}>
                                    Apply Discount
                                </Button>
                                <Button style={{marginBottom: 20, marginTop: 20, marginLeft: 10}}
                                        onClick={() => setStep(step + 1)}
                                        variant={"contained"}
                                        color={"primary"}>
                                    Next
                                </Button>
                            </Fragment> : null
                    }
                    {
                        step === 2 ? <Button style={{marginBottom: 20, marginTop: 20}} onClick={saveTransaction}
                                             variant={"contained"}
                                             color={"primary"}>
                            Save Transaction
                        </Button> : null
                    }

                    {
                        step === 3 ?
                            <Button style={{marginBottom: 20, marginTop: 20, marginLeft: 10}} onClick={print}
                                    variant={"contained"}
                                    color={"primary"}>
                                Print
                            </Button> : null
                    }

                    {
                        step === 4 ?
                            <Button style={{marginBottom: 20, marginTop: 20, marginLeft: 10}} onClick={back}
                                    variant={"contained"}
                                    color={"primary"}>
                                Back
                            </Button> : null
                    }
            </span>
            </Dialog>
        </Fragment>
    )
}

export default Receipt