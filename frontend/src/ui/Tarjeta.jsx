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
import { useAuthStore } from '../hooks/useAuthStore';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from '@mui/material/Modal';
import "./tarjeta.css"
import BotonCalendario from './BotonCalendario';
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

// que hacia recipeLikedList y setRecipeLikedList?

export default function RecipeReviewCard({usuario,userFavRecipes,setUserFavRecipes, userLikedRecipes, setUserLikedRecipes, nombre, autor, receta, descripcion, likes, comments}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { startUpdateRecipeLikes, startUpdateLikesRecetaPost, startGetRecipePost } = useRecipeStore(); 
  const {startUpdateUserLikes, startUpdateUserFavs} = useAuthStore(); 

  const [likesReceta, setLikesReceta] = useState(receta.likes); // [u1,u2,u3] guardo los usuarios  
  const [recipeLiked, setRecipeLiked] = useState(false); // Flag para activar los Hooks
  const [recipeSaved, setRecipeSaved] = useState(false);
  
  //esto hay que moverlo al elemento padre


  const handleCardActionAreaClick = async() => {    
    console.log("Has pinchado la receta con el otro ID: ", receta._id);
    console.log('Card action area clicked con esta receta', receta);         
    navigate(`/recipe/${receta._id}`);
    //handleClickOpen() ;   
  };
 

  useEffect(() => {
   
    console.log("TARJETA: que recibo en la prop receta?", receta)
    console.log("TARJETA:y en la prop usuario?", usuario)
    console.log("TARJETA:como interpreta esto el receta._id?", String(receta._id))
    console.log("TARJETA: Typeof normal", typeof receta._id)
    console.log("TARJETA: Typeof stringed", typeof String(receta._id))

    console.log("TARJETA: y el receta.likes?", receta.likes)
    // setLikesReceta(receta.likes) esto hace falta?
    setLikesReceta(receta.likes);

  // compruebo si la receta ha sido likeada
  if (userLikedRecipes && Array.isArray(userLikedRecipes) && userLikedRecipes.includes(receta._id)) {
    setRecipeLiked(true)
  }

  if (userFavRecipes && Array.isArray(userFavRecipes) && userFavRecipes.includes(receta._id)) {
    setRecipeSaved(true);      
  }
   
  }, [])


     //CLICK SAVE AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

   

   const handleSaveRecipe = async() => {   

  // Si ya la tiene se la borro
   if (userFavRecipes.includes(receta._id)) {
    
      setUserFavRecipes(userFavRecipes.filter(id => id !== receta._id));      
      setRecipeSaved(false);
      console.log("receta des");
      
      // Actualizar likes en la BBDD
      await startUpdateUserFavs({uid: usuario.uid, favRecipe: receta._id});  
      console.log(`me aseguro que mando los datos bien, estaba en el save: uid:${usuario.uid} + favRecipe: ${receta._id}`); 
            
    } else {
      // Si la receta no está en la lista, la añadimos
      setUserFavRecipes(estadoPrevio => [...estadoPrevio, receta._id]);
      setRecipeSaved(true);
      console.log("FAV NUEVO: receta favved");     

      // Actualizar likes en la BBDD 
      await startUpdateUserFavs({uid: usuario.uid, favRecipe: receta._id});
      console.log(`me aseguro que mando los datos bien, no estaba en el save: uid:${usuario.uid} + favRecipe: ${receta._id}`); 
      
      
    }
};

const renderSaveIcon = () => {
  if (recipeSaved) {
    return <BookmarkAddedIcon fontSize="large"/>;
  } else {
    return <BookmarkBorderIcon fontSize="large" />;
  }
};
  
const renderLikeIcon = () => {
  if (recipeLiked) {
    return <FavoriteIcon fontSize="large"/>;
  } else {
    return <FavoriteBorderIcon fontSize="large" />;
  }
};

  //CLICK LIKE

  const handleLikeRecipe = async() => {
    
    console.log("LIKE CLICK: Has pinchado en la receta", receta)
    console.log("LIKE CLICK: Que usuario mantendo? con uid", usuario.uid)
    console.log("LIKE CLICK: Que usuario mantendo? con _id", usuario._id)
    console.log("LIKE CLICK: Que receta mantendo? con rid", receta.rid)
    console.log("LIKE CLICK: Que receta mantendo? con _id", receta._id)
    console.log("Que tengo en el estado, debería ser receta.likes", receta.likes)

    // Comprobar si la rid ya está en la lista de recetas que te gustan
    if (userLikedRecipes.includes(receta._id)) {
    
      setUserLikedRecipes(userLikedRecipes.filter(id => id !== receta._id));
      setLikesReceta(likesReceta.filter(id => id !== usuario.uid))
      setRecipeLiked(false);
      console.log("receta deslikeada");
      console.log(`me aseguro que mando los datos del like bien, sí estaba en el like: uid:${usuario.uid} + likedRecipe: ${receta._id}`); 

      // Actualizar likes en la BBDD
      await startUpdateUserLikes({uid: usuario.uid, likedRecipe:  receta._id});
      await startUpdateRecipeLikes({rid:receta._id, userLike: usuario.uid}); 
      
      
            
    } else {
      // Si la receta no está en la lista, la añadimos
      setUserLikedRecipes(estadoPrevio => [...estadoPrevio, receta._id]);
      setLikesReceta(prevState => [...prevState, usuario.uid])
      setRecipeLiked(true);
      console.log("LIKE NUEVO: receta likeada");
      console.log("LIKE NUEVO: estoy mandando este rid", receta._id);
      console.log(`LIKE NUEVO: que mando en recipeLikes? ${likesReceta} y que uid tengo? ${usuario.uid} y en receta.likes? ${receta.likes} y en receta? ${JSON.stringify(receta.likes)}`);
      console.log(`me aseguro que mando los datos del like bien, no estaba en el like: uid:${usuario.uid} + likedRecipe: ${receta._id}`); 


      // Actualizar likes en la BBDD
      await startUpdateUserLikes({uid: usuario.uid, likedRecipe: receta._id});
      await startUpdateRecipeLikes({rid:receta._id, userLike: usuario.uid}); 
      
      
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
            {receta.likes.length}
          </IconButton>
          <IconButton onClick={handleSaveRecipe} >
            {renderSaveIcon()}
          </IconButton>
          <IconButton aria-label="message" onClick={commentCard}>            
            <MessageIcon onClick={handleCardActionAreaClick} />
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
