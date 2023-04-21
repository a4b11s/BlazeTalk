import React from 'react';

import {useNavigate} from "react-router-dom";

import {useAppDispatch} from "../../store/store";
import {removeUser} from "../../store/userSlice";

import {useUser} from '../../hooks/use-user';

import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography,} from '@mui/material';


const Header = () => {
    const {photoURL} = useUser();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogoutClick = () => {
        dispatch(removeUser())
        handleUserMenuClose()
    };
    const handleProfileClick = () => {
        navigate('/profile')
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        BlazeTalk
                    </Typography>
                    <Box sx={{paddingX: 4}}>
                        <IconButton
                            onClick={handleMenuOpen}
                            size="small"
                            sx={{ml: 2}}
                            aria-controls={anchorEl ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={anchorEl ? 'true' : undefined}
                        >
                            <Avatar src={photoURL}/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
            >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default Header;
