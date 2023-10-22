import React from 'react';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import RecipeReviewCard from '../../ui/Tarjeta';
import { useState } from 'react';
import RecipeCalendarCard from './RecipeCalendarCard';
import {useAuthStore} from '../../hooks/useAuthStore';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import GraficoSuperior from '../../ui/GraficoSuperior';


// Este componente se encarga de mostrar la lista de recetas para una fecha determinada
// en recetas nos llegan las calendarRecipes del usuario

const DailyRecipes = ({ fecha, recetas, obtenerRecetas, kcalObjetivo }) => {
  const [filteredRecetas, setFilteredRecetas] = useState([]);
  const [totalValues, setTotalValues] = useState({});
  
  const { startUpdateRecetaCalendar, startActualizacionTotales } = useAuthStore();
  const user = useSelector(state => state.auth.user); 

  useEffect(() => {
    const filterAndUpdateTotales = () => {
      const filtered = recetas.filter(card => new Date(card.fecha).toDateString() === fecha.toDateString());
      let totales = {};

      filtered.forEach(receta => {
        Object.keys(receta.receta.totales).forEach(propiedad => {
          if (!totales[propiedad]) {
            totales[propiedad] = 0;
          }
          totales[propiedad] += receta.receta.totales[propiedad];
        });
      });
      
      setFilteredRecetas(filtered);
      setTotalValues(totales);
      startActualizacionTotales({ totales });
    };

    filterAndUpdateTotales();
  }, [fecha, recetas]);

  const deleteRecipe = async (id) => {
    const updatedRecetas = recetas.filter(item => item._id !== id);
  
    try {
      await startUpdateRecetaCalendar({ uid: user.uid, recetas: updatedRecetas });
      obtenerRecetas();
      Swal.fire({
        title: 'Receta borrada',
        text: 'La receta se ha borrado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      console.error("Error al actualizar y obtener recetas", error);
    }
  }

  return (
    filteredRecetas.length > 0 ? (
      <div>
        <GraficoSuperior kcalObjetivo={kcalObjetivo} totales={totalValues} />
        <h3>Recetas para el día</h3>
        <Grid container spacing={6}>
          {filteredRecetas.map((card) => (
            card && card.receta && (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <RecipeCalendarCard 
                  deleteRecipe={() => deleteRecipe(card._id)}
                  nombre={card.receta.nombre}
                  autor={card.receta.autor.nombre}
                  receta={card.receta}
                  descripcion={card.receta.descripcion}
                  likes={card.receta.likes}
                  comments={card.receta.comments}
                />
              </Grid>
            )
          ))}
        </Grid>
      </div>
    ) : null
  );
};

export default DailyRecipes;