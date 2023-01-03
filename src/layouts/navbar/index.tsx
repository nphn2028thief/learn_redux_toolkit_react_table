import React from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle, LogoutOutlined, NotificationsNoneOutlined } from '@mui/icons-material';
import {
    Badge,
    Box,
    Button,
    Divider,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    // styled,
    Typography,
} from '@mui/material';

// import { ILinkProps } from './navbar_item';

// const FuncButton = styled(Button)<ILinkProps>(() => ({
//     minWidth: '115px',
//     borderRadius: '20px',
//     textTransform: 'capitalize',
// }));

// const Search = styled('div')(() => ({
//     // position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//     width: '360px',
//     height: '50%',
//     borderRadius: '20px',
//     border: '1px solid #ccc',
// }));

// const SearchIconWrapper = styled('div')(() => ({
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//     marginRight: '8px',
// }));

// const StyledInputBase = styled(InputBase)(() => ({
//     width: '100%',
//     fontSize: '14px',
//     padding: '4px',
//     paddingLeft: '8px',
//     paddingRight: '40px',
//     '& .MuiInputBase-input': {
//         padding: '4px',
//     },
// }));

// const IconButtonCustom = styled(IconButton)(() => ({
//     '@keyframes loading': {
//         from: {
//             transform: 'rotate(0)',
//         },
//         to: {
//             transform: 'rotate(360deg)',
//         },
//     },
//     animation: 'loading 0.8s linear infinite',
//     position: 'absolute',
//     right: '0',
//     height: '100%',
// }));

// const navbarItemData = [
//     {
//         id: 1,
//         title: 'Trang chủ',
//         path: '/',
//     },
//     {
//         id: 2,
//         title: 'Khoá học',
//         path: '/courses',
//     },
// ];

function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // const { isLoading, token } = useAppSelector((state) => state.authSlice);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuId = React.useRef('primary-search-account-menu');

    const isMenuOpen = Boolean(anchorEl);
    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        handleMobileMenuClose();
    };

    // const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId.current}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{ top: '44px', left: '8px' }}
        >
            <MenuItem sx={{ p: '0' }}>
                <Link
                    to="/admin/stored"
                    style={{ padding: '6px 16px', textDecoration: 'none', color: 'black' }}
                    onClick={handleMenuClose}
                >
                    Đến trang quản lý
                </Link>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ p: '0' }}>
                <Link
                    to="/login"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 16px',
                        textDecoration: 'none',
                        color: 'black',
                    }}
                    onClick={handleLogout}
                >
                    Đăng xuất
                    <LogoutOutlined fontSize="small" color="action" />
                </Link>
            </MenuItem>
        </Menu>
    );

    return (
        <Box>
            <Stack
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 16px',
                    marginTop: 1,
                    backgroundColor: 'white',
                    borderBottom: '1px solid #ccc',
                    borderRadius: '4px',
                }}
            >
                {/* {isLoading ? (
                            <CircularProgress size={20} />
                        ) : token ? (
                            <IconButton onClick={handleProfileMenuOpen}>
                                <AccountCircle fontSize="large" />
                            </IconButton>
                        ) : (
                            <Stack direction="row" gap={2}>
                                <FuncButton variant="outlined" LinkComponent={Link} to="/login">
                                    Đăng nhập
                                </FuncButton>
                                <FuncButton variant="contained" LinkComponent={Link} to="/register">
                                    Đăng ký
                                </FuncButton>
                            </Stack>
                        )} */}
                <Badge
                    badgeContent={7}
                    color="error"
                    sx={{
                        '.MuiBadge-badge': {
                            top: '4px',
                            right: '1px',
                        },
                    }}
                >
                    <NotificationsNoneOutlined />
                </Badge>

                <Button
                    sx={{
                        alignItems: ' center',
                        gap: 1,
                        '&:hover': { backgroundColor: 'transparent' },
                        textTransform: 'capitalize',
                    }}
                    onClick={handleProfileMenuOpen}
                >
                    <AccountCircle fontSize="large" />
                    <Typography variant="body1" sx={{ color: 'black' }}>
                        Nguyễn Nhân
                    </Typography>
                </Button>
            </Stack>
            {renderMenu}
        </Box>
    );
}

export default Navbar;
