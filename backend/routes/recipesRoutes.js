// Rutas /api/recipe
const {validacion} = require('../middlewares/validator')
const { body } = require('express-validator');

const {Router} = require('express');
// Creamos el objeto Router
const router = Router();
const { validarJWT } = require('../middlewares/jwt-validator')

const {crearReceta, deleteReceta, recetaIndividual, recetasUsuario, updateReceta, todasRecetas} = require('../controllers/recipeController')

// Todas las recetas de un usuario --OK
router.post('/', 
//[validacion,validarJWT], //middleware que he creado en la carpeta "middlewares"  --> DESCOMENTAR para que valida el JWT, estaba probando
recetasUsuario)  //middleware que redirige al controller

// Receta por ID --OK pero no estoy usando el rid en la url realmente
router.get('/:rid', 
validacion, 
recetaIndividual) 

// Crear una receta nueva -- OK
router.post('/new', 
body('nombre','La Receta tiene que tener un nombre'),
body('autor','La Rececta tiene que tener un autor'),
validacion, 
crearReceta)  

// Update receta
router.put('/:rid', 
body('nombre','La Receta tiene que tener un nombre'),
body('autor','La Rececta tiene que tener un autor'),
validacion, 
updateReceta) 

// Delete receta
router.delete('/:rid', 
body('nombre','La Receta tiene que tener un nombre'),
body('autor','La Rececta tiene que tener un autor'),
validacion, 
deleteReceta)  

// Todas las recetas para la Home
router.get('/', 
validacion, 
todasRecetas) 

 module.exports = router;