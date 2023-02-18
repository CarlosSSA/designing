import { TextField, Button, InputAdornment, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import React, { useState } from "react";



const IngredientForm = ({addIngredient, handleChange}) => {
    const [ingredient, setIngredient] = useState("");
    const [amount, setAmount] = useState("");
    //new
    const [unit, setUnit] = useState(1);
   
    
  
    const handleSubmit = (event) => {
      event.preventDefault();
      //multiplica el valor del amount por el tipo de cantidad que se introduce. Habrá que ver cuanto es una pieza, poner la taza y cucharadita como standard
      const totalAmount = parseInt(amount * unit)
      addIngredient({ ingredient, amount:totalAmount });
      setIngredient("");
      setAmount("");
    };
  
    return (
      <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'space-between'}}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <TextField
                label="Ingrediente"
                value={ingredient}
                onChange={(event) => setIngredient(event.target.value)}
                margin="normal"
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
                onChange={handleChange}
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

export default IngredientForm