// Comment.js
import React, { useState } from 'react';
import { Avatar, CardContent, Grid, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/material';
import { useCommentStore } from '../../hooks/useCommentStore'


// receta debería llevar un receta.comments
const Comentarios = ({ comentario, user }) => { 

  const {startAddLikeComentario} = useCommentStore()

  //comentario = {texto: texto, autor:uid, likes: [uid1,uid2...]}

  console.log("Que me llega en la prop 'comentario' dentro del modulo de Comentario?", comentario, user)

  const [liked, setLiked] = useState(false);
 // const [likeCount, setLikeCount] = useState(receta.likes);

  const handleLike = () => {
   console.log("comentario liked")
   startAddLikeComentario({comentarioID: comentario._id, like: user.uid })
  };

  return (
    <Grid container direction="column" style={{ marginTop: 8 }}>
      <Grid item container alignItems="center" wrap="nowrap">
        <Grid item>
          <Avatar>{comentario.autor.publicaciones}</Avatar>
        </Grid>
        <Grid item xs zeroMinWidth>
          <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Typography variant="subtitle1" component="div" noWrap>
              <strong>{comentario.autor.nombre}</strong>
            </Typography>
          </CardContent>
        </Grid>
        <Grid item>
          <IconButton onClick={handleLike} size="small">
            {liked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="caption" color="text.secondary" component="div">
            {comentario.likes.length} {/* Mostrar el contador de "me gusta" */}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs zeroMinWidth>
        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Typography variant="subtitle1" component="div" style={{ wordWrap: 'break-word' }}>
            {comentario.texto}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default Comentarios;

