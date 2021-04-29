import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {ListItem, ListItemIcon, ListItemText, SwipeableDrawer} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from "react-router-dom";

import TimelineIcon from '@material-ui/icons/Timeline';
import StoreIcon from '@material-ui/icons/Store';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsCellIcon from '@material-ui/icons/SettingsCell';
import GroupIcon from '@material-ui/icons/Group';
import ComputerIcon from '@material-ui/icons/Computer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
    list: {
        width: 240,

    },
    fullList: {
        width: 'auto',
    },
    toolbar: {
        textAlign: 'center'
    },
});

export default function Sidebar({setPosOn, open, handleDrawerClose, handleDrawerOpen}) {

    const classes = useStyles();

    return (
        <SwipeableDrawer
            anchor={'left'}
            open={open}
            onClose={handleDrawerClose}
            onOpen={handleDrawerOpen}
            className={classes.list}

        >
            <div className={classes.list}>
                <div className={classes.toolbar}>
                    <h3>Jars Invetory</h3>
                </div>
                <Divider/>
                <List>
                    <div>
                        {/*<ListSubheader className={style} inset>TEACHER</ListSubheader>*/}
                        <ListItem component={NavLink} to="/" button>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="DashBoard"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/products" button>
                            <ListItemIcon>
                                <SettingsCellIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Products"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/users" button>
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Users"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/supplier" button>
                            <ListItemIcon>
                                <SupervisedUserCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Supplier"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/customer" button>
                            <ListItemIcon>
                                <GroupIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Customer"/>
                        </ListItem>

                        <ListItem component={NavLink} to="/stores" button>
                            <ListItemIcon>
                                <StoreIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Stores"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/sales" button>
                            <ListItemIcon>
                                <TimelineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Sales"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/transaction" button>
                            <ListItemIcon>
                                <ReceiptIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Transaction"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/audit" button>
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Audit Trail"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/settings" button>
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Settings"/>
                        </ListItem>
                        <ListItem onClick={() => setPosOn(true)} button>
                            <ListItemIcon>
                                <ComputerIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Pos"/>
                        </ListItem>
                    </div>
                </List>
            </div>
        </SwipeableDrawer>
    )
}


