import { TextField, Button, InputAdornment, FormControl, InputLabel, Select, MenuItem, Autocomplete} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIngredientStore } from "../../hooks/useIngredientStore";


const IngredientForm = ({addIngredient, totalIngredients}) => {
  
  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState(1);
  const nombres = totalIngredients.map(item => item.nombre);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (selectedIngredient) {
      // Extract the name and URL from the selected ingredient object
      const { nombre: name, imagenUrl: imageUrl } = selectedIngredient;
  
      // Create a new ingredient object
      const newIngredient = {
        name,
        amount,
        unit,
        imageUrl, // Pass the URL to the new ingredient object
      };
  
      // Send to the parent component
      addIngredient(newIngredient);
  
      // Clear local states
      setIngredient("");
      setAmount("");
      setUnit(1);
      setSelectedIngredient(null); // Reset the selected ingredient
    }
  };  
  
    return (      
      <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'space-between'}}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">        
       
        <Autocomplete
          options={totalIngredients}
          getOptionLabel={(option) => option.nombre} // Display the ingredient name
          renderInput={(params) => <TextField {...params} label="Elige una opción" />}
          value={selectedIngredient}
          onChange={(event, newValue) => {
            setSelectedIngredient(newValue);
          }}
        />
            <TextField
                label="Cantidad"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                margin="normal"
            />
         
            <InputLabel id="demo-select-small">Unidad</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={unit}
                label="Unidades"
                onChange={(event) => setUnit(event.target.value)} // ajuste aquí
                required
            >                
                <MenuItem value={1}>g</MenuItem>
                <MenuItem value={2}>Pieza</MenuItem>
                <MenuItem value={3}>Taza</MenuItem>
                <MenuItem value={4}>Cucharada</MenuItem>
            </Select>

            <Button type="submit" variant="contained" color="primary">
            Agregar
            </Button>
        </FormControl>
      </form>
    );
  };

export default IngredientForm;