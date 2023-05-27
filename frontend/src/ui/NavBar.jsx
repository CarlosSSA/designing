import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// este es el ---
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import MenuBurger from './MenuBurger';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Avatar, Button } from '@mui/material';
import { useSelector } from 'react-redux';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Componente

export default function PrimarySearchAppBar() {

  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);  

  // si los estados "anchorEl" tienen un valor esto lo convierte en un Boolean y devuelve true
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // No se que menu abre esto
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("Has abierto el handleProfileMenuOpen ");
  };

  // Cierras el ... pero nunca lo estoy abriendo
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    console.log("Has cerrado el handleMobileMenuClose ");
  };

  // No se que menu cierra esto
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    console.log("Has abierto el handleMenuClose ");
  };

  // Este es el menú ...
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    console.log("Has abierto el handleMobileMenuOpen ");
  };

  // Este es el click en el logo
  const handleClickLogo = (event) => {
    console.log("Has pinchado en el logo");
    navigate('/')
  };
  const handleClickCalendar = (event) => {
    console.log("Has pinchado en el calendario");
    navigate('/userCalendar')
  };

  // esto es simplemente para añadir el id? wtf
  const menuId = 'primary-search-account-menu';

// esto que es, un menu
  
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
  
    </Menu>
  );
// esto es simplemente para añadir el id? wtf
  const mobileMenuId = 'primary-search-account-menu-mobile';

// esto que es, un menu MOBILE
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
      
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        {/* Este es el icono ---*/}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick = {(e) => console.log(e.currentTarget)}
          >
            <MenuBurger />
            
          </IconButton>
          
          {/* Este es el texto APP que sale en PC*/}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick = {handleClickLogo}
          >
            Mi APP
           
          </Typography>        
          {/* Esta es la barra de busqueda */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <CalendarMonthIcon 
          onClick={handleClickCalendar}
          />
          
          {/* Parte final de la barra que se ve en Desktop */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <div>
            {auth.status === 'autenticado' ? (
              <Avatar onClick={() => {alert("Hola chato")}}/>                 
               ) : (
            < Button />
            )}
        </div>               
          </Box>
          {/* Parte final de la barra que se ve en Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <div>
                {auth.status === 'autenticado' ? (
                  <Avatar onClick={() => {alert("Hola chato")}}/>                 
                ) : (
                  < Button />
                )}
              </div>
              
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}