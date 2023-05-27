import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageIcon from '@mui/icons-material/Message';
import { CardActionArea, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRecipeStore } from '../hooks/useRecipeStore';
import { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from '@mui/material/Modal';
import "./tarjeta.css"
import BotonCalendario from './BotonCalendario';
import { useEffect } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';





const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const addFavorite = ()=>{
    console.log("Añadido a Liked")
}

const shareRecipe = ()=>{
    console.log("Compartiendo Receta")
}

const cardSettings = ()=>{
    console.log("Accediendo a los settings de la card")
}

const commentCard = ()=>{
    console.log("Comentando una card")
}


export default function RecipeReviewCard({nombre, autor, receta, descripcion, likes, comments}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.auth.user);


useEffect(() => {
  console.log("usuario", usuario)
  console.log("usuario uid", usuario.uid)

 
}, [])

  const { startActiveRecipe, startUpdateUserLikes, startUpdateUserFavs } = useRecipeStore();  

  const handleCardActionAreaClick = async() => {    
    console.log("Has pinchado la receta con el otro ID: ", receta._id);
    console.log('Card action area clicked con esta receta', receta);         
    navigate(`/recipe/${receta._id}`);
    //handleClickOpen() ;   
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

const renderSaveIcon = () => {
  if (recipeSaved) {
    return <BookmarkAddedIcon fontSize="large"/>;
  } else {
    return <BookmarkBorderIcon fontSize="large" />;
  }
};

  // Like Receta
  const [recipeLiked, setrecipeLiked] = useState(false); 

  const handleLikeRecipe = () => {
    setrecipeLiked(!recipeLiked); // Actualizar el estado para indicar que la receta ha sido guardada
  if(recipeLiked === true){
    console.log("receta deslikeada")
  }else
  console.log("receta likeada")
  startUpdateUserLikes(usuario.uid, recipeLiked);
};

const renderLikeIcon = () => {
  if (recipeLiked) {
    return <FavoriteIcon fontSize="large"/>;
  } else {
    return <FavoriteBorderIcon fontSize="large" />;
  }
};

  const handleAvatarClick = () => {
    console.log("Has pinchado en el avatar");
    
    
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // lo nuevo del calendario  

  const [fecha, setFecha] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleCalendarClick = () => {
    console.log("Has pinchado en el calendario");
  };
 

  const handleDateChange = (event) => {
    setFecha(event.target.value);
  };

  const handleCloseCalendar = () => {
    setOpenCalendar(false);
  };

  const handleBackgroundClick = () => {
    // Cerrar el modal
    setOpen(false);
  }



  


  return (
    
      <Card sx={{ maxWidth: 345 }}>
      
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" onClick={handleClickOpen}>
              A
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={cardSettings}>
              <MoreVertIcon />
            </IconButton>
          }
          title= {nombre}
          subheader={autor}
        />
        <CardActionArea onClick={handleCardActionAreaClick }>
        <CardMedia
          component="img"
          height="194"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcKQZxEQg-EWoF50h2Nk6lLYLL34BBUwi7_7fqsdwBQ&s"
          alt="Paella dish"
        />
        
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {descripcion}
          </Typography>
        </CardContent>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{nombre}</DialogTitle>
                <DialogContent>
                <Typography variant="body2" color="text.secondary">
                  {descripcion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 Autor:{autor}
                </Typography>
                </DialogContent>
        </Dialog>
      
      </CardActionArea>
      
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleLikeRecipe}>
            {renderLikeIcon()}
            {likes}
          </IconButton>
          <IconButton onClick={handleSaveRecipe} >
            {renderSaveIcon()}
          </IconButton>
          <IconButton aria-label="message" onClick={commentCard}>            
            <MessageIcon />
            {comments}
          </IconButton>
          <IconButton aria-label="share" onClick={shareRecipe}>
            <ShareIcon />
          </IconButton> 

          <IconButton aria-label="calendar">    
           

          <IconButton aria-label="calendar">
            
              <BotonCalendario recetaID = {receta._id} autorID = {usuario.uid}/>
          </IconButton>
            <input type="date" id="date-picker" onChange={handleDateChange} style={{ display: "none" }} />
                    
          </IconButton> 
                         
        </CardActions>      
      </Card>
    
    
  );
}
