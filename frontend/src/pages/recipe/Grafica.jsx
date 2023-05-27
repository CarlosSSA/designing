import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Typography } from '@mui/material';

const COLORS = ['#FFC300', '#FF5733', '#C70039'];

const Grafica = ({ datos }) => {

    const totalMacronutrientes = datos.receta.totales.proteinas + datos.receta.totales.hcs + datos.receta.totales.grasas;

  const data = [
    { name: 'Hidratos', value: Math.round((datos.receta.totales.hcs / totalMacronutrientes) * 100) },
    { name: 'Grasas', value: Math.round((datos.receta.totales.grasas / totalMacronutrientes) * 100) },
    { name: 'Proteínas', value: Math.round((datos.receta.totales.proteinas / totalMacronutrientes) * 100) },
  ];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Distribución Nutricional %
      </Typography>
      <PieChart width={300} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Grafica;

