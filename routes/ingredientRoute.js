// Rutas /api/createIngredient

const {validacion} = require('../middlewares/validator')
const { body } = require('express-validator');

const {Router} = require('express');
// Creamos el objeto Router
const router = Router();

const {crearIngrediente, actualizarIngrediente, getIngredientes} = require('../controllers/ingredientController')

// Login Usuario Ruta + Controller
router.post('/', 
body('nombre','El ingrediente tiene que tener un nombre'),
body('descripcion','La Receta tiene que tener una descripcion'),
validacion, //middleware que he creado en la carpeta "middlewares"
crearIngrediente)  //middleware que redirige al controller

router.post('/update', 
body('nombre','El ingrediente tiene que tener un nombre'),
validacion, //middleware que he creado en la carpeta "middlewares"
actualizarIngrediente)  //middleware que redirige al controller

router.get('/all', 
 //middleware que he creado en la carpeta "middlewares"
getIngredientes)  //middleware que redirige al controller

 module.exports = router;