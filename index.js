const express = require('express')
const {dbConnection} = require('./database/config')
const cors = require('cors')
const path = require('path');  // Nueva dependencia requerida

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
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Maneja cualquier solicitud que no coincida con las anteriores
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(process.env.PORT || 4001, ()=>{
    console.log(`Servidor funcionando en puerto ${process.env.PORT}`)
})