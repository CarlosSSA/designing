import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import IngredientForm from "./IngredientForm";
import IngredientTable from "./IngredientTable";
import PasosForm from "./pasosForm";
import PasosTable from "./PasosTable";
import TimeComponent from "./TimeComponent";
import PorcionesComponent from "./PorcionesComponent";
import DificultadComponent from "./DificultadComponent";
import DescripcionComponent from "./DescripcionComponent";
import TitleComponent from "./TitleComponent";
import "./crearReceta.css";




/* Qué debemos enviar para la receta?

- "Nombre de la receta" x
- "autor"
- "Descripcion" x
- [ingredientes] x
- [pasos] (limitar a 10)
- ** imagenes **
- Dificultad (0/5)
- Tiempo de Receta**
- Numero porciones** x


Faltan tiempo 
*/



const CrearReceta = () => {

  // Este estado lo necesito?
  const [ingredients, setIngredients] = useState([]);  
  // Estado de los pasos
  const [pasos, setPasos] = useState([])  
  //Guardo el estado como un objeto en lugar de un array? y los ingredientes van dentro del objeto []
  const [receta, setReceta] = useState({
    nombre:"",
    autor:"",
    descripcion:"",
    ingredientes:[],
    pasos:pasos,
    dificultad:0,
    tiempo:0,
    porciones:0,
  }); 

  // el name tiene que coincidor con una propiedad del objeto DONDE SE USA ESTO?
  const handleChange = (event) =>{
    event.preventDefault();
    setReceta({ ...receta, [event.target.name]: event.target.value });
    console.log(receta)
  }

  // Recibe un ingrediente y actualiza el estado de la receta
  const addIngredient = (ingredient) => {
    setReceta({
      ...receta,
      ingredientes: [...receta.ingredientes,ingredient]
    });
    console.log("ingredients", receta.ingredientes)
  };

  // Borra un ingrediente de la lista
  const deleteItem = (ingredients,index)=>{
    const newIngredients = [...ingredients.slice(0, index), ...ingredients.slice(index + 1)];
    setIngredients(newIngredients);
    console.log(`Se ha borrado un elemento con el index ${index}`);
  }

  // Devuelve el JSON que se traga el backend
  const recetaJson = (receta)=>{    
    console.log(`El objeto que mandas a la API ${JSON.stringify(receta)}`);
  }

  // Añade un paso a la receta
  const addPaso = (paso)=>{ 
    setReceta({
      ...receta,
      pasos:[...receta.pasos,paso]
    })       
    console.log(receta.pasos)    
  }

  // Borra un paso de la receta
  const deletePaso = (paso,index)=>{
    const newPaso = [...pasos.slice(0, index), ...pasos.slice(index + 1)];
    setPasos(newPaso);
    console.log(`Se ha borrado un elemento con el index ${index}`);
  }

  return (
    <Box>
        <p>Crea tu receta</p>
        <div>
         <TitleComponent title={receta.nombre} handleChange={handleChange} />
        </div>
        <div>     
        <DescripcionComponent descripcion={receta.descripcion} handleChange={handleChange}/> 
        </div>    
        <PorcionesComponent porciones={receta.porciones} handleChange={handleChange}/>
        <DificultadComponent handleChange={handleChange}/>
        <TimeComponent tiempo={receta.tiempo} handleChange={handleChange}/>
        
       
        <IngredientForm ingredientes={receta.ingredientes} addIngredient={addIngredient} handleChange={handleChange} />
        <IngredientTable ingredients={receta.ingredientes} deleteItem={deleteItem}/>
        <PasosForm pasos = {receta.pasos} addPaso={addPaso} deletePaso={deletePaso}/>
        <PasosTable pasos={receta.pasos} deletePaso={deletePaso}  />
        <Button onClick={() => recetaJson(receta) }>Crear Receta</Button>
    </Box>    
    );
};

export default CrearReceta;