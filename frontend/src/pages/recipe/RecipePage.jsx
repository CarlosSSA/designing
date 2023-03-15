import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
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
import { Cell, PieChart, Pie , Tooltip, LineChart, Line ,RadarChart , PolarGrid, PolarAngleAxis,PolarRadiusAxis, Radar, Legend, ResponsiveContainer   } from 'recharts';
import './recipePage.css'
import { DataGrid } from '@mui/x-data-grid';

//dummy data
let data01 = {}

const COLORS = ['#FFC300','#FF5733','#C70039']



//dummy data

const columns = [  
  { field: 'Ingrediente', headerName: 'Ingredientes', width: 130 },
  { field: 'Cantidad', type:'number', headerName: 'Cantidad', width: 130,description: 'Cantidades en g' },

];



  export const RecipePage = () => {

 const {startSelectRecipe} = useRecipeStore()
 const {recipeid} = useParams()
 const [data, setData] = useState({})
 
  // Llamada a BBDD para recoger datos de esta receta en concreto

console.log("antes del useeffect", recipeid);
 useEffect(() => {
   const fetchData = async() =>{
    try {
      const data = await startSelectRecipe(recipeid)
      setData(data);
    } catch (error) {
      console.log(error);
    }
    
   } 
   fetchData()
 }, [])

 const handleCardActionAreaClick = () => {
  console.log("Pinchado");
 }

 const [open, setOpen] = useState(false);

 const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
 };
 
 
  console.log("lo que me llega del hook!", data);
 
 
 

   // construir la pagina, meterle los valores nutricionales, la lista de ing y el boton de ADD y EDIt

   // investigar como meter imagenes, va con multer
    // hacer una subida a git si eso xD
    // Hacer el listado de recetas

   let rows;
   if (data.receta) {
    
    data01 = [{
      "name": "Proteinas",
      "value": data.receta.totales.proteinas,
    },
    {
      "name": "Hidratos",
      "value": data.receta.totales.hcs,
    },
    {
      "name": "Grasas",
      "value": data.receta.totales.grasas,
    },
  ]



     rows = data.receta.ingredientes.map(ing => {
      return(
        {
          id:ing.ingrediente._id,
          Ingrediente:ing.ingrediente.nombre,
          Cantidad:ing.cantidad
        }
      )
    })

   

      console.log("rower");
      console.log("totales",data01 );
   } 
   /*data01 = [
    {
      "name": "Proteinas",
      "value": 400
    },
    {
      "name": "Hidratos",
      "value": 300
    },
    {
      "name": "Grasas",
      "value": 300
    },
    
  ];
  */
   
   


  return (
    <>
    {data.receta ? (      
      <Card sx={{ maxWidth: 345 }}>
              
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" onClick={handleClickOpen}>
              <div>{data.receta.autor.nombre[0]}</div>
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleCardActionAreaClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title= {data.receta.titulo}
          subheader={data.receta.autor.nombre}
        />
        <CardActionArea onClick={handleCardActionAreaClick }>
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
        
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {data.receta.descripcion}
          </Typography>
        </CardContent>
        <CardContent className="card-content" >                

          <PieChart width={730} height={150}>
            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={20} outerRadius={75} fill="#8884d8">
            {data01.map((entrada,index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
              
            </Pie>  
            <Tooltip />
          </PieChart>       
          
        </CardContent> 
        <CardContent>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
       </div>
        </CardContent> 
              
      
      </CardActionArea>
      
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleCardActionAreaClick}>
            <FavoriteIcon />
            {data.likes ? data.likes.length : 0}
          </IconButton>
          <IconButton aria-label="message" onClick={handleCardActionAreaClick}>            
            <MessageIcon />
            {data.comments ? data.comments.length : 0}
          </IconButton>
          <IconButton aria-label="share" onClick={handleCardActionAreaClick}>
            <ShareIcon />
          </IconButton>                  
        </CardActions>      
      </Card>
    ) : (
      <div>Cargando...</div>
    )}
  </>
  )
}
