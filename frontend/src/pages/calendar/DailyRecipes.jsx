import React from 'react';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import RecipeReviewCard from '../../ui/Tarjeta';
import { useState } from 'react';
import RecipeCalendarCard from './RecipeCalendarCard';
import {useAuthStore} from '../../hooks/useAuthStore';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'

// Este componente se encarga de mostrar la lista de recetas para una fecha determinada
// en recetas nos llegan las calendarRecipes del usuario

const DailyRecipes = ({ fecha, recetas, obtenerRecetas }) => {

  const [selectedFecha, setSelectedFecha] = useState(fecha)
  const [filteredRecetas, setFilteredRecetas] = useState([]);
  const [totalValues, setTotalValues] = useState({});
  const [newCalendarRecipes, setNewCalendarRecipes] = useState(recetas);

  let totalKcal = 0;
  let totales = {};

const {startUpdateRecetaCalendar, startActualizacionTotales} = useAuthStore();
const user = useSelector(state => state.auth.user); 

  
// veo los parámteros que nos llegan
  useEffect(() => {    
    console.log("Parametros que nos llegan a Daily Recipes hijo: fecha: ", fecha.toDateString()) //Thu Apr 06 2023       
    console.log("Parametros que nos llegan a Daily Recipes hijo: Itero sobre: ", recetas) //Array(2) [ {…}, {…} ]
    console.log("Parametros que nos llegan a Daily Recipes hijo: estado con la fecha que me llega: ", selectedFecha) //Thu Apr 06 2023
    
  }, [])


  // cada vez que cambia la fecha actualizo el estado y luego cuando cambia el estado hago cosas
  useEffect(() => {
    setSelectedFecha(fecha);
  }, [fecha]);

  
   // Sumo todos los valores de las recetas y lo guardo en el estado totalValues, cada vez que cambie la fecha o el array de recetas de entrada
  useEffect(() => {
    const filtered = recetas.filter(card => new Date(card.fecha).toDateString() === fecha.toDateString()) // recetas es un array de objetos
    setFilteredRecetas(filtered);    
    console.log(`Array que filtro : ${JSON.stringify(filtered)}`)
    filtered.forEach(receta => {
      // recorremos las propiedades totales de la receta
      Object.keys(receta.receta.totales).forEach(propiedad => {
        // si la propiedad no existe en el objeto totales, la inicializamos en 0
        if (!totales[propiedad]) {
          totales[propiedad] = 0;
        }
        // sumamos el valor de la propiedad en la receta al valor existente en el objeto totales
        totales[propiedad] += receta.receta.totales[propiedad];
      });
    });
    
    console.log("totales", totales);

    setTotalValues(totales);
    startActualizacionTotales( {totales} )
    console.log("total values", totalValues)
  }, [selectedFecha, recetas]);

  
  

  const deleteRecipe = (id) => { 
    console.log("borrando receta con el id" + id) 
    console.log("recetas", recetas)
    console.log("mis recetas filtradas: ", filteredRecetas)
    // setNewCalendarRecipes(recetas)
    // borro el elemento del array original
    
    //copio el array de calendarRecipes
    let nuevoArray = [...newCalendarRecipes];
    
    nuevoArray = nuevoArray.filter(item => item._id !== id);
    // esto solo para el useEffect
    setNewCalendarRecipes(nuevoArray)


    //llamo a la funcion pero aun no se han actualizado los putos estados
    
    console.log("new array filtrado desde estado", newCalendarRecipes)
    console.log("new array filtrado desde variable", nuevoArray)
    console.log("el filtered cambia?", filteredRecetas)
    //actualizar las CalendarRecipes del usuario,  EL USUARIOO
    startUpdateRecetaCalendar({uid:user.uid, recetas:nuevoArray})

    Swal.fire({
      title: 'Receta borrada',
      text: 'La receta se ha borrado correctamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  useEffect(() => {
    if(newCalendarRecipes !== recetas){
      obtenerRecetas()
    }  

  }, [newCalendarRecipes])
  




  return (
    <div>
      <h3>Recetas para el día</h3>
      <Grid container spacing={6}>
            {filteredRecetas.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4} >
                <RecipeCalendarCard deleteRecipe={() => deleteRecipe(card._id)} nombre = {card.receta.nombre} autor = {card.receta.autor.nombre} receta = {card.receta} descripcion={card.receta.descripcion} likes = {card.receta.likes} comments = {card.receta.comments}/>
              </Grid>
            ))}
      </Grid>
      {/* Aquí puedes mostrar la lista de recetas */}
    </div>
  );
};

export default DailyRecipes;
