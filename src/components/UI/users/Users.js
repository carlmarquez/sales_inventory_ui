import style, {TableOptions as options} from '../_style/TableStyle'
import {Paper, Grid, Box, Toolbar, CircularProgress, Tooltip} from "@material-ui/core";
import {UserTable as columns, InsertUser as insert} from '../../../utils/tableColumn/UserTable'
import MUIDataTable from 'mui-datatables'
import {Axios} from '../../../utils/axios/Axios'
import {useEffect, useState,Fragment} from "react";
import Typography from "@material-ui/core/Typography";
import UserRegister from "./UserRegister";
import {userList} from "../../../utils/ServerEndPoint";
import DeleteUser from "./DeleteUser";
import IconButton from "@material-ui/core/IconButton";

// icons
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled'
import UpdateIcon from '@material-ui/icons/Update'
export const Users = () => {
    const classes = style()

    const [dialog, setDialog] = useState(false);
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)


    const [deleteUser, setDeleteUser] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()  => {

        setLoading(true)

        const wew = async () => {
            return await Axios.get(userList)
        }

        // create data temp so our state will not mutate
        const item = []

        await wew().then(e => {
            e.data.map(user =>
                item.push(insert(user.id,user.email,user.firstName,user.lastName,user.role, user.Store.name, user.status))
            )
        }).catch(error => {
            console.log(error)
        })

        setData(...data, item)
        setLoading(false)

    }, [])

    const insertData = (user) => {
        const newData = [user,...data]
        setData(newData)
    }

    const deleted = (email) => {
        const temp = data.filter(e=> e.email !== email)
        setData(temp)
    }

    return (
        <Fragment>
            <DeleteUser deleted={deleted} dialog={deleteUser} closeDialog={() => setDeleteUser(false)}/>
            <UserRegister dialog={dialog} closeDialog={() => setDialog(false)}  insertData={insertData}/>
            <Grid component="main" className={classes.root}>
                <Grid item component={Paper} md={12} sm={12} xs={12} className={classes.tableNavbar}>
                    <Toolbar>
                        <Box className={classes.tableNavbarBox}>
                            <Tooltip title="Add User" aria-label="add">
                                <IconButton onClick={() => setDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <PersonAddIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Remove User" aria-label="add">
                                <IconButton  onClick={() => setDeleteUser(true)} aria-label="addProduct"
                                            color={"secondary"}>
                                    <PersonAddDisabledIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Update User" aria-label="add">
                                <IconButton onClick={() => setDialog(true)} aria-label="addProduct"
                                            color={"primary"}>
                                    <UpdateIcon fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>

                        </Box>

                    </Toolbar>
                </Grid>
                <Grid item md={12} component={Paper} className={classes.tableContainerWrapper}>
                    <MUIDataTable
                        title={
                            <Typography variant="h6">
                                User List
                                {loading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
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


