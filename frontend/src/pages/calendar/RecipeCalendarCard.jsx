  // Esta es la nueva CARD
  
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
  import { CardActionArea, Dialog, DialogContent, DialogTitle } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import { useDispatch } from 'react-redux';

  import { useState } from 'react';

  import { useRecipeStore } from '../../hooks/useRecipeStore';
  import DeleteIcon from '@mui/icons-material/Delete';


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
      console.log("Comentando una card!")
  }




  export default function RecipeCalendarCard({nombre, autor, receta, descripcion, likes, comments, deleteRecipe}) {
  

    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const { startActiveRecipe } = useRecipeStore();

    const handleCardActionAreaClick = async() => {    
      console.log("Has pinchado la receta con el otro ID: ", receta._id);
      console.log('Card action area clicked con esta receta', receta); 
      
      // receta._id saco el id
      
      navigate(`/recipe/${receta._id}`);
      //handleClickOpen() ;   
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
            <IconButton aria-label="add to favorites" onClick={addFavorite}>
              <FavoriteIcon />
              {likes}
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
                <DeleteIcon onClick={deleteRecipe}/>
              </IconButton>
              

                      
            </IconButton> 
                          
          </CardActions>      
        </Card>
      
      
    );
  }
