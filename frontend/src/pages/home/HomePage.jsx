import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RecipeReviewCard from '../../ui/Tarjeta.jsx'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// Hacer una llamada y filtrar las ultimas 20 recetas por fecha


const theme = createTheme();

export default function HomePage() { 
  


  const usuario = useSelector(state => state.auth.user);
 

  //Filtro de recetas del buscador
  const dispatch = useDispatch();




 

  // RecipeFilter cuando añades un ingrediente en el Buscador. Ya no hace falta aquí porque esto lo hacemos en /busquedaPage
  

  // Esto no se si funciona
  useEffect(() => {
    if (usuario === null) {
      dispatch(onLogout());
    }
  }, []) 
  
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />             
      <main>
        {/* Hero unit */}
     
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}

          <Grid container spacing={6}>
             <Grid xs={12} sm={6} md={6}>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
                    <RecipeReviewCard/>
              </Grid>
            
          </Grid>
        </Container>
      </main>

    </ThemeProvider>
  );
}