// Rutas /api/createComment

const {validacion} = require('../middlewares/validator')
const { body } = require('express-validator');

const {Router} = require('express');
// Creamos el objeto Router
const router = Router();

const { crearComentario, addLikeComentario } = require('../controllers/commentController')

// Login Usuario Ruta + Controller
router.post('/', 
body('autor','El comentario tiene que tener un autor'),
body('texto','El comentario tiene que tener un texto'),
validacion, //middleware que he creado en la carpeta "middlewares"
crearComentario)  //middleware que redirige al controller

router.post('/addLikeComentario', 
addLikeComentario)  

module.exports = router;


addLikeComentario