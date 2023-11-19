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
import { uploadStepImage, uploadRecipeImage } from "../../hooks/useFireBase";
import Compressor from 'compressorjs';






const CrearReceta = () => {
  const { _id } = useSelector(state => state.auth.user);
  const ingredientesTotales = useSelector(state => state.ingredients.totalingredients.ingredientes);

  const { startCreateRecipe, startFormRecipe } = useRecipeStore();

  const [totalIngredients, setTotalIngredientes] = useState(ingredientesTotales);

  const [imagenFile, setImagenFile] = useState(null); // Estado para el archivo de imagen
  const [imagenPreview, setImagenPreview] = useState(null); // Estado para la previsualización

 // Para el cambio de la foto
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    setTotalIngredientes(ingredientesTotales);
  }, [ingredientesTotales]);

  useEffect(() => {
    console.log("ingredientesTotales",ingredientesTotales)
    console.log("ingredientesTotales",totalIngredients)

    
  }, [])
  

  const [receta, setReceta] = useState({
    nombre: "",
    autor: _id,
    descripcion: "",
    ingredientes: [],
    pasos: [],
    dificultad: 0,
    tiempo: 0,
    porciones: 0,
    imagenURL: null
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

  const recetaJson = async () => {
    try {
      // Sube la imagen de la receta si hay una seleccionada
      if (imagenFile) {
        const imageUrl = await uploadRecipeImage(imagenFile);
        receta.imagenURL = imageUrl; // Actualizamos directamente el estado aquí
      }

      // Sube las imágenes de cada paso
      const uploadedImages = await Promise.all(receta.pasos.map(async paso => {
        if (paso.imagenFile) {
          const url = await uploadStepImage(paso.imagenFile);
          return url;
        }
        return null; // Devuelve null si no hay imagen
      }));const recetaJson = async () => {
    try {
      // Sube la imagen de la receta si hay una seleccionada
      if (imagenFile) {
        const imageUrl = await uploadRecipeImage(imagenFile);
        receta.imagenURL = imageUrl; // Actualizamos directamente el estado aquí
      }

      // Sube las imágenes de cada paso
      const uploadedImages = await Promise.all(receta.pasos.map(async paso => {
        if (paso.imagenFile) {
          const url = await uploadStepImage(paso.imagenFile);
          return url;
        }
        return null; // Devuelve null si no hay imagen
      }));

      const updatedPasos = receta.pasos.map((paso, index) => ({
        texto: paso.texto,
        imgURL: uploadedImages[index] // Usa las URLs subidas
      }));

      const updatedReceta = {
        ...receta,
        pasos: updatedPasos
      };

      // Aquí ya puedes enviar la receta actualizada a tu backend o donde sea necesario
      startCreateRecipe(updatedReceta);

    } catch (error) {
      console.error("Error al subir las imágenes:", error);
    }
  };

      const updatedPasos = receta.pasos.map((paso, index) => ({
        texto: paso.texto,
        imgURL: uploadedImages[index] // Usa las URLs subidas
      }));

      const updatedReceta = {
        ...receta,
        pasos: updatedPasos
      };

      // Aquí ya puedes enviar la receta actualizada a tu backend o donde sea necesario
      startCreateRecipe(updatedReceta);

    } catch (error) {
      console.error("Error al subir las imágenes:", error);
    }
  };

  // Subida de la imagen de la receta
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success(compressedImage) {
          const previewUrl = URL.createObjectURL(compressedImage);
          setImagenFile(compressedImage);
          setImagenPreview(previewUrl);
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };

  return (
    <Box className="container">
      <div className="textfield upload-image-container">
        <label htmlFor="recipe-image-upload" className="image-upload-label">
          <Button variant="contained" component="span">
            Sube la foto principal
          </Button>
          <input
            id="recipe-image-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </label>
        {imagenPreview && <img src={imagenPreview} alt="Imagen de previsualización" style={{ maxWidth: '100%', height: 'auto' }} />}
      </div>
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
        <PasosTable pasos={receta.pasos}  />
      </div>
      <Button className="button" onClick={recetaJson}>Crear Receta</Button>
    </Box>
  );
};

export default CrearReceta