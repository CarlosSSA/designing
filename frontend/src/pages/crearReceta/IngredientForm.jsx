import { TextField, Button, InputAdornment, FormControl, InputLabel, Select, MenuItem, Autocomplete} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIngredientStore } from "../../hooks/useIngredientStore";


const IngredientForm = ({addIngredient, totalIngredients}) => {
  
  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState(1);
  const nombres = totalIngredients.map(item => item.nombre);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    console.log("totalIngredients",totalIngredients )
  
   
  }, [])
  

  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (selectedIngredient) {
      // Extract the name and URL from the selected ingredient object
      const { nombre: name, imagenUrl: imageUrl, unidad } = selectedIngredient;
      const gramsEquivalent = amount * unidad[unit];

      // Create a new ingredient object
      const newIngredient = {
        ingrediente: selectedIngredient._id,
        name,
        cantidad: parseFloat(amount),
        unidad:unit,
        imageUrl,
        gramsEquivalent, // Pass the grams equivalence to the new ingredient object
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
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => <TextField {...params} label="Ingrediente" />}
            value={selectedIngredient}
            onChange={(event, newValue) => {
                setSelectedIngredient(newValue);
            }}
        />
       <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <TextField
              label="Cantidad"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              margin="normal"
          />
      </FormControl>
         
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="unidad-label">Unidad</InputLabel>
            <Select
                labelId="unidad-label"
                id="select-unidad"
                value={unit}
                label="Unidades"
                onChange={(event) => setUnit(event.target.value)}
                required
            >
                {selectedIngredient && Object.entries(selectedIngredient.unidad).map(([key, value]) => {
                    if (value !== 0) {
                        return <MenuItem key={key} value={key}>{key}</MenuItem>;
                    }
                    return null;
                })}
            </Select>
        </FormControl>

            <Button type="submit" variant="contained" color="primary">
            Agregar
            </Button>
        </FormControl>
      </form>
    );
  };

export default IngredientForm;