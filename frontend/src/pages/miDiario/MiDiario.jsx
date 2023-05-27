import React from 'react';
import CajaDatos from '../profile/CajaDatos';
import GraficoKcal from './GraficoKcal';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GraficoPeso from '../miDiario/GraficoPeso';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useEffect,useState } from 'react';




const MiDiario = () =>{

  const [recipes, getRecipes] = useState()
  
    const goalCalories = 2000;
    const currentCalories = 1500;
    const age = 20;
    const height = 1.70;
    const weight = 70;
    const activityLevel = 1.2;

    const {startGetRecipeLikesYFavs} = useAuthStore();

    const auth = useSelector(state => state.auth);

    // Si el campo calorías objetivo no viene definido, entoences muestro el componente de formulario
    const tabNames = ["Seguimiento","Liked", "Favoritas"];
    const [value, setValue] = useState(tabNames[0]);
    const handleChange = (event, newValue) => {
      setValue(tabNames[newValue]);
    };

    useEffect(() => {
      console.log("que me viene en auth? en el useEFFECT XD", auth.user.uid)
      startGetRecipeLikesYFavs({uid:auth.user.uid})
        .then((data) => { 
          getRecipes(data)
          console.log("data de las recetas", data)
        
        })
        .catch((error) => console.log("error", error));
      console.log("que me viene en auth?", auth)
    }, [])
    

    return (
      <>
      <h1>Mi Diario</h1>
         <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <Tabs value={value} onChange={handleChange} centered>
                  <Tab label="Seguimiento" />
                  <Tab label="Me gustan" />
                  <Tab label="Favoritas" />            
                  </Tabs>
          </Box>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <CajaDatos label="Edad" value={age} />
            <CajaDatos label="Altura" value={height} />
            <CajaDatos label="Peso" value={weight} />
            <CajaDatos label="Nivel de actividad física" value={activityLevel} />
        </div>
        <h4>Cambiar los textos por iconos</h4>
        <h4>Llevarme los datos y el test a Mis Datos</h4>
        <h4>hacer el grafico este de kcal pero con barras</h4>
       
       {value === "Seguimiento" ? (
        <div> 
          <GraficoKcal kcalData = {[1500,3000,6000,2300]} kcalGoal={2000} />                  
          <GraficoPeso />  
        </div>               
           
      ) : value === "Liked" ? (
        <div>
          Artículos gustados
        </div>
      ) : value === "Guardadas" ? (
        <div>
          Artículos guardados
        </div>
      ) : (
        <div>
          Favoritos
        </div>
      )}
      </>
    );
  }


export default MiDiario;