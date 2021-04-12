
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {ListItem, ListItemIcon, ListItemText, SwipeableDrawer} from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from "react-router-dom";

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

export default function Sidebar({open, handleDrawerClose, handleDrawerOpen}) {

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
                        <ListItem component={NavLink} to="/products" button>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Products"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/users" button>
                            <ListItemIcon>
                                <BarChartIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Users"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/stores" button>
                            <ListItemIcon>
                                <LayersIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Stores"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/sales" button>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Sales"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/transaction" button>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Transaction"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/supplier" button>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Supplier"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/customer" button>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Customer"/>
                        </ListItem>
                        <ListItem component={NavLink} to="/pos" button>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Pos"/>
                        </ListItem>

                    </div>
                </List>
            </div>
        </SwipeableDrawer>
    )
}


