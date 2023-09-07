import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Text } from 'recharts';
import { Typography,Grid, Paper } from '@mui/material';
import './Grafica.css'; // Importar el archivo CSS


const COLORS = ['#FFC300', '#FF5733', '#C70039'];


const Grafica = ({ datos }) => {
  const totalKcal = datos.receta.totales.kcal; // Supongo que tienes esta información en tus datos
  const totalMacronutrientes = datos.receta.totales.proteinas + datos.receta.totales.hcs + datos.receta.totales.grasas;

  const data = [
    { name: 'Hidratos', value: Math.round((datos.receta.totales.hcs / totalMacronutrientes) * 100) },
    { name: 'Grasas', value: Math.round((datos.receta.totales.grasas / totalMacronutrientes) * 100) },
    { name: 'Proteínas', value: Math.round((datos.receta.totales.proteinas / totalMacronutrientes) * 100) },
  ];

  const renderLabel = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, index,
    } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (index === 0) {
      return (
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={COLORS[index % COLORS.length]}>
          {`${totalKcal} kcal`}
        </text>
      );
    }
    return null;
  };

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
          innerRadius={60}
          fill="#8884d8"
          label={renderLabel}
          labelLine={false}

        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {/* <Legend /> */}
        
      </PieChart>
      <Paper elevation={3}>
    <Grid container spacing={3} justifyContent="center" className="macro-container">
      <Grid item xs={4} className="macro-item">
        <Typography variant="subtitle1" align="center">Carbohidratos</Typography>
        <Typography variant="h6" align="center">{`${datos.receta.totales.hcs}/450`}</Typography>
      </Grid>
      <Grid item xs={4} className="macro-item">
        <Typography variant="subtitle1" align="center">Proteinas</Typography>
        <Typography variant="h6" align="center">{`${datos.receta.totales.proteinas}/200`}</Typography>
      </Grid>
      <Grid item xs={4} className="macro-item">
        <Typography variant="subtitle1" align="center">Grasas</Typography>
        <Typography variant="h6" align="center">{`${datos.receta.totales.grasas}/60`}</Typography>
      </Grid>
    </Grid>
</Paper>

    </div>
  );
};

export default Grafica;
