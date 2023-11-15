import { Menu, Avatar, Card, CardActionArea, Grid, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Typography, TextField, Button, MenuItem } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useRecipeStore } from '../../hooks/useRecipeStore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MessageIcon from '@mui/icons-material/Message';
import { Cell, PieChart, Pie , Tooltip, LabelList,LineChart, Line ,RadarChart , PolarGrid, PolarAngleAxis,PolarRadiusAxis, Radar, Legend, ResponsiveContainer    } from 'recharts';
import './recipePage.css'
import { DataGrid } from '@mui/x-data-grid';

import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ContenidoCard from './ContenidoCard';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import UpdateIcon from '@mui/icons-material/Update';
import ImageIcon from '@mui/icons-material/Image';


  





const columns = [  
  { field: 'Ingrediente', headerName: 'Ingredientes', width: 130 },
  { field: 'Cantidad', type:'number', headerName: 'Cantidad', width: 130,description: 'Cantidades en g' },

];


  export const RecipePage = () => {

    const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú desplegable
    const open = Boolean(anchorEl);
    const {startSelectRecipe, startUpdateRecipeName, startUpdateRecipeTime} = useRecipeStore()


    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');

    const [isEditingTime, setIsEditingTime] = useState(false);
    const [editedTime, setEditedTime] = useState('');

  const handleNameChange = (event) => {
      setEditedName(event.target.value);
  };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Ejemplo de función para una opción de menú
    const handleEditImage = () => {
        console.log('Editar imagen');
        handleMenuClose();
    };

    const handleEditTime = () => {
      setIsEditingTime(true);
      setEditedTime(fetchedData.receta.tiempo.toString());
      handleMenuClose();
  };

  const handleTimeChange = (event) => {
    setEditedTime(event.target.value);
  };

    const handleEditName = () => {
        console.log('Editar nombre');
        setIsEditing(true);
        handleMenuClose();
    };

    const handleTimeSubmit = async (event) => {
      event.preventDefault();
      const tiempo = parseInt(editedTime, 10); // Asegúrate de que el tiempo sea un número
  
      if (!recipeid || isNaN(tiempo)) {
          console.log("No se puede actualizar el tiempo con valores inválidos.");
          return;
      }
  
      try {
          // Llama al método para actualizar el tiempo en el backend
          const updatedData = await startUpdateRecipeTime({rid: recipeid, tiempo});
          console.log('Tiempo actualizado:', updatedData);  
  
          if (updatedData && updatedData.ok) {
              // Actualiza el estado local con los datos actualizados
              setFetchedData(prevData => ({
                  ...prevData,
                  receta: {
                      ...prevData.receta,
                      tiempo: tiempo
                  }
              }));
          }
  
          setIsEditingTime(false); // Salir del modo de edición
      } catch (error) {
          console.error("Error al actualizar el tiempo:", error);
      }
  };

    const handleNameSubmit = async (event) => {
      event.preventDefault();
  
      if (!recipeid || editedName.trim() === '') {
          // Puedes manejar aquí el caso de que no haya recipeid o el nombre editado esté vacío
          console.log("No se puede actualizar el nombre con valores inválidos.");
          return;
      }
  
      try {
          // Llama al método para actualizar el nombre en el backend
          const updatedData = await startUpdateRecipeName({rid:recipeid, name:editedName.trim()});
          console.log('Nombre actualizado:', editedName);  
         
          if (updatedData && updatedData.ok) {
            setFetchedData(prevData => ({
                ...prevData,
                receta: {
                    ...prevData.receta,
                    nombre: editedName
                }
            }));
        }

          setIsEditing(false); // Salir del modo de edición

      } catch (error) {
          console.error("Error al actualizar el nombre:", error);
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
  };


    // Guardar Receta
    const [recipeSaved, setRecipeSaved] = useState(false); 
    const handleSaveRecipe = () => {
    setRecipeSaved(!recipeSaved); // Actualizar el estado para indicar que la receta ha sido guardada
    if(recipeSaved === true){
      console.log("receta borrada")
    }else
    console.log("receta guardada")
};

  const {recipeid} = useParams()
  const [fetchedData, setFetchedData] = useState()
 
 
  // Llamada a BBDD para recoger datos de esta receta en concreto
    console.log("el recipeid ", recipeid);
    console.log("Antes de Lanzar el useEffect en la receta, para ver si recibo el id desde los parámetros", recipeid);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await startSelectRecipe(recipeid);
          setFetchedData(data);
          console.log("hola")
          // Actualiza el nombre editado después de cargar los datos
          if (data && data.receta) {
            setEditedName(data.receta.nombre);
          }
        } catch (error) {
          console.log("error al cargar los datos", error);
        }
      };
      fetchData();
    }, [recipeid]);
    
    console.log("fetchedData", fetchedData);



 const handleEditCard = () => {
  console.log("Intento editar la receta");
 }

 const renderBookmarkIcon = () => {
  if (recipeSaved) {
    return <BookmarkAddedIcon fontSize="large"/>;
  } else {
    return <BookmarkBorderIcon fontSize="large" />;
  }
};

   
return (
  <>
      {fetchedData ? (
          <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                  avatar={
                      <Avatar aria-label="recipe">
                          {fetchedData.receta.autor.nombre[0]}
                      </Avatar>
                  }
                  action={
                      <>
                          <IconButton aria-label="settings" onClick={handleMenuClick}>
                              <MoreVertIcon />
                          </IconButton>
                          
                          <Menu
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleMenuClose}
                          >
                              <MenuItem onClick={handleEditImage}>
                                <ImageIcon fontSize="small" sx={{ mr: 1 }} /> Editar imagen
                              </MenuItem>
                              <MenuItem onClick={handleEditTime}>
                                  <UpdateIcon fontSize="small" sx={{ mr: 1 }} /> Editar tiempo
                              </MenuItem>
                              <MenuItem onClick={handleEditName}>
                                  <BorderColorIcon fontSize="small" sx={{ mr: 1 }} /> Editar nombre
                              </MenuItem>
                          </Menu>
                      </>
                  }
                  title={
                    isEditing ? (
                        <form onSubmit={handleNameSubmit}>
                            <TextField
                                fullWidth
                                value={editedName}
                                onChange={handleNameChange}
                                onBlur={handleNameSubmit}
                            />
                        </form>
                    ) : (
                        <Typography onClick={handleEditName}>
                            {fetchedData.receta.nombre}
                        </Typography>
                    )
                }
                  subheader={fetchedData.receta.autor.nombre}
              />
              <CardMedia
                  sx={{
                      height: 'calc(75vh - 160px)',
                      objectFit: 'cover',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                  }}
                  component="img"
                  height="194"
                  image={fetchedData.receta.imagen || "https://via.placeholder.com/194"}
                  alt={fetchedData.receta.nombre}
              />
              <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                      {fetchedData.receta.likes ? fetchedData.receta.likes.length : 0}
                  </IconButton>
                  <IconButton aria-label="message">            
                      <MessageIcon />
                      {fetchedData.receta.comments ? fetchedData.receta.comments.length : 0}
                  </IconButton>
                  <IconButton onClick={handleSaveRecipe}>
                      {recipeSaved ? <BookmarkAddedIcon fontSize="large"/> : <BookmarkBorderIcon fontSize="large" />}
                  </IconButton>
                  <IconButton aria-label="share">
                      <ShareIcon />
                  </IconButton> 
                  {
                        isEditingTime ? (
                            <form onSubmit={handleTimeSubmit}>
                                <TextField
                                    type="number"
                                    value={editedTime}
                                    onChange={handleTimeChange}
                                    onBlur={handleTimeSubmit}
                                />
                            </form>
                        ) : (
                            <Typography onClick={handleEditTime}>
                                {fetchedData.receta.tiempo} minutos
                            </Typography>
                        )
                    }
                  <Typography variant="h6" component="h8" fontSize="12px" style={{ marginLeft: 'auto' }}>
                      <LocalFireDepartmentIcon /> {fetchedData.receta.totales.kcal}
                  </Typography>
              </CardActions>
              <CardContent>
                  <Typography variant="body2" color="text.secondary">
                      {fetchedData.receta.descripcion}
                  </Typography>
                  {/* Aquí puedes poner más contenido si es necesario */}
              </CardContent>
          </Card>
      ) : (
          <div>Cargando...</div>
      )}
  </>
  )
}
