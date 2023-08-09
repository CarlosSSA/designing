import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem } from '@mui/material';

const HarrisTest = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [objective, setObjective] = useState('');

  const handleSubmit = () => {
    let BMR;
    if (gender === 'male') {
        BMR = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)
    } else if (gender === 'female') {
        BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)    
    }
  
    let totalCalories;
    switch (activity) {
      case 'Sedentaria (poco o nada de ejercicio)':
        totalCalories = BMR * 1.2;
        break;
      case 'Actividad Ligera (1-3 dias deporte ligero)':
        totalCalories = BMR * 1.375;
        break;
      case 'Actividad Moderada (3-5 dias deporte moderado)':
        totalCalories = BMR * 1.55;
        break;  
      case 'Muy Activo (6-7 dias deporte intenso)':
        totalCalories = BMR * 1.725;
        break;
      case 'Extra Activo (Ejercicio y Trabajos muy duros)':
        totalCalories = BMR * 1.9;
        break;
      default:
        totalCalories = BMR;
    }

    // Ajuste según el objetivo
    switch (objective) {
      case 'Perder Peso':
        totalCalories -= 500;
        break;
      case 'Ganar Peso':
        totalCalories += 500;
        break;
      // No es necesario un caso para 'Mantener Peso' ya que totalCalories se queda igual
    }
  
    alert(`Necesitas aproximadamente ${Math.round(totalCalories)} kcal diarias para ${objective.toLowerCase()}.`);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Test de Harris Benedict
      </Typography>
      
      <TextField fullWidth margin="normal" label="Edad" value={age} onChange={(e) => setAge(e.target.value)} />
      <TextField fullWidth margin="normal" label="Peso (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <TextField fullWidth margin="normal" label="Altura (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
      
      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Género</FormLabel>
        <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
          <FormControlLabel value="male" control={<Radio />} label="Masculino" />
          <FormControlLabel value="female" control={<Radio />} label="Femenino" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel component="legend">Nivel de actividad</FormLabel>
        <Select value={activity} onChange={(e) => setActivity(e.target.value)}>
          <MenuItem value="Sedentaria (poco o nada de ejercicio)">Sedentaria (poco o nada de ejercicio)</MenuItem>
          <MenuItem value="Actividad Ligera (1-3 dias deporte ligero)">Actividad Ligera (1-3 dias deporte ligero)</MenuItem>
          <MenuItem value="Actividad Moderada (3-5 dias deporte moderado)">Actividad Moderada (3-5 dias deporte moderado)</MenuItem>
          <MenuItem value="Muy Activo (6-7 dias deporte intenso)">Muy Activo (6-7 dias deporte intenso)</MenuItem>
          <MenuItem value="Extra Activo (Ejercicio y Trabajos muy duros)">Extra Activo (Ejercicio y Trabajos muy duros)</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel component="legend">Objetivo</FormLabel>
        <Select value={objective} onChange={(e) => setObjective(e.target.value)}>
          <MenuItem value="Perder Peso">Perder Peso</MenuItem>
          <MenuItem value="Mantener Peso">Mantener Peso</MenuItem>
          <MenuItem value="Ganar Peso">Ganar Peso</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={handleSubmit}>
        Calcular
      </Button>
    </Container>
  );
};

export default HarrisTest;

