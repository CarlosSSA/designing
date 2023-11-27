import * as React from 'react';

import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';




export default function MenuBurger() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} aria-label="menu">
        <MenuIcon />
      </IconButton>
      
      <Drawer
        anchor='left'
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
       
      </Drawer>
    </div>
  );
}

