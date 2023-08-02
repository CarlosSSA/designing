import express from 'express';
import { dbConnection } from './database/config.js';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import recipesRoutes from './routes/recipesRoutes.js';
import ingredientRoute from './routes/ingredientRoute.js';
import commentsRoute from './routes/commentsRoute.js';

const app = express();

// Para las variables de entorno
dotenv.config();

// Hay que llamar a la conexión del archivo de la base de datos
dbConnection();

// Parseo del body 1.) Middleware y ya con esto te sale el "body" en el req BIEN
app.use(express.json());

app.use(cors());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/recipe', recipesRoutes);
app.use('/api/createIngredient', ingredientRoute);
app.use('/api/createComment', commentsRoute);

// Sirve los archivos estáticos del frontend
const __dirname = path.resolve(); // me da el directorio actual hasta /apprecetasfinal
console.log(`que me devuelve __dirname? ${__dirname}`)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/dist'))); //sirvo los archivos estáticos desde aqui si estamos en produccion
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')); // cualquier ruta get la mando al index para que la maneje React luego
  });
} else {
   // Servir los archivos estáticos en modo de desarrollo
   app.use(express.static(path.join(__dirname, 'frontend/public'))); //si estamos en desarrollo por ejemplo sirvo los archivos estaticos desde aqui
   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'frontend', 'index.html')); // y lo mando a React para que lo maneje
   });
}

app.listen(process.env.PORT || 4001, () => {
  console.log(`Servidor funcionando en puerto ${process.env.PORT}, no pilla nada?`);
});
