// Rutas /api/auth
const {validacion} = require('../middlewares/validator')
const { body } = require('express-validator');
const {validarJWT} = require('../middlewares/jwt-validator')

const {Router} = require('express');
// Creamos el objeto Router
const router = Router();

const {crearUsuario, updateUserFavs, updateUserLikes, getRecipeLikedYFavs, addRegistroPeso, loginUsuario, revalidarToken, addRecetaCalendario, usuarioIndividual, updateUsuarioCalendarRecipes} = require('../controllers/authController')

// Login Usuario Ruta + Controller
router.post('/', 
body('email','El formato de email es incorrecto').isEmail(),
validacion, //middleware que he creado en la carpeta "middlewares"
loginUsuario)  //middleware que redirige al controller

 // Nuevo Usuario Ruta + Controller
 // Le pasas todos los middlewares que quieras --> validas los errores con validationResult en el controller, para que te diga qué hacer con el error

router.post('/new',
body('nombre','El nombre debe contener al menos 5 letras').isLength({ min: 5 }),
body('email','El formato de email es incorrecto').isEmail(),
validacion,
crearUsuario);

router.post('/addRecetaUsuario',
validacion,
addRecetaCalendario);

router.post('/usuarioIndividual',
usuarioIndividual);

router.post('/updateUserCalendarRecipes',
updateUsuarioCalendarRecipes);

router.post('/updateRegistroPeso',
addRegistroPeso);

router.post('/getRecipeLikesYFavs',
getRecipeLikedYFavs);

router.post('/updateUserFavs',
updateUserFavs);

router.post('/updateUserLikes',
updateUserLikes);

 // Renew Token JWT Ruta + Controllers --> Esto habría que utilizarlo
 router.get('/renew',validarJWT, revalidarToken)

 module.exports = router;