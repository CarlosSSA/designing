import React, { useEffect, useState } from 'react';
import { Paper,Typography, IconButton, Grid, Avatar, Container } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Buscador from '../../ui/Buscador';
import { useIngredientStore } from '../../hooks/useIngredientStore';
import { useSelector } from 'react-redux';
import ErrorBusqueda from '../home/ErrorBusqueda';
import RecipeReviewCard from '../../ui/Tarjeta';







const BusquedaPage = () => {

  const [listaDeIngredientes, setListaDeIngredientes] = useState([]);
  const [recetasiniciales, setRecetasIniciales] = useState([])
  const [userLikedRecipes, setUserLikedRecipes] = useState([]);
  const [userFavRecipes, setUserFavRecipes] = useState([]);

  const { startAllIngredients } = useIngredientStore();

  const recipeFilter = useSelector(state => state.recipes.recipeFilter);
  const recipes = useSelector(state => state.recipes.recipes);
  const errorBusqueda = useSelector(state => state.recipes.error);
  const usuario = useSelector(state => state.auth.user);


  useEffect(() => {
    
    const fetchData = async () => {
      const ingredientesDb = await startAllIngredients();
      console.log("Lista de todos los ingredientes de la navbar!", ingredientesDb.ingredientes);

      // Extraer solo los nombres de los ingredientes
      const nombresDeIngredientes = ingredientesDb.ingredientes.map(ingrediente => ingrediente.nombre);
      // Actualizar el estado con los nombres de los ingredientes
      setListaDeIngredientes(nombresDeIngredientes);

      console.log("tuListaDeIngredientes", nombresDeIngredientes);
      console.log("tuListaDeIngredientes en Estado", listaDeIngredientes);
    };
    console.log("WTF");
    fetchData();
  }, []);

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

  useEffect(() => {
    console.log("Holi", listaDeIngredientes);
  }, [listaDeIngredientes]);

  const tuFuncionDeBusqueda = (valorDeBusqueda) => {
    console.log(valorDeBusqueda);
  };


  return (
    <>
    <Carousel>
        <div>
            <img src="https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345767/demo_image2.jpg" />
            <p className="legend">Legend 1</p>
        </div>
        <div>
            <img src="https://res.cloudinary.com/ifeomaimoh/image/upload/v1652366604/demo_image5.jpg" />
            <p className="legend">Legend 2</p>
        </div>
        <div>
            <img src="https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345874/demo_image1.jpg" />
            <p className="legend">Legend 3</p>
        </div>
    </Carousel>
   <h3>Tipo Netflix</h3>  

    <Paper>
    <div>
    <Buscador ingredientes={listaDeIngredientes} onSearch={tuFuncionDeBusqueda} />

    </div>
 
    
    <Typography variant="h6">Recetas Top de la Semana</Typography>
    
    <Grid container spacing={2}>
      <Grid item xs={4} >
        <Avatar variant="rounded" src="" />        
      </Grid>
      {/* Repetir para otros juegos */}
    </Grid>
    
    <Typography variant="h6">Recetas del reto X</Typography>
    
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Avatar variant="rounded" src="" />      
        
      </Grid>
      {/* Repetir para otras series */}
    </Grid>  
    
  </Paper> 
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
  </>   
);
}

export default BusquedaPage;