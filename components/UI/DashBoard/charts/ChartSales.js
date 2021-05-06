import React, {Fragment, useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import Title from './Title';
import {baseUrlWithAuth} from "../../../mainUI/BaseUrlWithAuth";
import {dashBoardTopTenSales} from "../../../../utils/ServerEndPoint";

export default function ChartSales() {

    const [data,setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            await baseUrlWithAuth.get(dashBoardTopTenSales).then(e => {
                let temp = e.data
                setData(temp)
            }).catch(error => {
                console.log(error)
            })
        }

        getData().then(ignored => {})
    }, [])

    return (
        <Fragment>
            <Title>Top 10 Selled Products: </Title>
            <ResponsiveContainer width={'100%'}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={10}
                >
                    <XAxis dataKey="name" scale="point" padding={{left: 10, right: 10}}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Bar dataKey="pv" fill="#8884d8" background={{fill: '#eee'}}/>
                </BarChart>
            </ResponsiveContainer>
        </Fragment>
    );
}