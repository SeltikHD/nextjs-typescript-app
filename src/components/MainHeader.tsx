import { AppBar, Button, Tooltip, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu, Avatar, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Grid, styled, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReactNode, useState } from 'react';
import SignUpDialog from './SignUpDialog';
import { signOut, useSession } from 'next-auth/react';
import { Else, If, Then } from 'react-if';
import useDarkMode from 'use-dark-mode';

const DarkModeSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

type StringAvatarProps = {
    name?: string | null;
    width?: string;
    height?: string;
}

function stringAvatar({ name = '= D', width, height }: StringAvatarProps) {
    const rawInitials = name ? name.split(' ') : '= D'.split(' ');
    return {
        sx: {
            width,
            height,
            bgcolor: stringToColor(name ? name : 'default'),
        },
        children: rawInitials.length === 1 ? rawInitials[0][0] : `${rawInitials[0][0]}${rawInitials[1][0]}`,
    };
}

type UserAvatarProps = {
    name?: string | null;
    width?: string;
    height?: string;
    icon?: string | null;
}

function userAvatar({ name = '= D', width, height, icon }: UserAvatarProps) {
    const stringAvatarResult = stringAvatar({ name, width, height });
    return icon ? {
        alt: name ? name : 'User Icon',
        src: icon
    } : {
        ...stringAvatarResult
    };
}

type HeadDrawerProps = {
    children: ReactNode;
    open: boolean;
    handleClose: () => void | null;
    width: string;
    anchor?: "left" | "bottom" | "right" | "top";
}

function TemporaryDrawer({ children, open, handleClose, width, anchor = "left" }: HeadDrawerProps) {
    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={handleClose}
            ModalProps={{
                keepMounted: true
            }}
            sx={{
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: 250, md: width } }
            }}
            anchor={anchor}
        >
            {children}
        </Drawer >
    );
}

export default function MainHeader() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationsNumber/*, setNotificationsNumber*/] = useState<number>(0);
    const [openSignIn, setOpenSignIn] = useState<boolean>(false);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const [authorized, setAuthorized] = useState<boolean>(false);
    const { data: session, status } = useSession();
    const authenticated = status === 'authenticated';
    const darkMode = useDarkMode();

    if (authenticated) {
        setAuthorized(true);
    }
    const drawerWidth = '25%';

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleOpenSignIn = () => {
        setOpenSignIn(true);
    };

    const handleCloseSignIn = () => {
        setOpenSignIn(false);
    };

    const handleOpenDrawer = () => {
        setOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const handleOpenSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        if (!authorized) {
            handleOpenSignIn();
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Minha conta</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); signOut(); setAuthorized(false); }}>Sair</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <If condition={authorized}>
                <Then>
                    <MenuItem>
                        <IconButton
                            size="large"
                            aria-label={`show ${notificationsNumber} new notifications`}
                            color="inherit"
                        >
                            <Badge badgeContent={notificationsNumber} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <p>Notificações</p>
                    </MenuItem>
                </Then>
            </If>
            <MenuItem onClick={() => { handleMobileMenuClose(); handleOpenSettings(); }}>
                <IconButton
                    size="large"
                    aria-label="settings of the page"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                >
                    <SettingsIcon />
                </IconButton>
                <p>Configurações</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <If condition={authorized}>
                        <Then>
                            <Avatar {...userAvatar({ name: session?.user?.name, icon: session?.user?.image, width: '2', height: '2' })} />
                        </Then>
                        <Else>
                            <AccountCircle />
                        </Else>
                    </If>
                </IconButton>
                <p>Perfil</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box component="header" sx={{ flexGrow: 1 }}>
            <AppBar position="static" /*enableColorOnDark*/ sx={{ position: 'fixed', zIndex: 10 }}>
                <Toolbar sx={{ backgroundColor: '#000' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleOpenDrawer}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        Title
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <If condition={authorized}>
                            <Then>
                                <Tooltip title="Notificações" arrow>
                                    <IconButton
                                        size="large"
                                        aria-label={`show ${notificationsNumber} new notifications`}
                                        color="inherit"
                                        sx={{ borderRadius: 3, border: '1px solid', marginRight: 2 }}
                                    >
                                        <Badge badgeContent={notificationsNumber} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Conta" arrow>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                        sx={{ marginLeft: 2, padding: 0, order: '1' }}
                                    >
                                        <Avatar {...userAvatar({ name: session?.user?.name, icon: session?.user?.image })} />
                                    </IconButton>
                                </Tooltip>
                            </Then>
                            <Else>
                                <Tooltip title="Entrar" arrow>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                        sx={{ borderRadius: 3, border: '1px solid', marginRight: 2 }}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Tooltip>
                            </Else>
                        </If>
                        <Tooltip title="Configurações" arrow>
                            <IconButton
                                size="large"
                                aria-label="settings of the page"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleOpenSettings}
                                color="inherit"
                                sx={{ borderRadius: 3, border: '1px solid' }}
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                            sx={{ borderRadius: 3, border: '1px solid' }}
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                    <TemporaryDrawer open={openSettings} handleClose={handleCloseSettings} width={drawerWidth} anchor="right">
                        <Toolbar>
                            <Typography variant="h5" component="h1" noWrap>Configurações</Typography>
                        </Toolbar>
                        <Divider />
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item sx={{ marginLeft: 1, marginTop: 1, marginBottom: 2 }}>
                                <Typography variant="h6" component="h1" noWrap>Tema</Typography>
                            </Grid>
                            <Grid item>
                                <DarkModeSwitch checked={darkMode.value} onChange={darkMode.toggle} />
                            </Grid>
                        </Grid>
                    </TemporaryDrawer>
                    <TemporaryDrawer open={openDrawer} handleClose={handleCloseDrawer} width={drawerWidth}>
                        <Toolbar>
                            <Grid container>
                                <If condition={authorized}>
                                    <Then>
                                        <Grid item xs={12} sx={{ display: 'flex', overflow: 'hidden', cursor: 'pointer' }} onClick={handleProfileMenuOpen}>
                                            <Avatar {...userAvatar({ name: session?.user?.name, icon: session?.user?.image })} />
                                            <Typography sx={{ marginLeft: 1 }} variant="h6" component="h1" noWrap>{session?.user?.name}</Typography>
                                        </Grid>
                                    </Then>
                                    <Else>
                                        <Grid item xs={12} sx={{ display: 'flex', cursor: 'pointer' }}>
                                            <Button sx={{ width: '100%' }} variant='outlined' startIcon={<AccountCircle />} onClick={handleProfileMenuOpen}>
                                                Entrar
                                            </Button>
                                        </Grid>
                                    </Else>
                                </If>
                            </Grid>
                        </Toolbar>
                        <Divider />
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <DeleteIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </TemporaryDrawer>
                    <SignUpDialog open={openSignIn} onClose={handleCloseSignIn} />
                </Toolbar>
            </AppBar >
            {renderMobileMenu}
            {renderMenu}
        </Box >
    );
}