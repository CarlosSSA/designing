import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import { useAuthStore } from '../hooks/useAuthStore';
import Swal from 'sweetalert2'

//new
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';



const BotonCalendario = ({ recetaID, autorID }) => {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  const { startAddRecetaCalendar, user } = useAuthStore();

  useEffect(() => {
    if (value) {
      const date = value.$d;
      const formattedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())).toISOString();
      const friendlyDate = format(new Date(formattedDate), 'dd/MM/yyyy');


      try {
        startAddRecetaCalendar({
          fecha: formattedDate,
          uid: autorID,
          recipeid: recetaID
        });
        Swal.fire(
          `Receta Guardada correctamente`,
          `A fecha: ${friendlyDate}`,
          'success'
        );
      } catch (error) {
        console.error("Algo se ha roto actualizando las recetas del calendario", error);
      }
    }
  }, [value]);

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