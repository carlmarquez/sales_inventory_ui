import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';

import {useState} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import style from '../mainUI/MainUiStyle'
import {Link} from "react-router-dom";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}

        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            // color: 'black',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.black,
            },
        },
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.black
        }
    },
}))(MenuItem);

const Navbar = ({setUser,handleDrawerOpen,name}) => {

    const classes = style()



    const logoutClick = () => {
        localStorage.clear()
        window.location.reload(true);
        setUser()
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            elevation={0}
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>
                    Sales and Inventory System
                </Typography>

                <Link to="/"  style={{textDecoration: 'none', color: 'white'}} >
                    <Typography variant="h6" noWrap style={{marginRight: '10px'}}>
                        {name===undefined?null:`${name.firstName} ${name.lastName}`}
                    </Typography>
                </Link>


                <div>
                    <ArrowDropDownIcon
                        className={classes.dropDownLight}
                        color={'primary'}
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        onClick={handleClick}
                    />

                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}

                    >

                        <StyledMenuItem onClick={logoutClick}>
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText primary="Logout"/>
                        </StyledMenuItem>

                    </StyledMenu>
                </div>
            </Toolbar>

        </AppBar>
    )
}



export default Navbar