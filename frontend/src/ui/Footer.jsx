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
import './Footer.css';

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  // Verificar si la URL contiene "/recipe/"
  const isRecipePage = location.pathname.includes('/recipe/');

  return (
    <Box className="footer-container">
      <CssBaseline />
      <Paper className="footer-paper" elevation={3}>
        <BottomNavigation
          className="footer-navigation"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {/* Si estamos en una página de receta, mostramos estos botones */}
          {isRecipePage ? (
            <>
              <BottomNavigationAction label="Guardar" icon={<SaveIcon />} centered />
              <BottomNavigationAction label="Likear" icon={<ThumbUpIcon />} centered />
              <BottomNavigationAction label="Calendario" icon={<CalendarTodayIcon />} centered />
            </>
          ) : (
            // Si no, mostramos estos otros botones
            <>
              <BottomNavigationAction label="AddReceta" icon={<AddIcon />} centered />
              <BottomNavigationAction label="userCalendar" icon={<CalendarTodayIcon />} centered />
              <BottomNavigationAction label="userCalendar" icon={<ExploreIcon />} centered />
            </>
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}