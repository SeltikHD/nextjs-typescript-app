import type { SwitchProps } from '@mui/material/Switch';
import type { ReactNode } from 'react';
import type { Session } from 'next-auth';
import { AppBar, Box, Toolbar, Typography, Avatar, Drawer, Grid, styled, Switch, IconButton } from '@mui/material';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useLocalStorage } from 'react-use';
import { useRouter } from 'next/router';
import { userAvatar } from '@utils/avatar';
import SignUpDialog from '@components/SignUpDialog';
import useDarkMode from 'use-dark-mode';
import dynamic from 'next/dynamic';

import SuperLink from '@components/SuperLink';

const Button = dynamic(() => import('@mui/material/Button'));
const Tooltip = dynamic(() => import('@mui/material/Tooltip'));
const Menu = dynamic(() => import('@mui/material/Menu'));
const MenuItem = dynamic(() => import('@mui/material/MenuItem'));
const Divider = dynamic(() => import('@mui/material/Divider'));

const List = dynamic(() => import('@mui/material/List'));
const ListItem = dynamic(() => import('@mui/material/ListItem'));
const ListItemButton = dynamic(() => import('@mui/material/ListItemButton'));
const ListItemIcon = dynamic(() => import('@mui/material/ListItemIcon'));
const ListItemText = dynamic(() => import('@mui/material/ListItemText'));

const MenuIcon = dynamic(() => import('@mui/icons-material/Menu'));
const AccountCircle = dynamic(() => import('@mui/icons-material/AccountCircle'));
const MoreIcon = dynamic(() => import('@mui/icons-material/MoreVert'));
const SettingsIcon = dynamic(() => import('@mui/icons-material/Settings'));
const HomeIcon = dynamic(() => import('@mui/icons-material/Home'));

export const DarkModeSwitch = styled(Switch)(({ theme }) => ({
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

export const CheckedSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#0A66B2' : '#39CCCC',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#0A66B2',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

type HeadDrawerProps = {
    children: ReactNode;
    open: boolean;
    handleClose: () => void | null;
    width: string;
    anchor?: 'left' | 'bottom' | 'right' | 'top';
};

export function TemporaryDrawer({ children, open, handleClose, width, anchor = 'left' }: HeadDrawerProps) {
    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={handleClose}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: 250, md: width } },
            }}
            anchor={anchor}
        >
            {children}
        </Drawer>
    );
}

type Props = {
    customDrawer?: ReactNode;
    session: Session | null;
    loadingSession: boolean;
    title: string;
};

export default function MainHeader({ customDrawer, session, loadingSession, title }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [openSignIn, setOpenSignIn] = useState<boolean>(false);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const authorized = session != undefined && session != null;

    const drawerWidth = '25%';

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        if (!authorized) {
            handleOpenSignIn();
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <SuperLink href="/account" color="inherit">
                    My account
                </SuperLink>
            </MenuItem>
            <MenuItem
                onClick={async () => {
                    handleMenuClose();
                    await signOut();
                }}
            >
                Exit
            </MenuItem>
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
            <MenuItem
                onClick={() => {
                    handleMobileMenuClose();
                    handleOpenSettings();
                }}
            >
                <IconButton
                    size="large"
                    aria-label="settings of the page"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                >
                    <SettingsIcon />
                </IconButton>
                <p>Settings</p>
            </MenuItem>
            {!loadingSession && (
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        {authorized ? (
                            <Avatar
                                {...userAvatar({
                                    name: session?.user?.name,
                                    icon: session?.user?.image,
                                    width: '2',
                                    height: '2',
                                })}
                            />
                        ) : (
                            <AccountCircle />
                        )}
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            )}
        </Menu>
    );

    return (
        <>
            <AppBar position="absolute" /*enableColorOnDark*/ sx={{ position: 'fixed', zIndex: 3 }}>
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
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {!loadingSession ? (
                            authorized ? (
                                <Tooltip title="Account" arrow>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                        sx={{ marginLeft: 2, padding: 0, order: '1' }}
                                    >
                                        <Avatar
                                            {...userAvatar({ name: session?.user?.name, icon: session?.user?.image })}
                                        />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Sign In" arrow>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                        sx={{ borderRadius: 3, marginRight: 2 }}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Tooltip>
                            )
                        ) : null}
                        <Tooltip title="Settings" arrow>
                            <IconButton
                                size="large"
                                aria-label="settings of the page"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleOpenSettings}
                                color="inherit"
                                sx={{ borderRadius: 3 }}
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
                            sx={{ borderRadius: 3 }}
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                    <SettingsDrawer open={openSettings} handleClose={handleCloseSettings} width={drawerWidth} />
                    {customDrawer ? (
                        customDrawer
                    ) : (
                        <OptionsDrawer
                            open={openDrawer}
                            handleClose={handleCloseDrawer}
                            width={drawerWidth}
                            handleProfileMenuOpen={handleProfileMenuOpen}
                            session={session}
                        />
                    )}
                    <SignUpDialog open={openSignIn} onClose={handleCloseSignIn} />
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </>
    );
}

