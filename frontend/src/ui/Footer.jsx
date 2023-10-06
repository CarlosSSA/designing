
import React from 'react';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExploreIcon from '@mui/icons-material/Explore';

export const Footer = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px', // puedes ajustar la altura según tus necesidades
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <BottomNavigationAction icon={<AddIcon />} />
      <BottomNavigationAction icon={<CalendarTodayIcon />} />
      <BottomNavigationAction icon={<ExploreIcon />} />
    </BottomNavigation>
  );
};