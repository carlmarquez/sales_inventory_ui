import {Fragment, useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {dashBoardTodayTransaction} from "../../../../utils/ServerEndPoint";
import {baseUrlWithAuth} from "../../../mainUI/BaseUrlWithAuth";
import {MonthsWord} from "../../../../utils/date/ConvertMonthWord";

// Generate Order Data
function createData(date, transaction, branch, user, value) {
    return {date: MonthsWord(date), transaction, branch, user, value};
}

export default function RecentTransaction({setTotal}) {
    const [rows, setRows] = useState([])
    useEffect(() => {
        const temp = []
        let amount = 0
        const getData = async () => {
           await baseUrlWithAuth.get(dashBoardTodayTransaction)
                .then(transactions => {
                    // eslint-disable-next-line array-callback-return
                    transactions.data.map(transaction => {
                        amount += transaction.amount
                        temp.push(createData(transaction.createdAt, transaction.code, transaction.Store.location, transaction.User.email, transaction.amount))
                    })
                }).catch(error => {
                   console.log(error)
            })


            setRows(temp)
            setTotal(amount)
        }

        getData().then(ignored => {})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Fragment>
            <Title>Recent Transaction</Title>
            <Table size="small" style={{paddingBottom: 10}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Transaction Code</TableCell>
                        <TableCell>Branch</TableCell>
                        <TableCell>Assign User</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, id) => (
                        <TableRow key={id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.transaction}</TableCell>
                            <TableCell>{row.branch}</TableCell>
                            <TableCell>{row.user}</TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Fragment>
    );
}