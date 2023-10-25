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
import { uploadStepImage } from "../../hooks/useFireBase";





const CrearReceta = () => {
  const { uid } = useSelector(state => state.auth.user);
  const ingredientesTotales = useSelector(state => state.ingredients.totalingredients.ingredientes);

  const { startCreateRecipe, startFormRecipe } = useRecipeStore();

  const [totalIngredients, setTotalIngredientes] = useState([ingredientesTotales]);

  useEffect(() => {
    setTotalIngredientes(ingredientesTotales);
  }, [ingredientesTotales]);

  const [receta, setReceta] = useState({
    nombre: "",
    autor: uid,
    descripcion: "",
    ingredientes: [],
    pasos: [],
    dificultad: 0,
    tiempo: 0,
    porciones: 0,
  });

  useEffect(() => {
    console.log("receta", receta)
  }, [receta]);

  const handleChange = (field, value) => {
    setReceta((prevReceta) => ({ ...prevReceta, [field]: value }));
  };

  const addIngredient = (ingredient) => {
    setReceta({
      ...receta,
      ingredientes: [...receta.ingredientes, ingredient]
    });
  };

  const addPaso = (paso) => {
    setReceta({
      ...receta,
      pasos: [...receta.pasos, paso]
    });
  };

  const deleteItem = (ingredients, index) => {
    const newIngredients = [...ingredients.slice(0, index), ...ingredients.slice(index + 1)];
    setReceta({
      ...receta,
      ingredientes: newIngredients,
    });
  };

  const recetaJson = async (receta) => {
    const uploadedImages = await Promise.all(receta.pasos.map(async paso => {
      if (paso.imgURL.startsWith('data:image')) {
        const url = await uploadStepImage(paso.imgURL);
        return url;
      }
      return paso.imgURL;
    }));

    const updatedReceta = {
      ...receta,
      pasos: receta.pasos.map((paso, index) => ({
        ...paso,
        imgURL: uploadedImages[index]
      }))
    };

    const recetaJSON = JSON.stringify(updatedReceta);
    startCreateRecipe(updatedReceta);
  };

  const deletePaso = (paso, index) => {
    const newPaso = [...receta.pasos.slice(0, index), ...receta.pasos.slice(index + 1)];
    setReceta({
      ...receta,
      pasos: newPaso
    });
  };

  return (
    <Box className="container">
      <Typography className="title">Crea tu receta</Typography>
      <div className="textfield">
        <TitleComponent title={receta.nombre} handleChange={handleChange} />
      </div>
      <div className="textfield">
        <DescripcionComponent descripcion={receta.descripcion} handleChange={handleChange} />
      </div>
      <div className="textfield">
        <PorcionesComponent porciones={receta.porciones} handleChange={handleChange} />
      </div>
      <div className="textfield">
        <DificultadComponent handleChange={handleChange} />
      </div>
      <div className="textfield">
        <TimeComponent tiempo={receta.tiempo} handleChange={handleChange} />
      </div>
      {totalIngredients && (
        <div className="textfield">
          <IngredientForm ingredientes={receta.ingredientes} totalIngredients={ingredientesTotales} handleChange={handleChange} addIngredient={addIngredient} />
        </div>
      )}
      <div className="textfield">
        <IngredientTable ingredients={receta.ingredientes} deleteItem={deleteItem} />
      </div>
      <div className="textfield">
        <PasosForm addPaso={addPaso} handleChange={handleChange} />
      </div>
      <div className="textfield">
        <PasosTable pasos={receta.pasos} deletePaso={deletePaso} />
      </div>
      <Button className="button" onClick={() => recetaJson(receta)}>Crear Receta</Button>
    </Box>
  );
};

export default CrearReceta;