
import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Paper } from '@mui/material';



const PasosTable = ({ pasos, deletePaso }) => {
  return (
    <Paper style={{ margin: "10px 0", padding: "10px" }}>
      <List>
        {pasos.map((paso, index) => (
          <ListItem key={index} style={{ alignItems: 'flex-start' }}>
            <ListItemText primary={paso.texto} />
            {paso.imagenFile && (
              <img
                src={URL.createObjectURL(paso.imagenFile)}
                alt={`Paso ${index}`}
                style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }}
              />
            )}
            <Button onClick={() => deletePaso(index)} style={{ marginLeft: 'auto' }}>Eliminar</Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PasosTable;