import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Button} from "@material-ui/core";
import {ProductTransfer as columns, InsertProductTransfer as insert} from '../../../utils/tableColumn/ProductTransfer'
import MUIDataTable from 'mui-datatables'
import Typography from "@material-ui/core/Typography";
import {useEffect, Fragment,useState} from "react";
import {baseUrlWithAuth} from "../../mainUI/BaseUrlWithAuth";
import {ReceiveList} from "../../../utils/ServerEndPoint";
import 'react-dates/lib/css/_datepicker.css';
import ReceiveItem from "./ReceiveItem";

const Transfered = () => {
    const classes = style()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [dialog,setDialog] = useState(false)

    useEffect(() => {


        getData().then(ignored => {})
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getData = async () => {
        setLoading(true)
        const temp = []
        await baseUrlWithAuth.get(ReceiveList).then((receives) => {
            console.log(receives)
            receives.data.map(receive =>
                temp.push(insert(receive.code, receive.from.location,receive.to.location,receive.arrangeBy.email,receive.createdAt)))
        })
        setData(temp)
        setLoading(false)

    }

    return (
        <Fragment>
            <ReceiveItem getData={getData} dialog={dialog} closeDialog={() => setDialog(false)} />
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Button variant={"contained"} onClick={() => {setDialog(true)}} disableElevation color={'primary'}>
                                Receive Item
                            </Button>
                        </Box>

                    </Toolbar>


                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                Transfered List
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
        </Fragment>
    )
}

export default Transfered

