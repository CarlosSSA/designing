
import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';

const PasosTable = ({ pasos, deletePaso, handleImageChange }) => {
  return (
    <List>
      {pasos.map((paso, index) => (
        <ListItem key={index}>          
          <ListItemText primary={paso} />
          <Button onClick={() => deletePaso(paso, index) }>Borrar</Button>
          
        </ListItem>
      ))}
    </List>
  );
};

export default PasosTable