import * as React from 'react';
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
import HomeIcon from '@mui/icons-material/Home';
import { Avatar, Button } from '@mui/material';





export default function Footer() {



  // Verificar si la URL contiene "/recipe/"


  

  return (
    <Box className="footer-container">
      <CssBaseline />
      <Paper className="footer-paper" elevation={3}>
        
     
            <>
              {/* Botones para la página de recetas */}
              <BottomNavigationAction label="Home"  icon={<HomeIcon color="action"/>} centered />
              <BottomNavigationAction label="Guardar" icon={<SaveIcon />} centered />
              <BottomNavigationAction label="Likear" icon={<ThumbUpIcon />} centered />
              <BottomNavigationAction label="userCalendar" icon={<CalendarMonthIcon /> } centered />
              <BottomNavigationAction label="Explore" icon={ <Avatar />} centered /> 

            </>
          
      </Paper>
    </Box>
);
}