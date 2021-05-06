import React, { useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './ChartSales';
import TodaySales from './TodaySales';
import RecentTransaction from "./RecentTransaction";
import RecentAuditTrail from "./AuditTrail";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        marginTop: 20,
        overflow:'hidden'
    },

    title: {
        flexGrow: 1,
    },

    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Charts() {

    const classes = useStyles();
    const [total,setTotal] = useState(0)

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <main style={{width: '100%'}}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper} style={{height: 400}}>
                            <Chart/>
                        </Paper>
                    </Grid>
                    {/* Today Sales */}
                    <Grid item xs={12} md={4} lg={3} alignItems={"flex-end"} style={{textAlign:'right'}}>
                        <Paper className={fixedHeightPaper} >
                            <TodaySales total={total}/>
                        </Paper>
                    </Grid>
                    {/* Recent Transaction */}
                    <Grid item xs={12} >
                        <Paper className={classes.paper} >
                            <RecentTransaction setTotal={setTotal}/>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <RecentAuditTrail/>
                        </Paper>
                    </Grid>
                </Grid>

            </main>
        </div>
    );
}