import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExploreIcon from '@mui/icons-material/Explore';
import SaveIcon from '@mui/icons-material/Save';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Paper from '@mui/material/Paper';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


export default function Footer() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  const navigate = useNavigate();

  // Verificar si la URL contiene "/recipe/"
  const isRecipePage = location.pathname.includes('/recipe/');
  const isCalendarPage = location.pathname.includes('/userCalendar');

  const handleClickCalendar = (event) => {
    navigate('/userCalendar');
  };

  const handleClickHome = (event) => {
    navigate('/');
  };

  

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
          {isRecipePage ? (
            <>
              {/* Botones para la página de recetas */}
              <BottomNavigationAction label="Home" icon={<HomeIcon color="action"/>} centered />
              <BottomNavigationAction label="Guardar" icon={<SaveIcon />} centered />
              <BottomNavigationAction label="Likear" icon={<ThumbUpIcon />} centered />
              <BottomNavigationAction label="userCalendar" icon={<CalendarMonthIcon /> } onClick={handleClickCalendar} centered />
            </>
          ) : isCalendarPage ? (
            <>
              <BottomNavigationAction label="Home" icon={<HomeIcon/>} onClick={handleClickHome} centered />
              <BottomNavigationAction label="AddReceta" icon={<AddIcon />} centered />
              <BottomNavigationAction label="userCalendar" icon={<CalendarMonthIcon color="primary"/> } onClick={handleClickCalendar} centered />
              <BottomNavigationAction label="Explore" icon={<ExploreIcon />} centered />
            </>
          ) : (
            <>
              {/* Botones por defecto */}
              <BottomNavigationAction label="Home" icon={<HomeIcon color="primary"/>} onClick={handleClickHome} centered />
              <BottomNavigationAction label="AddReceta" icon={<AddIcon />} centered />
              <BottomNavigationAction label="userCalendar" icon={<CalendarMonthIcon /> } onClick={handleClickCalendar} centered />
              <BottomNavigationAction label="Explore" icon={<ExploreIcon />} centered />
            </>
          )}
        </BottomNavigation>
      </Paper>
    </Box>
);
}