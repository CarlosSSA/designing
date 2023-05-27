// Comment.js
import React, { useState } from 'react';
import { Avatar, CardContent, Grid, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Comment = ({ author, content, likes }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Grid container alignItems="center" style={{ marginTop: 8 }}>
      <Grid item style={{ marginBottom: 8 }}>
        <Avatar>{author[0]}</Avatar>
      </Grid>
      <Grid item xs>
        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Typography variant="subtitle1" component="div">
            <strong>{author}</strong> {content}
          </Typography>
        </CardContent>
      </Grid>
      <Grid item>
        <IconButton onClick={handleLike} size="small">
          {liked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="caption" color="text.secondary" component="div">
          {likeCount} {/* Mostrar el contador de "me gusta" */}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Comment;

