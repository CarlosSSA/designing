// StepList.js
import React from 'react';
import { Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Button, DialogTitle, DialogContent, Dialog } from '@mui/material';
import { useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import './PasosList.css'
import { useRecipeStore } from '../../hooks/useRecipeStore';
import { uploadImage } from '../../hooks/useFireBase'
import { useEffect } from 'react';


/*
Explicación Funcionalidad Editar/Borrar Pasos:

editingIndex es -1, lo que indica que ningún paso está en modo de edición.
tempStep está vacío (""), ya que no se ha seleccionado ningún paso para editar.
Cuando el usuario hace clic en el icono de editar del "Paso 2", se llama a la función handleEdit con el índice 1 (los índices en JavaScript comienzan desde 0).

Dentro de handleEdit:

setEditingIndex(index) se llama con el valor 1. Esto cambia el valor de editingIndex a 1.
setTempStep(pasos[index]) se llama con pasos[1], que es "Calentar durante 5 minutos". Por lo tanto, tempStep ahora contiene "Calentar durante 5 minutos".

Al llegar al "Paso 2" (índice 1), se verifica si index (que es 1 en este caso) es igual a editingIndex (que también es 1 ahora). Dado que son iguales, en lugar de mostrar el "Paso 2" de forma normal, se muestra el área de texto (textarea).
*/

// la receta es fetchedData.receta.autor._id
// el usuario viene del useSelector -> auth -> uid
const PasosList = ({ pasos, userRecipeID, userID, recipeID, onUpdateSteps }) => {

  useEffect(() => {
    console.log("que recibo en pasos?", pasos)
  
    
  }, [])
  

  console.log("hola", userRecipeID, userID )
  console.log("recipeID", recipeID )

  const { startUpdateRecipeSteps } = useRecipeStore();
  

  // Editar un comentario
  const [editingIndex, setEditingIndex] = useState(-1);
  // Paso para editar
  const [tempStep, setTempStep] = useState("");

  // Borrar un comentario
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const handleDelete = (index) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    // Aquí el código para eliminar de la base de datos...
    // Luego reseteamos el estado:
    setDeleteIndex(-1);
  };


  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempStep(pasos[index]);
  };

  // Firebase Storage

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const imageURL = await uploadImage(file);
      console.log("Imagen subida con éxito. URL:", imageURL);
      // Guardamos la foto en la BBDD en el paso en cuestiónS
    } catch (error) {
      console.error("Hubo un error al subir la imagen:", error);
    }
  };

  const handleSave = async (index) => {
    // Aquí el código para guardar en la base de datos...
    console.log("tempStep", tempStep)
    // 1. Crear una copia del array original
    const updatedSteps = [...pasos];

    // 2. Reemplazar el paso modificado en la copia del array
    updatedSteps[index] = tempStep;

    // 3. Actualizar en BBDDS

    try {
      console.log("llamo al hook startUpdateRecipeSteps", recipeID, updatedSteps)
      const data = await startUpdateRecipeSteps({ rid: recipeID, pasos: updatedSteps });

      // Aquí puedes manejar cualquier acción posterior basada en la respuesta del servidor
      // Por ejemplo, si quieres mostrar una notificación o actualizar algún otro estado.
      if (data.ok) {
          console.log("Pasos actualizados con éxito.");
          // llamo a la función del componente padre que actualiza su estado para que rerendice
          onUpdateSteps(updatedSteps)
      } else {
          console.log("Hubo un error al actualizar los pasos.");
      }
  } catch (error) {
      console.error("Error al hacer la petición:", error);
  }


    //startUpdateRecipeSteps({rid:, steps:})
    // Luego reseteamos el estado:
    setEditingIndex(-1);
  };

  return (
    <List>
      {pasos.map((step, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar
              style={{
                backgroundColor: '#e0e0e0',
                color: '#616161',
                fontWeight: 'bold',
              }}
            >
              {index + 1}
            </Avatar>
          </ListItemAvatar>

          {index === editingIndex ? (
            <div>
            <textarea value={tempStep} onChange={(e) => setTempStep(e.target.value)} />
            <input type="file" onChange={handleImageUpload} />
            <Button onClick={() => handleSave(index)}>Guardar cambios</Button>
          </div>
          ) : (
            <>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    component="div"
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    {`Paso ${index + 1}`}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                  >
                    {step}
                  </Typography>
                }
              />

              {userRecipeID === userID && (
                <div>
                <IconButton onClick={() => handleEdit(index)} aria-label="editar">
                  <ModeEditIcon className="custom-icon-size"/>
                </IconButton>
                <IconButton onClick={() => handleDelete(index)} aria-label="borrar">
                  <DeleteIcon className="custom-icon-size"/>
                </IconButton>
              </div>
              )}
            </>
          )}
        </ListItem>
      ))}

      {/* Agregamos el Dialog para borrar aquí */}
      <Dialog
        open={deleteIndex !== -1}
        onClose={() => setDeleteIndex(-1)}
      >
        <DialogTitle>¿Estás seguro de que quieres eliminar este paso?</DialogTitle>
        <DialogContent>
          <Button onClick={confirmDelete}>Confirmar</Button>
          <Button onClick={() => setDeleteIndex(-1)}>Cancelar</Button>
        </DialogContent>
      </Dialog>
    </List>
  );
};

export default PasosList;
