import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShoppingBasket } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { ClientContext } from '../contexts/ClientProvider';
import { AuthContext } from '../contexts/AuthProvider';
import LogoutIcon from '../images/arrow.png'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const {productsCount} = React.useContext(ClientContext)
   const {authWithgoogle, user, logout} = React.useContext(AuthContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  return (
    <AppBar style={{ background: '#2E3B55' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/'>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
               <img
              width={60}
              src="https://freepngimg.com/thumb/apple/63691-logo-wallpaper-apple-desktop-free-hq-image.png"
              alt=""
            />
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to='/admin'>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Admin Panel</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Link to='/'>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img
              width={60}
              src="https://freepngimg.com/thumb/apple/63691-logo-wallpaper-apple-desktop-free-hq-image.png"
              alt=""
            />
          </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to='/admin'>
            <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Admin Panel
              </Button>
            </Link>
            <Link to='/add'>
            <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Add Product
              </Button>
            </Link>
          </Box>

            <MenuItem>
            <Link to='/cart'>
              <IconButton color='inherit'>
                <Badge badgeContent={productsCount} color="error">
                <ShoppingBasket/>
                </Badge>
              </IconButton>
            </Link>
            </MenuItem>
            {user ? (
              <>
              <MenuItem>
                {user.email}
              </MenuItem>
              <Button onClick={logout} >
                <img width='30' src={LogoutIcon} alt="logout" />
              </Button>
              </>
            ) : (
              <Button color='inherit' onClick = {authWithgoogle} >Войти</Button>
            )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
