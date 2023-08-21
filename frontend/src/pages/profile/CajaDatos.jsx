import React from 'react';
import { Button, Typography, Paper, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { useAuthStore } from "../../hooks/useAuthStore";

import CakeIcon from '@mui/icons-material/Cake';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FlagIcon from '@mui/icons-material/Flag';
import FastfoodIcon from '@mui/icons-material/Fastfood';

import { Snackbar, Alert } from '@mui/material';




const CajaDatos = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { startUsuarioIndividual } = useAuthStore();
  
    // Si necesitas almacenar datos del usuario en el estado del componente
    // Async con try/catch y lo guardas en un estado
    const [userData, setUserData] = useState(null);
    const [kcalEditValue, setKcalEditValue] = useState();
    const [isEditingKcals, setIsEditingKcals] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    
    const { startUpdateHarris } = useAuthStore(); 


    // 3. Manejador para cuando el valor del TextField cambie
    const handleKcalChange = (event) => {
        setKcalEditValue(event.target.value);
    };

  
    // useEffect y dentro te haces la propia funcion y la llamas
    useEffect(() => {
      // Definimos una función asíncrona dentro del useEffect
      const obtenerUsuario = async () => {
        try {
          const miUsuario = await startUsuarioIndividual({ uid: user.uid });
          if (miUsuario) {
            // Aquí puedes actualizar cualquier estado o realizar operaciones basadas en los datos que obtuviste.
            setUserData(miUsuario);
            setKcalEditValue(miUsuario.kcalObjetivo)
            console.log("Datos del usuario:", miUsuario);
          }
        } catch (error) {
          console.error("Hubo un error al obtener los datos del usuario:", error);
        }
      };
  
      // Llamamos a la función asíncrona
      obtenerUsuario();
    }, []); // Al montarse el componente
  
    const nuevoTest = () => {
      navigate('/test/');
    }

    const handleSaveChanges = async () => {
        try {
            await startUpdateHarris({ uid: user.uid, datosHarris: { kcalObjetivo: kcalEditValue } });
            console.log("actualizadas las kcals a", kcalEditValue);
            
            // Abre el Snackbar al completar la actualización
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error al actualizar las kcals:", error);
        }
    }

    // Ahora al renderizar si no existe muestro solo el boton


    return (
        <>
        {!userData ? (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>No has hecho aún el test</p>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{ width: '100%' }} 
                  onClick={nuevoTest}>
                  {userData ? "Repetir el test" : "Hacer Test"}
                </Button>
            </div>
        ) : (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '400px', width: '100%' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Tu Perfil
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <CakeIcon /> Edad
                </Grid>
                <Grid item xs={6}>
                    <Typography>{userData.edad} años</Typography>
                </Grid>
    
                <Grid item xs={6}>
                    <HeightIcon /> Altura
                </Grid>
                <Grid item xs={6}>
                    <Typography>{userData.altura} m</Typography>
                </Grid>
    
                <Grid item xs={6}>
                    <FitnessCenterIcon /> Peso
                </Grid>
                <Grid item xs={6}>
                    <Typography>{userData.pesoActual} kg</Typography>
                </Grid>
    
                <Grid item xs={6}>
                    <DirectionsRunIcon /> Nivel Actividad
                </Grid>
                <Grid item xs={6}>
                    <Typography>{userData.nivelActividad}</Typography>
                </Grid>
    
                <Grid item xs={6}>
                    <FlagIcon /> Objetivo
                </Grid>
                <Grid item xs={6}>
                    <Typography>{userData.objetivo}</Typography>
                </Grid>
    
                <Grid item xs={6}>
                    <FastfoodIcon /> Kcals
                </Grid>
                <Grid item xs={6}>
                    {!isEditingKcals ? (
                        <>
                        <Typography>{kcalEditValue} kcals</Typography>
                        <Button size="small" onClick={() => setIsEditingKcals(true)}>Editar</Button>
                        </>
                    ) : (
                        <TextField
                        value={kcalEditValue}
                        onChange={handleKcalChange}
                        type="number"
                        InputProps={{ endAdornment: <Typography>kcals</Typography> }}
                        />
                    )}
                    {isEditingKcals && (
                        <Button size="small" onClick={handleSaveChanges}>Guardar</Button>
                    )}
                </Grid>
            </Grid>
            <Button 
              variant="contained" 
              color="primary" 
              style={{ marginTop: '20px', width: '100%' }} 
              onClick={nuevoTest}>
              {userData ? "Repetir el test" : "Hacer Test"}
            </Button>
        </Paper>
        )}

        <Snackbar 
            open={openSnackbar} 
            autoHideDuration={6000} 
            onClose={() => setOpenSnackbar(false)} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            Objetivo de kcals Actualizado
        </Alert>
</Snackbar>
    </>
    );
    
}

export default CajaDatos;

