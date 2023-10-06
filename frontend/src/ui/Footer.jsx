import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExploreIcon from '@mui/icons-material/Explore';
import SaveIcon from '@mui/icons-material/Save';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Paper from '@mui/material/Paper';

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  // Verificar si la URL contiene "/recipe/"
  const isRecipePage = location.pathname.includes('/recipe/');

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {/* Si estamos en una página de receta, mostramos estos botones */}
          {isRecipePage ? (
            <>
              <BottomNavigationAction label="Guardar" icon={<SaveIcon />} />
              <BottomNavigationAction label="Likear" icon={<ThumbUpIcon />} />
              <BottomNavigationAction label="Calendario" icon={<CalendarTodayIcon />} />
            </>
          ) : (
            // Si no, mostramos estos otros botones
            <>
              <BottomNavigationAction icon={<AddIcon />} />
              <BottomNavigationAction icon={<CalendarTodayIcon />} />
              <BottomNavigationAction icon={<ExploreIcon />} />
            </>
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}