import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';

//new
import { format } from 'date-fns';



const BotonCalendario = ({ recetaID, autorID }) => {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);


  

  const handleIconClick = () => {
    setOpen(true);
  };

  const handleDatePickerClose = () => {
    setOpen(false);
  };

  return (
    
        <IconButton onClick={handleIconClick}>
          <CalendarMonthIcon />
        </IconButton>
        
   
  );
};

export default BotonCalendario;