import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import IngredientForm from "./IngredientForm";
import IngredientTable from "./IngredientTable";
import PasosForm from "./PasosForm";
import PasosTable from "./PasosTable";
import TimeComponent from "./TimeComponent";
import PorcionesComponent from "./PorcionesComponent";
import DificultadComponent from "./DificultadComponent";
import DescripcionComponent from "./DescripcionComponent";
import TitleComponent from "./TitleComponent";
import "./crearReceta.css";
import { useDispatch, useSelector } from "react-redux";
import { useRecipeStore } from "../../hooks/useRecipeStore";
import { useIngredientStore } from "../../hooks/useIngredientStore";



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



Falta hacer una llamada a la BBDD de ingredientes en un useffect y utilizarlo como options en un componente Autocomplete de MUI
1) Llamada a la BBDD de ingredientes con un useEffect y guardarlo en un estado local
El endpoint sería /api/createIngredient
Crear un /all en formato get
Deberíamos configurar algo así en el controller: await Ingrediente.find()
Actualizar el router del backend
Guardarlo en el state lanzandolo con un useEffect y ver que llega
A la hora de crear la receta las referencias de los objetos ingrediente deberían ser un id
*/




const CrearReceta = () => {

  ///!!!NEXT Usedispatch, useSelector y useRecipeStore para almacenar en el estado los valores de la receta
 //1.) Llamar al hook de recetas --> onCreateRecipe

 //2.) Que este hook llame al slice de retecetas

  //me traigo el usuario que está autenticado ahora mismo
  const { uid } = useSelector(state => state.auth.user);

  const {startCreateRecipe, startFormRecipe} = useRecipeStore();
  const { startAllIngredients } = useIngredientStore();

  const [ingredientes, setIngredientes] = useState([]);
  const [allIngredients, setAllIngredients] = useState([])  
  
  /*
  // Esto lo necesito???

  useEffect(async() => {
    // quiero recibir todo pero luego filtrar el nombre para la lista     
    const ingredientesDb = await startAllIngredients()    
    console.log("Crear Receta - Recibo todos loscingredientes con un UseEffect", ingredientesDb);  
    setAllIngredients(ingredientesDb.ingredientes)   
    console.log("Crear Receta - En el estado de ingredientes con un UseEffect", allIngredients);  
  }, []);

  */
  
  
 
  
  //Guardo el estado como un objeto en lugar de un array? y los ingredientes van dentro del objeto []
  const [receta, setReceta] = useState({
    nombre:"",
    autor:uid,
    descripcion:"",
    ingredientes:[],
    pasos:[],
    dificultad:0,
    tiempo:0,
    porciones:0,
  }); 

  useEffect(() => {
    startFormRecipe(receta)
    
    }, [receta.ingredientes])

  // el name tiene que coincidor con una propiedad del objeto DONDE SE USA ESTO?
  const handleChange = (event) =>{
    event.preventDefault();
    setReceta({ ...receta, [event.target.name]: event.target.value });
    console.log("esto viene de handleChange", receta)
  }

  // Recibe un ingrediente y actualiza el estado de la receta
  const addIngredient = (ingredient) => {
    setReceta({
      ...receta,
      ingredientes: [...receta.ingredientes,ingredient]
    });
    console.log("ingredients actalizado en la receta", receta.ingredientes)
  };

  const addPaso = (paso)=>{ 
    setReceta({
      ...receta,
      pasos: [...receta.pasos,paso]
    })       
    console.log("esto viene de los pasos", receta.pasos)    
  };

  // Borra un ingrediente de la lista
  const deleteItem = (ingredients,index)=>{
    const newIngredients = [...ingredients.slice(0, index), ...ingredients.slice(index + 1)];
    setReceta({
      ...receta,
      ingredientes: newIngredients,
    });
    console.log(`Se ha borrado un elemento con el index ${index}`);
  }

 

  // Devuelve el JSON que se traga el backend
  const recetaJson = (receta)=>{  
    let recetaJSON =  JSON.stringify(receta) 
    console.log(`El objeto que mandas a la API ${recetaJSON}`);
    startCreateRecipe(receta)

    
  }

  // Añade un paso a la receta
  // manda el estado del paso
  

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
        
       
        <IngredientForm ingredientes={receta.ingredientes} ingredientesDb = {allIngredients} addIngredient={addIngredient} handleChange={handleChange} />
        <IngredientTable ingredients={receta.ingredientes} deleteItem={deleteItem}/>
        <PasosForm pasos = {receta.pasos} addPaso={addPaso} handleChange={handleChange}/>
        <PasosTable pasos={receta.pasos} deletePaso={deletePaso}  />
        <Button onClick={() => recetaJson(receta) }>Crear Receta</Button>
    </Box>    
    );
};

export default CrearReceta;