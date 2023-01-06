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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageIcon from '@mui/icons-material/Message';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRecipeStore } from '../hooks/useRecipeStore';





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
    console.log("Añadido a Favoritos")
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


export default function RecipeReviewCard({nombre, autor}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { startActiveRecipe } = useRecipeStore();

  const handleCardActionAreaClick = () => {
    console.log('Card action area clicked');
    dispatch(startActiveRecipe())
    navigate('/receta')
  };

  const handleAvatarClick = () => {
    console.log("Has pinchado en el avatar");
    
  };


  return (
    
      <Card sx={{ maxWidth: 345 }}>
      
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" onClick={handleAvatarClick}>
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
        <CardActionArea onClick={handleCardActionAreaClick}>
        <CardMedia
          component="img"
          height="194"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcKQZxEQg-EWoF50h2Nk6lLYLL34BBUwi7_7fqsdwBQ&s"
          alt="Paella dish"
        />
        
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
      
      </CardActionArea>
      
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={addFavorite}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={shareRecipe}>
            <ShareIcon />
          </IconButton>  
          <IconButton aria-label="message" onClick={commentCard}>
            <MessageIcon />
          </IconButton>       
        </CardActions>      
      </Card>
    
    
  );
}
