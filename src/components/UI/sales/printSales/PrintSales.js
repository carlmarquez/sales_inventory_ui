import '../../../UI/../POS/checkout/Receipt.css'
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const PrintSales = ({data,total,startDate,endDate,location}) => {


    return <Box id="printSales" style={{display: 'none'}} component={Paper}>
        <div className="col-md-12 bodyReceipt">

            <div className="transaction_info">

                <div className="from">
                    <h2>Start Date: {startDate} </h2>

                </div>
                <div className="to">
                    <div style={{textAlign: 'center'}}>
                        <h1 style={{marginBottom: 0}}>Total Sales In {location} </h1>

                    </div>

                </div>

                <div className="transaction_data">
                    <h2>End Date: {endDate}</h2>
                    {/*<div className="date text-inverse m-t-5">{today}</div>*/}
                    <div className="invoice-detail">
                        {/*<b>{code}</b>*/}
                        <br/>
                    </div>
                </div>


            </div>
            <div className="wrapper">

                <div className="table">

                    <div className="row header green">
                        <div className="cell">
                            Product Code
                        </div>
                        <div className="cell">
                            Product Name
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
                        data.map((item, id) =>
                            <div key={id} className="row">
                                <div className="cell">
                                    {item.productCode}
                                </div>
                                <div className="cell">
                                    {item.productName}
                                </div>
                                <div className="cell">
                                    ₱ {item.price}
                                </div>
                                <div className="cell">
                                    {item.quantity}
                                </div>
                                <div className="cell" style={{textAlign: 'right'}}>
                                    ₱ {item.total}
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>

            <div className="prices">
                <div className="format" style={{paddingLeft: 50, backgroundColor: '#e9e9e9'}}>

                </div>

                <div className="format" style={{paddingLeft: 50, flex: 1, backgroundColor: '#e9e9e9'}}>

                </div>

                <div className="format" style={{backgroundColor: '#DEDEDE', width: 300, textAlign: 'right'}}>
                    <div style={{textAlign: 'left', marginLeft: 20}}>
                        <p style={{width: '100%', fontSize: 20}}><b>Total</b></p>
                    </div>
                    <h2 style={{marginRight: 20}}>₱ {total}</h2>
                </div>

            </div>
        </div>
    </Box>
}

export default PrintSales