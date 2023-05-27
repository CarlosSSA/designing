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



const BotonCalendario = ({recetaID, autorID})=> {

    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const {startAddRecetaCalendar, user} = useAuthStore();

    // cada vez que cambia el valor de la fecha ejecuto el Hook para que la almacene en el perfil del usuario
    useEffect(() => {
      if (value) {
        console.log("el value desde el use Effect", value);
        console.log("el user desde el use Effect", user);
        console.log("el body que mando al starAddCalendar", {fecha:value.$d.toDateString(), uid:autorID, recipeid:recetaID});
        window.location.reload();
       

        try {
          
          //new
          const formattedDate = format(value.$d, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

          startAddRecetaCalendar({fecha:formattedDate, uid:autorID, recipeid:recetaID})
          console.log("fecha guardada correctamente en el usuario" + user);
          //alert(`Receta agendada correctamente al día ${formattedDate}`)
          Swal.fire(
            'Receta agendada correctamente',
            `You clicked the button! En la fecha ${formattedDate}`,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              console.log("hola");
            }
          })
          
        } catch (error) {
          setAlerta({ type: 'error', message: 'Error al guardar la fecha.' });
          console.log("Algo se ha roto actualizando las recetas del calendario");

        }       
       
        //aqui faltaría añadir alguna alerta de OK
      }
    }, [value]);
  
    const handleIconClick = () => {
      setOpen(true);
    };
  
   
    const handleDatePickerClose = () => {
      setOpen(false);
      //aqui el value es la fecha
      if(value){  
      console.log("el value",value);
      console.log(" el user", user);
      
      }
      
      //guardar en base de datos estea receta + fecha
      /* 
            calendarRecipes:[
                {
                    receta:{ type: Schema.Types.ObjectId, ref: 'Receta' },
                    fecha:{type: Date, required: true}
                }
            ],  
      */
      // llamar al Hook de guardado
            

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
  }

  export default BotonCalendario