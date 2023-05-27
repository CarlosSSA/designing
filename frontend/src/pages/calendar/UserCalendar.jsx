
import { useSelector } from "react-redux";
import DatePickerSection from "./DatePickerSection";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect, useState } from "react";

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';


// al pinchar en borrar no se borra el elemento
// cuando llegar al obtenerRecetas, me da lo mismo, tengo que darle 2 veces


const UserCalendar = () => {

  const {status, user, errorMessage, valoresTotales} = useSelector(state => state.auth)
  const {uid} = useSelector(state => state.auth.user); 
  const {startUsuarioIndividual} = useAuthStore();

  const [recetasCalendario, setRecetasCalendario] = useState(null)
 


  //recibimos las recetas favoritas del usuario y las guardamos en un estado. Que bien lo he hecho metiendolo en un callback :) 

  const obtenerRecetas = async () => {
    console.log("Parent Element: UID usuario", uid);
    const miUsuario = await startUsuarioIndividual({uid});
    console.log("Parent Element: usuario", miUsuario);
    setRecetasCalendario((prevState) => {
      console.log("Parent Element: sque tiene el usuario?", miUsuario.calendarRecipes);
      console.log("CL por el then", miUsuario.calendarRecipes);
      return miUsuario.calendarRecipes;
    });
    console.log("Parent Element: sque tiene el usuario?", miUsuario.calendarRecipes)     
      
    
  }; 

  //cuando se renderiza el componente nos traemos las calendar recipes que tenga ahora mismo y actualizamos el estado



  //cada vez que cambie el estado imprimimos un console.log

  useEffect(() => {
    obtenerRecetas();
  }, []);

  useEffect(() => {
    if (recetasCalendario !== null) {
      console.log("CL por el then", recetasCalendario);
    }
  }, [recetasCalendario]);

  const objetivoKcal = 2000;
  const porcentajeProgreso = (valoresTotales.kcal / objetivoKcal) * 100;
  const esKcalValida = !isNaN(valoresTotales.kcal) && isFinite(valoresTotales.kcal);

    return (

      <>
      <h1>Este es el calendario diario del usuario</h1>
      <Box>
        {esKcalValida ? (
          <>
            <Typography variant="body1">
              Llevas {valoresTotales.kcal} de {objetivoKcal} kcals objetivo ({porcentajeProgreso.toFixed(1)}%)
            </Typography>
            <LinearProgress variant="determinate" value={porcentajeProgreso} />
            {porcentajeProgreso > 100 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Te has pasado de kcals, te vas a poner PANSÓN
              </Alert>
            )}
          </>
        ) : (
          <Typography variant="body1">Añade alguna receta a tu Calendario, tu objetivo son {objetivoKcal} kcals diarias</Typography>
        )}
      </Box>
      <DatePickerSection recetasCalendario={recetasCalendario} obtenerRecetas={obtenerRecetas} />
    </>

    )
};



export default UserCalendar