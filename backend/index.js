import express from 'express';
import { dbConnection } from './database/config';
import cors from 'cors';
import path from 'path';

const app = express();

//Para las variables de entorno
require('dotenv').config()

//Hay que llamar a la conexion del archivo database
dbConnection();

// Parseo del body 1.)Middleware y ya con esto te sale el "body" en el req BIEN
app.use( express.json() );

app.use(cors());

// Rutas => me lo llevo a /routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/recipe', require('./routes/recipesRoutes'))
app.use('/api/createIngredient', require('./routes/ingredientRoute'))
app.use('/api/createComment', require('./routes/commentsRoute'))

// Sirve los archivos estáticos del frontend
app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

// Maneja cualquier otra ruta con la aplicación frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});


// Maneja cualquier solicitud que no coincida con las anteriores


app.listen(process.env.PORT || 4001, ()=>{
    console.log(`Servidor funcionando en puerto ${process.env.PORT}, no pilla nada?`)
})
