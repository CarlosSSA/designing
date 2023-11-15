// Rutas /api/recipe
import { validacion } from '../middlewares/validator.js';
import { body } from 'express-validator';
import { Router } from 'express';
import { validarJWT } from '../middlewares/jwt-validator.js';
import {
  updateRecipeComments,
  crearReceta,
  getRecetaIndividualPost,
  updateRecetaIndividualPost,
  deleteReceta,
  recetaIndividual,
  recetasUsuario,
  updateReceta,
  todasRecetas,
  updateRecipeLikes,
  updateRecipeSteps,
  getRecetaByName,
  searchByIngredientName,
  updateRecipeName,
  updateRecipeTime
} from '../controllers/recipeController.js';

// Creamos el objeto Router
const router = Router();

// Todas las recetas de un usuario
router.post('/', recetasUsuario);

// Receta por ID
router.get('/:rid', validacion, recetaIndividual);

// Crear una receta nueva
router.post('/new',
  body('nombre', 'La Receta tiene que tener un nombre'),
  body('autor', 'La Rececta tiene que tener un autor'),
  validacion,
  crearReceta);

// Update receta
router.put('/:rid',
  body('nombre', 'La Receta tiene que tener un nombre'),
  body('autor', 'La Rececta tiene que tener un autor'),
  validacion,
  updateReceta);

// Delete receta
router.delete('/:rid',
  body('nombre', 'La Receta tiene que tener un nombre'),
  body('autor', 'La Rececta tiene que tener un autor'),
  validacion,
  deleteReceta);

// Todas las recetas para la Home
router.get('/', validacion, todasRecetas);
router.post('/getRecetaByName', getRecetaByName);

router.post('/updateRecipeLikes', updateRecipeLikes);
router.post('/updateRecetaIndividualPost', updateRecetaIndividualPost);
router.post('/getRecetaIndividualPost', getRecetaIndividualPost);
router.post('/updateRecipeComments', updateRecipeComments);
router.post('/updateRecipeSteps', updateRecipeSteps);
router.post('/searchByIngredientName', searchByIngredientName);
router.post('/updateRecipeName', updateRecipeName);
router.post('/updateRecipeTime', updateRecipeTime);

export default router