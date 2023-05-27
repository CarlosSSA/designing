import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './styles.css'

// Son cajas donde ponemos los datos del usuario

const CajaDatos = ({ label, value }) => {
  
  return (
    <Card className="card">
      <CardContent>
        <Typography className="title" color="textSecondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h5" component="h2">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CajaDatos;
