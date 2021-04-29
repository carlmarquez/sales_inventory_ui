import {Grid, Paper} from "@material-ui/core";
import DashBoardStyle from "./DashBoardStyle";
import {Fragment, useEffect, useState} from "react";

// icons
import StoreIcon from '@material-ui/icons/Store';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import FaceIcon from '@material-ui/icons/Face';

//
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {dashBoardData} from "../../../utils/ServerEndPoint";

const Card = () => {
    const style = DashBoardStyle()

    const colors = ['#273c75', '#e84118', '#00a8ff', '#c56cf0', '#3d3d3d']
    const [data, setData] = useState({})
    const icons = [
        <StoreIcon className={style.icons}/>,
        <SupervisorAccountIcon className={style.icons}/>,
        <AccountCircleIcon className={style.icons}/>,
        <PhoneAndroidIcon className={style.icons}/>,
        <FaceIcon className={style.icons}/>
    ]

    useEffect(() => {
        const getData = async () => {
            let temp = {}
            await baseUrlWithAuth.get(dashBoardData).then(e => {
                temp = e.data;
            })
            setData(temp)
        }


        getData().then(ignored => {
        })
    }, [])

    return (
        <Fragment>
            {
                Object.entries(data).map((e, i) =>
                    <Grid item key={i} component={Paper} md={2} xs={12} style={{backgroundColor: colors[i]}}
                          className={style.card}>
                        <h2 style={{padding: 0, margin: 5}}>{e[0]}</h2>
                        {icons[i]}
                        <p style={{fontSize: 35, margin: 0}}><b>{e[1]}</b></p>
                    </Grid>
                )

            }

        </Fragment>
    )
}

export default Card