// Buscador.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import './Buscador.css';
import { useRecipeStore } from '../hooks/useRecipeStore';
import {onSetSearchFilter, onSetRecipeFilter} from '../store/recipes/recipesSlice';
import { useDispatch } from 'react-redux';



export default function Buscador({ ingredientes, onSearch }) {

  // ingredientes = nombre de todos los ingredientes de la BBDD

  const dispatch = useDispatch();

  const { startGetRecetaByName , startSearchByIngredientName} = useRecipeStore();

  const [inputValue, setInputValue] = useState('');
  //Para los Chips
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Cuando selecciono un ingrediente de la lista
  const handleAddIngredient = (ingredient) => {
    if (ingredient && ingredient.trim() !== '' && !selectedIngredients.includes(ingredient)) {
        setSelectedIngredients([...selectedIngredients, ingredient]);
        dispatch(onSetSearchFilter(selectedIngredients))
        setInputValue('');  // Limpiamos el input
    }
};

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter(ing => ing !== ingredient));
  };

  // Cuando clickas en "Buscar"
  const handleSearch = async () => {
    // Filtramos el array para remover cualquier valor null
    const filteredIngredients = selectedIngredients.filter(ingredient => ingredient !== null);
  
    try {
      // Si el input NO es un ingrediente -> Busco las recetas que contengan esa palabra en el titulo
        if (!ingredientes.includes(inputValue)) {
            //Esto simplemente hace un console.log, es una funcion que le viene como prop al componente
            onSearch(inputValue,"titulo");
            
            // Hacer una llamada a la BBDD por el titulo de la receta que contenga inputValue, independientemente de lo que haya en las chips
            
            const resultado = await startGetRecetaByName(inputValue); // Asumo que startActiveRecipe es una función que devuelve una promesa
            console.log("Resultado de la búsqueda por título:", resultado);
            // Aqui debería alterar el estado filteredRecipes
            dispatch(onSetRecipeFilter(resultado))

        } else {
            onSearch(inputValue, "ingrediente");
            console.log("filteredIngredients", filteredIngredients);
            // Parece que funciona OK, al menos para 1 ingrediente
            const recetasXIngredient = await startSearchByIngredientName({nombreIngredientes:filteredIngredients})
            console.log(recetasXIngredient)

            // Para que queria usar esto?
            // dispatch(onSetSearchFilter(recetasXIngredient));

            // Aquí harías una llamada similar para buscar por ingredientes
            // Ejemplo:
            // const resultado = await startSearchByIngredients(filteredIngredients);
            // console.log("Resultado de la búsqueda por ingredientes:", resultado);
        }
    } catch (error) {
        console.error("Error al buscar recetas:", error.message);
    }
};

  return (
    <div>
      <div>
        {selectedIngredients.map(ingredient => (
          <Chip
            label={ingredient}
            onDelete={() => handleRemoveIngredient(ingredient)}
            className="buscador-chip"
          />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Autocomplete
          freeSolo
          options={ingredientes}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={(event, newValue) => {
            handleAddIngredient(newValue);
          }}
          inputValue={inputValue}
          renderInput={(params) => (
            <TextField {...params} label="Buscar ingrediente o receta" margin="normal" variant="outlined" />
          )}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Buscar
        </Button>
      </div>
    </div>
  );
}