// Custom Middleware de express validator para mostrar los errores

// Como va? 1) Creas este middleware para que lo llame la ruta para que sepa que hacer en cada caso de error
// 2) Lo metes en la ruta que quieras, perimero metes los middlewares de errores y luego este de notificacion

const { validationResult } = require('express-validator');

const validacion = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {      
        return res.status(400).json({ errors: errors.array() });
      }
    next();
}


 module.exports = {validacion}


 /*
Proceso para hacer validaciones con express-validator:
1) creas en un archivo aparte si quieres un custom para manejar el validationResult, si no lo pones a mano en el controlador
2) en las rutas metes todos los parámetros para que SALTEN los errores
3) aquí manejas LO QUE RESPONDES desde el server al error
*/