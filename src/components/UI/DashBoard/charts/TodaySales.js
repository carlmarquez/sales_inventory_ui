import React, {useEffect, Fragment ,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {months} from "../../../../utils/date/ConvertMonthWord";


const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function TodaySales({total}) {
    const [dateToday, setDateToday] = useState('')
    const classes = useStyles();

    useEffect(() => {
        const date = new Date()
        setDateToday(`${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`)

    }, [])
    return (
        <Fragment>
            <Title>Today Sales</Title>
            <Typography component="p" variant="h4">
                ₱ {total}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on {dateToday}
            </Typography>

        </Fragment>
    );
}