export interface OptionsDrawerProps {
    open: boolean;
    handleClose: () => void;
    handleProfileMenuOpen?: (event: React.MouseEvent<HTMLElement>) => void;
    width: string | number;
    session: Session | null;
}

export const OptionsDrawer = ({ open, handleClose, handleProfileMenuOpen, width, session }: OptionsDrawerProps) => {
    const router = useRouter();
    const authorized = session?.user !== undefined;

    return (
        <TemporaryDrawer open={open} handleClose={handleClose} width={width.toString()}>
            <>
                <Toolbar>
                    <Grid container>
                        {authorized ? (
                            <Grid
                                item
                                xs={12}
                                sx={{ display: 'flex', overflow: 'hidden', cursor: 'pointer' }}
                                onClick={handleProfileMenuOpen}
                                alignItems="center"
                            >
                                <Avatar
                                    {...userAvatar({
                                        name: session?.user?.name,
                                        icon: session?.user?.image,
                                        width: 48,
                                        height: 48,
                                    })}
                                />
                                <Typography sx={{ marginLeft: 1 }} variant="h6" component="h2" noWrap>
                                    {session?.user?.name}
                                </Typography>
                            </Grid>
                        ) : (
                            <Grid item xs={12} sx={{ display: 'flex', cursor: 'pointer' }}>
                                <Button
                                    sx={{ width: '100%' }}
                                    variant="outlined"
                                    startIcon={<AccountCircle />}
                                    onClick={handleProfileMenuOpen}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Toolbar>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => router.push('/')}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" secondary="Initial Page" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </>
        </TemporaryDrawer>
    );
};

export interface SettingsDrawerProps {
    open: boolean;
    handleClose: () => void;
    width: string | number;
}

export const SettingsDrawer = ({ open, handleClose, width }: SettingsDrawerProps) => {
    const darkMode = useDarkMode();
    const [animations, updateAnimations] = useLocalStorage<boolean>('animations');

    const handleAnimations = () => updateAnimations(!animations);

    return (
        <TemporaryDrawer open={open} handleClose={handleClose} width={width.toString()} anchor="right">
            <Toolbar>
                <Typography variant="h5" component="h1" noWrap flexGrow={1} textAlign="center">
                    Settings
                </Typography>
            </Toolbar>
            <Divider />
            <Grid container direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
                <Grid item sx={{ marginTop: 3 }}>
                    <Typography variant="h6" component="h1" noWrap>
                        Theme
                    </Typography>
                </Grid>
                <Grid item>
                    <DarkModeSwitch checked={darkMode.value} onChange={darkMode.toggle} />
                </Grid>
                <Grid item sx={{ marginTop: 3 }}>
                    <Typography variant="h6" component="h1" noWrap>
                        Animations
                    </Typography>
                </Grid>
                <Grid item>
                    <CheckedSwitch checked={animations ?? true} onChange={() => handleAnimations()} />
                </Grid>
            </Grid>
        </TemporaryDrawer>
    );
};
