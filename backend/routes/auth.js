// Rutas /api/auth

import { validacion } from '../middlewares/validator.js';
import { body } from 'express-validator';
import { validarJWT } from '../middlewares/jwt-validator.js';
import { Router } from 'express';
import {
  crearUsuario,
  updateUserFavs,
  updateUserLikes,
  getRecipeLikedYFavs,
  addRegistroPeso,
  loginUsuario,
  revalidarToken,
  addRecetaCalendario,
  usuarioIndividual,
  updateUsuarioCalendarRecipes,
  updateHarris
} from '../controllers/authController.js';

// Creamos el objeto Router
const router = Router();

// Login Usuario Ruta + Controller
router.post('/',
  body('email', 'El formato de email es incorrecto').isEmail(),
  validacion, // middleware que he creado en la carpeta "middlewares"
  loginUsuario // middleware que redirige al controller
);

// Nuevo Usuario Ruta + Controller
router.post('/new',
  body('nombre', 'El nombre debe contener al menos 5 letras').isLength({ min: 5 }),
  body('email', 'El formato de email es incorrecto').isEmail(),
  validacion,
  crearUsuario
);

router.post('/addRecetaUsuario',
  validacion,
  addRecetaCalendario
);

router.post('/usuarioIndividual', usuarioIndividual);

router.post('/updateUserCalendarRecipes', updateUsuarioCalendarRecipes);

router.post('/updateRegistroPeso', addRegistroPeso);

router.post('/getRecipeLikesYFavs', getRecipeLikedYFavs);

router.post('/updateUserFavs', updateUserFavs);

router.post('/updateUserLikes', updateUserLikes);

router.post('/updateHarris', updateHarris);

// Renew Token JWT Ruta + Controllers --> Esto habría que utilizarlo
router.get('/renew', validarJWT, revalidarToken);

export default router;