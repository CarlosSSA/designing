import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';




export default function MenuBurger() {
  const [state, setState] = React.useState({      
    left: false,      
  });

  const {startLogout} = useAuthStore();
  
  

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const navigate = useNavigate();

    const handleListItemClick = (text) => {
        console.log(`Clicked on ${text}`);
        switch (text) {
            case 'Mis Datos':
                navigate('/misdatos');
                break;
            case 'Mi Diario':
                navigate('/midiario');
                break;
            case 'Cesta Compra':
                navigate('/cesta');
                break;
            case 'Explorar Categorías':
                navigate('/categorias');
                break;
            case 'Premium':
                navigate('/premium');
                break;
            case 'Logout':
                console.log('pinchado el  logout');
                startLogout();
                break;
            default:
                navigate('/');
                break;
        }

        // hacer los redirects en funcion de donde vaya clickando
    }

    
 

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Mis Datos', 'Mi Diario', 'Cesta Compra', 'Explorar Categorías'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Premium', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <MenuIcon onClick={toggleDrawer('left', true)}>Open Left</MenuIcon>
      <Drawer
        anchor='left'
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}

