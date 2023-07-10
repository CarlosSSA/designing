import { Avatar, Card, CardActionArea, Grid, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Typography, TextField, Button } from '@mui/material';
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




const columns = [  
  { field: 'Ingrediente', headerName: 'Ingredientes', width: 130 },
  { field: 'Cantidad', type:'number', headerName: 'Cantidad', width: 130,description: 'Cantidades en g' },

];


  export const RecipePage = () => {

    // Guardar Receta
    const [recipeSaved, setRecipeSaved] = useState(false); 
    const handleSaveRecipe = () => {
    setRecipeSaved(!recipeSaved); // Actualizar el estado para indicar que la receta ha sido guardada
    if(recipeSaved === true){
      console.log("receta borrada")
    }else
    console.log("receta guardada")
};

  const {startSelectRecipe} = useRecipeStore()
  const {recipeid} = useParams()
  const [fetchedData, setFetchedData] = useState()
 
 
  // Llamada a BBDD para recoger datos de esta receta en concreto
    console.log("el recipeid ", recipeid);
    console.log("Antes de Lanzar el useEffect en la receta, para ver si recibo el id desde los parámetros", recipeid);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await startSelectRecipe(recipeid);
          console.log("el data del padre 2", data);
          return data;
        } catch (error) {
          console.log("error");
        }
      };
      fetchData().then((data) => {
        setFetchedData(data);
      });
    }, []);
    
    console.log("fetchedData", fetchedData);



 const handleCardActionAreaClick = () => {
  console.log("Pinchado");
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
              <div>{fetchedData.receta.autor.nombre[0]}</div>
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleCardActionAreaClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title= {fetchedData.receta.titulo}
          subheader={fetchedData.receta.autor.nombre}
        />

        
        <CardMedia
          sx={{
            height: 'calc(75vh - 160px)', // ajustar altura de imagen
            objectFit: 'cover', // ajustar imagen al contenedor
            borderTopLeftRadius: 8, // agregar borde redondeado a la imagen
            borderTopRightRadius: 8,
          }}
          component="img"
          height="194"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcKQZxEQg-EWoF50h2Nk6lLYLL34BBUwi7_7fqsdwBQ&s"
          alt="Paella dish"          
        />

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => console.log("hola")}>
            <FavoriteIcon />
            {fetchedData.receta.likes ? fetchedData.receta.likes.length : 0}
          </IconButton>
          <IconButton aria-label="message" onClick={() => console.log("hola")}>            
            <MessageIcon />
            {fetchedData.receta.comments ? fetchedData.receta.comments.length : 0}
          </IconButton>
          <IconButton onClick={handleSaveRecipe}>
            {renderBookmarkIcon()}
          </IconButton>
          <IconButton aria-label="share" onClick={() => console.log("hola")}>
            <ShareIcon />
          </IconButton> 
          <Typography variant="h6" component="h8" fontSize="12px" style={{ marginLeft: 'auto' }}>
            <AccessTimeIcon /> 60 minutos
          </Typography> 
          
            <Typography variant="h6" component="h8" fontSize="12px" style={{ marginLeft: 'auto' }}>
            <LocalFireDepartmentIcon />150 kcal
            </Typography>                        
        </CardActions> 
        
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {fetchedData.receta.descripcion}
          </Typography>
          {fetchedData !== null ? (
            <ContenidoCard datos={fetchedData} />
          ) : (
            <p>No hay datos disponibles</p>
          )}
          
        </CardContent>   
           
             
    </Card>
    ) : (
      <div>Cargando...</div>
    )}
    
    
  </>
  )
}
