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
import RecipeReviewCard from '../../ui/Tarjeta.jsx'
import { useRecipeStore } from '../../hooks/useRecipeStore.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSetRecipeFilter, onClearRecipeFilter, onLoadUserRecipes } from '../../store/recipes/recipesSlice.js';
import ErrorBusqueda from './ErrorBusqueda.jsx';
import { useAuthStore } from '../../hooks/useAuthStore.js';



// Hacer una llamada y filtrar las ultimas 20 recetas por fecha


const theme = createTheme();

export default function HomePage() { 
  const {startAllRecipes} = useRecipeStore();
  const [recetasiniciales, setRecetasIniciales] = useState([])  
  const [userFavRecipes, setUserFavRecipes] = useState([]);
  const [miUsuario, setMiUsuario] = useState();

  const usuario = useSelector(state => state.auth.user);
  const [userLikedRecipes, setUserLikedRecipes] = useState(usuario.likedRecipes);

  //Filtro de recetas del buscador
  const dispatch = useDispatch();
  const searchFilter = useSelector(state => state.recipes.searchFilter);
  const recipeFilter = useSelector(state => state.recipes.recipeFilter);
  const recipes = useSelector(state => state.recipes.recipes);
  const errorBusqueda = useSelector(state => state.recipes.error);
  const {startUsuarioIndividual} = useAuthStore();


 


  useEffect(() => {
      const obtenerRecetasXNombre = async () => {
        if (recipeFilter) {
          console.log("El recipe filter trae cositas", recipeFilter)
          setRecetasIniciales(recipeFilter)
        // dispatch(onSetRecipeFilter(searchFilter))      //esto esta mal  
        } else {
          console.log("El recipe filter es null o vacio")
          const allRecipes = await startAllRecipes();      
          setRecetasIniciales(allRecipes)
        }
        
      };
      obtenerRecetasXNombre();
  }, [recipeFilter]); 

  
  
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />             
      <main>
        {/* Hero unit */}
     
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={6}>

            {/* Verificar si hay un mensaje de error */}
            {errorBusqueda 
              ? (
                <ErrorBusqueda message={errorBusqueda} />
              )
              : recetasiniciales.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={6}>
                    <RecipeReviewCard usuario={usuario} userLikedRecipes={userLikedRecipes} userFavRecipes={userFavRecipes} setUserFavRecipes={setUserFavRecipes} setUserLikedRecipes={setUserLikedRecipes} nombre={card.nombre} autor={card.autor.nombre} receta={card} descripcion={card.descripcion} likes={card.likes} comments={card.comments} />
                  </Grid>
                ))
            }
          </Grid>
        </Container>
      </main>

    </ThemeProvider>
  );
}