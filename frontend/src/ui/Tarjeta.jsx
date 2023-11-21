import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageIcon from '@mui/icons-material/Message';
import { CardActionArea, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRecipeStore } from '../hooks/useRecipeStore';
import { useAuthStore } from '../hooks/useAuthStore';
import { useState, useEffect } from 'react';
import "./tarjeta.css"
import BotonCalendario from './BotonCalendario';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { onLikeRecipe } from '../store/auth/authSlice';



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


export default function RecipeReviewCard({usuario,userFavRecipes,setUserFavRecipes, userLikedRecipes, setUserLikedRecipes, nombre, autor, receta, descripcion, likes, comments}) {

const navigate = useNavigate();
const dispatch = useDispatch();



const { startUpdateRecipeLikes } = useRecipeStore(); 
const {startUpdateUserLikes, startUpdateUserFavs} = useAuthStore(); 

const [likesReceta, setLikesReceta] = useState(receta.likes); // [u1,u2,u3] guardo los usuarios  
const [recipeLiked, setRecipeLiked] = useState(false); // La tiene en su lista
const [recipeSaved, setRecipeSaved] = useState(false); // La tiene en su lista

//esto hay que moverlo al elemento padre


const handleCardActionAreaClick = async() => {    
  console.log("Has pinchado la receta con el otro ID: ", receta._id);
  console.log('Card action area clicked con esta receta', receta);         
  navigate(`/recipe/${receta._id}`);
  //handleClickOpen() ;   
};


useEffect(() => {

  console.log("xD: user REcipeLikes", userLikedRecipes)
  console.log("xD: Array.isArray(userLikedRecipes)", Array.isArray(userLikedRecipes))
  console.log("xD: receta._id.toString()", receta._id.toString())
  console.log("xD: userLikedRecipes.includes(receta._id.toString())", userLikedRecipes.includes(receta._id.toString()))
  console.log("xD: typeof(receta._id.toString()))", typeof(receta._id.toString()))
  console.log("xD: typeof(userLikedRecipes))", typeof(userLikedRecipes))
  console.log("xD: typeof(receta._id))", typeof(receta._id))
  console.log("xD: receta._id)", receta._id)
  console.log("xD: typeof(receta))", typeof(receta))
  console.log("xD: typeof(receta))", receta)
  console.log("xD: typeof(usuario))", usuario)
  console.log("xD: typeof(usuario.likedRecipes))", typeof(usuario.likedRecipes))


  // Esto es el [rid,rid] del usuario a nivel Home - Likes
  if (userLikedRecipes && Array.isArray(userLikedRecipes) && userLikedRecipes.includes(receta._id)) {
    setRecipeLiked(true)
    console.log(` La receta ${receta._id} está dentro del array del usuario`)
  }

  // Esto es el [rid,rid] del usuario a nivel Home - Favs
  if (userFavRecipes && Array.isArray(userFavRecipes) && userFavRecipes.includes(receta._id)) {
    setRecipeSaved(true);  
    console.log(` La receta ${receta._id} NO está dentro del array del usuario`)    
  }
 
  console.log("TARJETA: que recibo en la prop receta?", receta)
  console.log("TARJETA:y en la prop usuario?", usuario)
  console.log("TARJETA:como interpreta esto el receta._id?", String(receta._id))
  console.log("TARJETA: Typeof normal", typeof receta._id)
  console.log("TARJETA: Typeof stringed", typeof String(receta._id))
  console.log("y en userlikedrecipes?", userLikedRecipes)
  console.log("TARJETA: y el receta.likes?", receta.likes)
  console.log("Cual es el estado de likes de esta receta?", recipeLiked)
  console.log(` check check: receta_id: ${receta._id} y userLikedRecipes: ${userLikedRecipes} y el estado recipeLiked es ${recipeLiked} `)
  
  console.log("y el typeof de la receta??", typeof receta._id);

  // Esto no se para que lo hago, lo necesito?
  userLikedRecipes.forEach(item => {
    console.log("y el typeof de userLikedRecipes??", typeof item); // Tipo básico
    console.log(Object.prototype.toString.call(item)); // Tipo detallado
});

  // setLikesReceta(receta.likes) esto hace falta?
  setLikesReceta(receta.likes);

// compruebo si la receta ha sido likeada
 
}, []) 


useEffect(() => {
  console.log("Ha cambiado RECIPELIKEDDDD", recipeLiked)
  console.log("Ha cambiado RECIPELIKEDDDD en el card:id", receta._id)

 
}, [recipeLiked])


 const handleSaveRecipe = async() => {   

// Si ya la tiene se la borro
 if (userFavRecipes.includes(receta._id)) {
  
    setUserFavRecipes(userFavRecipes.filter(id => id !== receta._id));      
    setRecipeSaved(false);
    console.log("receta des");
    
    // Actualizar likes en la BBDD
    await startUpdateUserFavs({uid: usuario._id, favRecipe: receta._id});  
    console.log(`me aseguro que mando los datos bien, estaba en el save: uid:${usuario._id} + favRecipe: ${receta._id}`); 
          
  } else {
    // Si la receta no está en la lista, la añadimos
    setUserFavRecipes(estadoPrevio => [...estadoPrevio, receta._id]);
    setRecipeSaved(true);
    console.log("FAV NUEVO: receta favved");     

    // Actualizar likes en la BBDD 
    await startUpdateUserFavs({uid: usuario._id, favRecipe: receta._id});
    console.log(`me aseguro que mando los datos bien, no estaba en el save: uid:${usuario._id} + favRecipe: ${receta._id}`); 
    
    
  }
};


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
    setLikesReceta(likesReceta.filter(id => id !== usuario._id))
    setRecipeLiked(false);
    dispatch(onLikeRecipe(receta._id));
    console.log("receta deslikeada");
    console.log(`me aseguro que mando los datos del like bien, sí estaba en el like: uid:${usuario._id} + likedRecipe: ${receta._id}`); 

    // Actualizar likes en la BBDD
    await startUpdateUserLikes({uid: usuario._id, likedRecipe:  receta._id});
    await startUpdateRecipeLikes({rid:receta._id, userLike: usuario._id}); 
    
    
          
  } else {
    // Si la receta no está en la lista, la añadimos
    setUserLikedRecipes(estadoPrevio => [...estadoPrevio, receta._id]);
    setLikesReceta(prevState => [...prevState, usuario._id])
    setRecipeLiked(true);
    dispatch(onLikeRecipe(receta._id));
    console.log("LIKE NUEVO: receta likeada");
    console.log("LIKE NUEVO: estoy mandando este rid", receta._id);
    console.log(`LIKE NUEVO: que mando en recipeLikes? ${likesReceta} y que uid tengo? ${usuario._id} y en receta.likes? ${receta.likes} y en receta? ${JSON.stringify(receta.likes)}`);
    console.log(`me aseguro que mando los datos del like bien, no estaba en el like: uid:${usuario._id} + likedRecipe: ${receta._id}`); 


    // Actualizar likes en la BBDD
    await startUpdateUserLikes({uid: usuario._id, likedRecipe: receta._id});
    await startUpdateRecipeLikes({rid:receta._id, userLike: usuario._id}); 
    
    
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

const handleDateChange = (event) => {
  setFecha(event.target.value);
};


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
        image={receta.imagenURL}
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
          {recipeLiked ? <FavoriteIcon fontSize="large"/>
           : <FavoriteBorderIcon fontSize="large" />}
          {receta.likes.length}
      </IconButton>

      <IconButton onClick={handleSaveRecipe}>
          {recipeSaved ? <BookmarkAddedIcon fontSize="large"/>
           : <BookmarkBorderIcon fontSize="large" />}
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
          
            <BotonCalendario recetaID = {receta._id} autorID = {usuario._id}/>
        </IconButton>
          <input type="date" id="date-picker" onChange={handleDateChange} style={{ display: "none" }} />
                  
        </IconButton> 
                       
      </CardActions>      
    </Card>
  
  
);
}
