// Rutas /api/createIngredient

import { validacion } from '../middlewares/validator.js';
import { body } from 'express-validator';
import { Router } from 'express';
import { crearIngrediente, actualizarIngrediente, getIngredientes } from '../controllers/ingredientController.js';

// Creamos el objeto Router
const router = Router();

// Rutas para el manejo de ingredientes
router.post('/',
  body('nombre', 'El ingrediente tiene que tener un nombre'),
  body('descripcion', 'La Receta tiene que tener una descripcion'),
  validacion, // middleware que he creado en la carpeta "middlewares"
  crearIngrediente // middleware que redirige al controller
);

router.post('/update',
  body('nombre', 'El ingrediente tiene que tener un nombre'),
  validacion, // middleware que he creado en la carpeta "middlewares"
  actualizarIngrediente // middleware que redirige al controller
);

router.get('/all',
  getIngredientes // middleware que redirige al controller
);

export default router;