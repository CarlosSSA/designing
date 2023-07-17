const express = require('express')
const {dbConnection} = require('./database/config')
const cors = require('cors')

const app = express();

// CORS
//app.use(cors({})); // ojo con esto que está abierto a to kiski
//app.use(cors());

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

// Directorio Público

app.use(express.static('public'));

app.listen(process.env.PORT || 4001, ()=>{

    console.log(`Servidor funcionando en puerto ${process.env.PORT}`)
})  