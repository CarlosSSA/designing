import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import MenuBurger from './MenuBurger';
import { Avatar, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import Buscador from './Buscador';
import { useEffect } from 'react';
import { useIngredientStore } from '../hooks/useIngredientStore';
import { useState } from 'react';



export default function PrimarySearchAppBar() {

  const [listaDeIngredientes, setListaDeIngredientes] = useState([]);

  const tuFuncionDeBusqueda = (valorDeBusqueda) => {
    console.log(valorDeBusqueda);
  }

  const { startAllIngredients } = useIngredientStore();

  useEffect(() => {
    const fetchData = async () => {
      const ingredientesDb = await startAllIngredients();
      console.log("Lista de todos los ingredientes de la navbar!", ingredientesDb.ingredientes);

      // Extraer solo los nombres de los ingredientes
      const nombresDeIngredientes = ingredientesDb.ingredientes.map(ingrediente => ingrediente.nombre);
      // Actualizar el estado con los nombres de los ingredientes
      setListaDeIngredientes(nombresDeIngredientes);

      console.log("tuListaDeIngredientes", nombresDeIngredientes);
      console.log("tuListaDeIngredientes en Estado", listaDeIngredientes);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Holi", listaDeIngredientes)
  }, [listaDeIngredientes]);


  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClickLogo = (event) => {
    navigate('/');
  };


  const menuId = 'primary-search-account-menu';

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
    ></Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

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
    ></Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={(e) => console.log(e.currentTarget)}
          >
            <MenuBurger />
          </IconButton>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={handleClickLogo}
          >
            Mi APP
          </Typography>        
          
          {/* Componente Buscador */}
          <Buscador ingredientes={listaDeIngredientes} onSearch={tuFuncionDeBusqueda} />
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div>
              {auth.status === 'autenticado' ? (
                <Avatar onClick={() => { alert("Hola chato") }} />
              ) : (
                <Button />
              )}
            </div>
          </Box>
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
                  <Avatar onClick={() => { alert("Hola chato") }} />
                ) : (
                  <Button />
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
