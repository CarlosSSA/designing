
import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';


const PasosTable = ({ pasos, deletePaso }) => {
  return (
    <List>
      {pasos.map((paso, index) => (
        <ListItem key={index}>
          <ListItemText primary={paso.descripcion} />
          {paso.imgURL && (
            <img src={paso.imgURL} alt={`Imagen Paso ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
          )}
          <Button onClick={() => deletePaso(paso, index)}>Borrar</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default PasosTable;