/* import React from 'react'
import { useParams } from 'react-router-dom';

export const UserPage = () => {
  const {userid} = useParams();
  return (
    <div>El id del usuario es {userid} </div>
  )
} */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from '../../ui/NavBar.jsx'
import RecipeReviewCard from '../../ui/Tarjeta.jsx'
import { useRecipeStore } from '../../hooks/useRecipeStore.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';





function Copyright() {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function UserPage() {   // No le gusta el await  
  
  const [recetas, setRecetas] = useState([]);
  const [selectedReceta, useSelectedReceta] = useState({});
 
  const {startUserRecipes, recipes} = useRecipeStore();
  const {userid} = useParams();  //Funciona el useParams! NICE

  useEffect(() => {
      startUserRecipes(userid).then(datos =>{
      console.log("datos inside .then", datos) //esto pilla  
      setRecetas(datos)
  })   
  }, [])
  
      
  // Hacer una llamada y filtrar las ultimas 20 recetas por fecha, SI LO METO EN UN USEFFECT SE ROMPE
  //me traigo el metodo startUserRecipes   


  // ME DA ERROR PORQUE EL DATA ES UNA PROMESA Y NO PUEDO METERLE UN ASYNC AWAIT DIRECTAMENTE EN EL COMPONENTE, HAY QUE USAR EL ESTADO DE ALGUNA FORMA
  

 
  console.log("recetas desde el uSeState", recetas);
  const theme = createTheme();  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PrimarySearchAppBar/>        
      <main>
        {/* Hero unit */}
     
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={6}>
            {recetas.map((card) => (
              //hay que meterle aqui el onclick con el Handleactive Event y tal
              <Grid item key={card} xs={12} sm={6} md={4}>
                <RecipeReviewCard nombre={card.nombre} autor = {card.autor} receta={card}/>  // NO RECIBE NADA AQUI
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Esto va?
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

