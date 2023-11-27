import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex' }}>
        <IconButton onClick={handleIconClick}>
          <CalendarMonthIcon />
        </IconButton>
        {open && (
          <div style={{ position: 'absolute', zIndex: 1 }}>
            <DatePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                handleDatePickerClose();
              }}
              onClose={handleDatePickerClose}
              open={open}
            />
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default BotonCalendario;