// Buscador.jsx
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import './Buscador.css';
import { useRecipeStore } from '../hooks/useRecipeStore';
import {onSetSearchFilter, onSetRecipeFilter, onSetError, onClearError} from '../store/recipes/recipesSlice';
import { useDispatch } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



export default function Buscador({ ingredientes, onSearch }) {

  // ingredientes = nombre de todos los ingredientes de la BBDD

  const dispatch = useDispatch();

  const { startGetRecetaByName , startSearchByIngredientName} = useRecipeStore();

  const [inputValue, setInputValue] = useState('');
  //Para los Chips
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Cuando selecciono un ingrediente de la lista
  const handleAddIngredient = (ingredient) => {
    if (ingredientes.includes(ingredient) && ingredient.trim() !== '' && !selectedIngredients.includes(ingredient)) {
        setSelectedIngredients([...selectedIngredients, ingredient]);
        dispatch(onSetSearchFilter(selectedIngredients))
        console.log(selectedIngredients)
        setInputValue('');  // Limpiamos el input
    }
};

useEffect(() => {
  console.log('Ingredientes en Buscador:', ingredientes);
}, [ingredientes]);

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter(ing => ing !== ingredient));
  };

  // Cuando clickas en "Buscar"
  const handleSearch = async () => {
    // Filtramos el array para remover cualquier valor null
    const filteredIngredients = selectedIngredients.filter(ingredient => ingredient !== null);
  
    try {
      // Si el input NO es un ingrediente y las chips están vacías -> Busco las recetas que contengan esa palabra en el titulo
        if (filteredIngredients.length === 0 && !ingredientes.includes(inputValue)) {
            //Esto simplemente hace un console.log, es una funcion que le viene como prop al componente
            onSearch(inputValue,"titulo");
            
            // Hacer una llamada a la BBDD por el titulo de la receta que contenga inputValue, independientemente de lo que haya en las chips
            
            const resultado = await startGetRecetaByName(inputValue); // Asumo que startActiveRecipe es una función que devuelve una promesa
            console.log("Resultado de la búsqueda por título:", resultado);

            if (resultado && resultado.length > 0) {
              dispatch(onSetRecipeFilter(resultado));              
              dispatch(onClearError());

          } else {
              // Si no hay resultados o el resultado es inválido, despacha un error
              dispatch(onSetError("No hay Recetas que Coincidan con tu Búsqueda"));
          }

            

        } else {  // las chips tienen algo
            // Esto solo hace un console.log 
            onSearch(inputValue, "ingrediente");
            console.log("filteredIngredients", filteredIngredients);
            
           // Primero necesito llamar al backend para que me encuentre Recetas con estos ingredientes

            const recetasXIngredient = await startSearchByIngredientName({nombreIngredientes:filteredIngredients})
            console.log(recetasXIngredient)

            

            //Luego actualizo el estado
            dispatch(onSetRecipeFilter(recetasXIngredient));

            // Aquí harías una llamada similar para buscar por ingredientes
            // Ejemplo:
            
            // console.log("Resultado de la búsqueda por ingredientes:", resultado);
        }
    } catch (error) {
        console.error("Error al buscar recetas:", error.message);
        dispatch(onSetError("No hay Recetas que Coincidan con tu Búsqueda"));

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
          sx={{ width: 150 }}
          fullWidth="true"
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
        <Button size= "small" color="inherit" onClick={handleSearch} className="searchButton" >
          <SearchOutlinedIcon className="searchIcon" fontSize='small' color="primary" />
        </Button>
      </div>
    </div>
  );
}