import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function BuscadorFake() {



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
            />
          )}
        />
        <Button size= "small" color="inherit" className="searchButton" >
          <SearchOutlinedIcon className="searchIcon" fontSize='small' color="primary" />
        </Button>
      </div>
    </div>
  );
}