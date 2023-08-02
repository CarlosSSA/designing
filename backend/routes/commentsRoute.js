// Rutas /api/createComment

import { validacion } from '../middlewares/validator.js';
import { body } from 'express-validator';
import { Router } from 'express';
import { crearComentario, addLikeComentario } from '../controllers/commentController.js';

// Creamos el objeto Router
const router = Router();

// Login Usuario Ruta + Controller
router.post('/',
  body('autor', 'El comentario tiene que tener un autor'),
  body('texto', 'El comentario tiene que tener un texto'),
  validacion, // middleware que he creado en la carpeta "middlewares"
  crearComentario // middleware que redirige al controller
);

router.post('/addLikeComentario', addLikeComentario);

export default router;


addLikeComentario