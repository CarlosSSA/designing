import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from '../../ui/NavBar.jsx'
import RecipeReviewCard from '../../ui/Tarjeta.jsx'


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [
  {
      "_id": "639c5d6694a22a28d4d4d696",
      "nombre": "Huevos con Papa",
      "autor": "638389059828e7eb2e0c14ba",
      "ingredientes": [
          {
              "ingrediente": "638109f47ef4db1713b09133",
              "cantidad": 200,
              "_id": "639c5d6694a22a28d4d4d697"
          },
          {
              "ingrediente": "63810a897ef4db1713b09135",
              "cantidad": 50,
              "_id": "639c5d6694a22a28d4d4d698"
          }
      ],
      "likes": 20,
      "comments": 15,
      "__v": 0
  },
  {
      "_id": "639c5d6c94a22a28d4d4d6a0",
      "nombre": "Huevos con Papa 2",
      "autor": "638389059828e7eb2e0c14ba",
      "ingredientes": [
          {
              "ingrediente": "638109f47ef4db1713b09133",
              "cantidad": 200,
              "_id": "639c5d6c94a22a28d4d4d6a1"
          },
          {
              "ingrediente": "63810a897ef4db1713b09135",
              "cantidad": 50,
              "_id": "639c5d6c94a22a28d4d4d6a2"
          }
      ],
      "likes": 20,
      "comments": 15,
      "__v": 0
  },
  {
      "_id": "639c5d7094a22a28d4d4d6aa",
      "nombre": "Huevos con Papa 3",
      "autor": "638389059828e7eb2e0c14ba",
      "ingredientes": [
          {
              "ingrediente": "638109f47ef4db1713b09133",
              "cantidad": 200,
              "_id": "639c5d7094a22a28d4d4d6ab"
          },
          {
              "ingrediente": "63810a897ef4db1713b09135",
              "cantidad": 50,
              "_id": "639c5d7094a22a28d4d4d6ac"
          }
      ],
      "likes": 20,
      "comments": 15,
      "__v": 0
  }
]; 

// Hacer una llamada y filtrar las ultimas 20 recetas por fecha

const theme = createTheme();

export default function Album() { 
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PrimarySearchAppBar/>        
      <main>
        {/* Hero unit */}
     
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={6}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4} >
                <RecipeReviewCard nombre={card.nombre} autor = {card.autor} receta = {card}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}