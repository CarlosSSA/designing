import React from 'react';
import { Button, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const CajaDatos = () => {
  const navigate = useNavigate();

  const nuevoTest = () => {
    navigate('/test/');
  }

    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '400px', width: '100%' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Tu Perfil
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography>Edad:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>25 años</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography>Altura:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>1.75 m</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography>Peso:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>70 kg</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography>Nivel de Actividad:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Moderado</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography>Objetivo:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Mantener peso</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography>Kcals:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>2500</Typography>
                </Grid>
            </Grid>
            <Button 
              variant="contained" 
              color="primary" 
              style={{ marginTop: '20px', width: '100%' }} 
              onClick={nuevoTest}>
              Hacer Test
            </Button>
        </Paper>
    );
}

export default CajaDatos;

