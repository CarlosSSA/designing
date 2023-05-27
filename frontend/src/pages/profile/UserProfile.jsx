import React, { useState } from 'react';
import CajaDatos from './CajaDatos';
import CalorieChart from './CalorieChart';
import { useSelector } from 'react-redux';
import Formulario from './Formulario';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GraficoPeso from '../miDiario/GraficoPeso';




const UserProfile = () =>{
  
    const goalCalories = 2000;
    const currentCalories = 1500;
    const age = 20;
    const height = 1.70;
    const weight = 70;
    const activityLevel = 1.2;

    const auth = useSelector(state => state.auth);

    // Si el campo calorías objetivo no viene definido, entoences muestro el componente de formulario
    const tabNames = ["Liked", "Favoritas"];
    const [value, setValue] = useState(tabNames[0]);
    const handleChange = (event, newValue) => {
      setValue(tabNames[newValue]);
    };

    return (
      <>
       <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Me gustan" />
                <Tab label="Mis favoritos" />            
                </Tabs>
        </Box>
        {value === "Liked" ? (
        
          <div>
            <h1>Mi Perfil</h1>

            <GraficoPeso />

              <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <Tabs value={value} onChange={handleChange} centered>
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
              <CalorieChart goal={goalCalories} current={currentCalories} />
          </div>
        
      
      
        ) : (
          <div>
            Favoritos
          </div>
        )}
      </>
    );
  }


export default UserProfile;
