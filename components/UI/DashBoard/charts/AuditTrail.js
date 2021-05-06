import {Fragment, useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {baseUrlWithAuth} from "../../../mainUI/BaseUrlWithAuth";
import {dashBoardTodayAudit} from "../../../../utils/ServerEndPoint";
import {MonthsWord} from "../../../../utils/date/ConvertMonthWord";



// Generate Order Data
function createData(date, location, user, action, value) {
    return { date:MonthsWord(date), location, user, action, value };
}




export default function RecentAuditTrail() {

    const [rows,setRows] = useState([])
    const temp = []
    useEffect(() => {
        const getData = async () => {
            await baseUrlWithAuth.get(dashBoardTodayAudit).then(recentAudit => {
                recentAudit.data.map(recent => temp.push(createData(recent.createdAt,recent.Store.location, recent.User.email, recent.action,recent.value)))
            }).catch(error => {
                console.log(error)
            })
            console.log(temp)
            setRows(temp)
        }
        getData().then(ignored => {})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Fragment>
            <Title>Recent AuditTrail</Title>
            <Table size="small"  style={{paddingBottom: 10}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, id) => (
                        <TableRow key={id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.location}</TableCell>
                            <TableCell>{row.user}</TableCell>
                            <TableCell>{row.action}</TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Fragment>
    );
}