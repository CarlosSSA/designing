import { TextField, Button, InputAdornment, FormControl, InputLabel, Select, MenuItem, Autocomplete} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIngredientStore } from "../../hooks/useIngredientStore";


const IngredientForm = ({addIngredient, handleChange, totalIngredients}) => {
  
    const [ingredient, setIngredient] = useState("");
    const [amount, setAmount] = useState("");
    //Para controlar las unidades
    const [unit, setUnit] = useState(1);    
    const [value, setValue] = useState();     

    // Recibo todos los ingredientes de la BBDD
    /*
    [{cantidad, descripcion,grasas, hcs, nombre, proteinas, id},{},{}...]
    */

    //how to create a loop?

    
    
    const options = totalIngredients

    useEffect(() => {
      console.log("que me llega en totalIngredients", totalIngredients)
    
      
    }, [])
    
   

    const handleSubmit = (event, estado) => {
      event.preventDefault();    
      //actualizo la propiedad de ingredientes con el ID del Ingrediente y su cantidad
      addIngredient({ value }); // [{}]
      setIngredient("");
      setAmount("");
    };

    // el newValue evalua a {nombre: 'Huevo', id: '63810a897ef4db1713b09135'}
  
  
    return (      
      <form onSubmit={(event) => handleSubmit(event, value)} style={{display: 'flex', justifyContent: 'space-between'}}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">        
       
          <Autocomplete                
                options={options}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Elige una opción" />}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);                  
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