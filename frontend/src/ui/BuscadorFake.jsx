import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import './Buscador.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';

export default function BuscadorFake() {

  const navigate = useNavigate(); 

  const handleRedirect = () => {
    navigate('/busquedaPage');  // Reemplaza '/rutaDeseada' con la ruta a la que deseas navegar
  };

  return (
    <div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Autocomplete
          freeSolo          
          sx={{ width: 150 }}
          fullWidth="true"    
        
         
          renderInput={(params) => (
            <TextField 
             
              label="Buscar ingrediente o receta" 
              margin="normal" 
              variant="outlined" 
              onClick={handleRedirect}
            />
          )}
        />
        <Button size= "small" color="inherit" onClick={handleRedirect} className="searchButton" >
          <SearchOutlinedIcon className="searchIcon" fontSize='small' color="primary" />
        </Button>
      </div>
    </div>
  );
}