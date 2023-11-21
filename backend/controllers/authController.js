import Usuario from '../database/models/userModel.js';
import Receta from '../database/models/recipeModel.js'
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/jwt.js';

//Este lleva el validationResult aqui mismo, el de login lo lleva en un middleware chulo :)
const crearUsuario = async (req, res) => {
  const { nombre, email, password, socialLogin, googleID } = req.body;
  
  let usuario = await Usuario.findOne({ email });

  if (usuario) {
    return res.status(400).json({
      ok: false,
      mensaje: "El usuario ya existe"
    });
  }
  
  usuario = new Usuario(req.body);

  // Si no existe usuario, le pone un googleID o una password según
  if (socialLogin) {
    usuario.googleID = googleID;
  } else {
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
  }

  try {
    await usuario.save();
    const token = await generarJWT(usuario._id, nombre);
    
    res.status(201).json({
      ok: true,
      uid: usuario._id,
      nombre,
      email,
      token
    });
    
  } catch (error) {
    console.error("Ha habido un error creando al usuario", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Error creando usuario",
      error: error.message
    });
  }
}

const loginUsuario = async (req, res) => {
  const { email, password, socialLogin } = req.body;
  
  try {
    let usuario = await Usuario.findOne({ email });

    // Si no encuentra usuario hace uno con email y socialLogin (doble funcionalidad)
    if (!usuario) {
      if (socialLogin) {
        req.body.email = email; 
        return crearUsuario({email, socialLogin});
      } else {
        return res.status(400).json({
          ok: false,
          msg: 'El usuario no existe con ese email'
        });
      }
    }

    // Existe el usuario y viene de form normal
    if (!socialLogin && usuario) {
      const comparacion = bcrypt.compareSync(password, usuario.password);
      
      if (!comparacion) {
        return res.status(400).json({
          ok: false,
          msg: "La password no es correcta"
        });
      }
    }
    
    const token = await generarJWT(usuario._id, usuario.nombre);

    res.json({
      ok: true,
      uid: usuario._id,
      name: usuario.nombre,
      token,
      usuario,
      msg: "Se ha logeado al usuario correctamente"
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Algo ha fallado tratando de logear al usuario',
      error: error.message
    });
  }
}

  
 
// Se supone que lo cogemos asi? Se supone que lo que viene del middleware es req.uid = uid + req.name = name;

 const revalidarToken = async(req,res) => {

    const uid = req.userID
    const name = req.username

    // Ya con esto generamos un token facilmente, ya que ya tenemos el userID y el nombre para generar uno nuevo :)

    const token = await generarJWT(uid,name)
  
    res.json({
     ok: true,
     mensaje: "renew JWT",
     uid,
     name,
     token
    }) 
 }

 // Esto depurarlo porque está mal fijo

 const addRecetaCalendario = async (req,res) => {
    // recibo lo que me llega del Hook
    const {recipeid,uid, fecha} = req.body
   
    let usuario = await Usuario.findOne({_id:uid})
    usuario.calendarRecipes = [...usuario.calendarRecipes, {receta:recipeid,fecha}]
         
     if (usuario) {
      console.log(`El usuario ${uid} fue localizado para actualizar su calendar recipes`);
      console.log(`el recipeid ${recipeid} fue localizado para actualizar su calendar recipes`);
      console.log(`La fecha ${fecha} fue localizado para actualizar su calendar recipes`);
      console.log(`El usuario ${usuario} fue localizado para actualizar su calendar recipes`);
      console.log("Asi es como queda el usuario ahora " + usuario )
      usuario.save();
      
   
      res.status(200).json({
        ok: true,
        mensaje: "Actualizada una receta en el calendario para el usuario " 
      });

    } else {
      res.status(404).json({
        ok: false,
        mensaje: "No se encontró ningún usuario con el UID especificado y la fecha de calendario especificada."
      });
    }

 }

 const usuarioIndividual = async (req,res) => {

  const {uid} = req.body   //id usuario desde el Store   
  const usuario = await Usuario.findById(uid)
  .populate({
    path: 'recetas',
    populate: {
      path: 'autor'
    }
  })
  .populate({
    path: 'likedRecipes',
    populate: {
      path: 'autor'
    }
  })
  .populate({
    path: 'favRecipes',
    populate: {
      path: 'autor'
    }
  })
  .populate('calendarRecipes.receta');        
        
  console.log("Usuario que encuentro por id", usuario);
   // Esto te devuelve el array con todas las recetas del usuario      

     res.status(201).json({
        ok: true,
        mensaje: "Encontrado el Usuario",
        usuario                
      }) 
}

const updateUsuarioCalendarRecipes = async (req,res) => {

  const {uid, userRecipes} = req.body   //id usuario desde el Store  
  
  
  
     try {
      let usuario = await Usuario.findOneAndUpdate({_id:uid}, {calendarRecipes: userRecipes});

      console.log("Usuario que updateo!", usuario);
      console.log("que recibo como uid", uid);
      console.log("que recibo como recetas", userRecipes);

    res.status(201).json({
      ok: true,
      mensaje: "Encontrado el Usuario y updateado",
      usuario                
    }) 
    
   } catch (error) {
    console.log(error)

    res.status(404).json({
      ok: false,
      mensaje: "No se pudo actualizar las Calendar Recipes del usuario"              
    }) 
   }     
  
   // Esto te devuelve el array con todas las recetas del usuario      

     
}

const getUsuarioCalendarRecipes = async (req,res) => {

  const { uid } = req.body; //id usuario desde el Store    

  try {
    // Encuentra el usuario por el id y popular la receta y luego los ingredientes
    let usuario = await Usuario.findOne({_id: uid})
      .populate({
        path: 'calendarRecipes.receta',
        model: 'Receta', // Asegúrate de cambiar 'Receta' por el nombre de tu modelo de recetas si es diferente.
        populate: {
          path: 'ingredientes.ingrediente',
          model: 'Ingrediente' // Cambia 'Ingrediente' por el nombre de tu modelo de ingredientes si es diferente.
        }
      });

    console.log("Usuario que updateo!", usuario);
    console.log("que recibo como uid", uid);

    res.status(201).json({
      ok: true,
      mensaje: "Encontrado el Usuario y updateado",
      usuario                
    }); 

  } catch (error) {
    console.error(error);

    res.status(404).json({
      ok: false,
      mensaje: "No se pudo actualizar las Calendar Recipes del usuario"              
    }); 
  }  
};

// para la grafica de evolucion de pesos

const getRecipeLikedYFavs = async (req,res) => {
  // recibo lo que me llega del Hook
  const {uid} = req.body  
  console.log("que me llega en el body en el BE?", req.body)
 
  let usuario = await Usuario.findOne({_id:uid})  
       
   if (usuario) {    
    let recetas = {liked:usuario.likedRecipes, favs:usuario.favRecipes}     
    
    
 
    res.status(200).json({
      ok: true,
      mensaje: "Actualizada la propiedad registroPeso para el usuario " ,
      recetas: recetas
    });

  } else {
    res.status(404).json({
      ok: false,
      mensaje: "No se ha encontrado al usuario para actualizarle la grafica de pesos"
    });
  }

}

const updateUserLikes = async (req,res) => {

  const {uid, likedRecipe} = req.body  
  console.log("que me llega en el body en el BE?", req.body)
 
  let usuario = await Usuario.findOne({_id:uid})  
       
  // aqui debería actualizar el contador de likes
  if (!likedRecipe) {
    // Si favRecipe es null, envía una respuesta con un error apropiado
    return res.status(400).json({
      ok: false,
      mensaje: "El likedRecipe no se proporcionó correctamente",
    });
  }

   if (usuario && usuario.likedRecipes.includes(likedRecipe)) {    
    usuario.likedRecipes = usuario.likedRecipes.filter(id => id.toString() !== likedRecipe) // tiene que ser un [rid,rid...]
    await usuario.save();  
    
 
    res.status(200).json({
      ok: true,
      mensaje: "Quitado un like del usuario " ,
      likes: usuario.likedRecipes
    });

  } else if (usuario) {

    usuario.likedRecipes = [...usuario.likedRecipes, likedRecipe]
    await usuario.save();

    res.status(200).json({
      ok: true,
      mensaje: "Añadido un like al usuario " ,
      likes: usuario.likedRecipes
    });
  }
  else {

      res.status(404).json({
      ok: false,
      mensaje: "No se han podido actualizar los likes del usuario"
    });
  }
}

const updateUserFavs = async (req,res) => {

  const {uid, favRecipe} = req.body  
  console.log("que me llega en el body de favs en el BE?", req.body)
 
  let usuario = await Usuario.findOne({_id:uid})  
       
  // aqui debería actualizar el contador de likes

  if (!favRecipe) {
    // Si favRecipe es null, envía una respuesta con un error apropiado
    return res.status(400).json({
      ok: false,
      mensaje: "El favRecipe no se proporcionó correctamente",
    });
  }

  if (usuario && usuario.favRecipes.includes(favRecipe)) {    
    usuario.favRecipes = usuario.favRecipes.filter(id => id.toString() !== favRecipe);
    await usuario.save();  
    
 
    res.status(200).json({
      ok: true,
      mensaje: "Quitado un fav en el usuario" ,
      favs: usuario.favRecipes
    });

  } else if (usuario) {

    usuario.favRecipes = [...usuario.favRecipes, favRecipe]
    usuario.save();

    res.status(200).json({
      ok: true,
      mensaje: "Añadido un fav al usuario " ,
      favs: usuario.favRecipes
    });
  }
  else {

      res.status(404).json({
      ok: false,
      mensaje: "No se han podido actualizar los favs del usuario"
    });
  }

}

const addRegistroPeso = async (req,res) => {
  // recibo lo que me llega del Hook
  const {pesos,fechas, uid} = req.body

  if (pesos.length !== fechas.length) {
    res.status(400).json({
    ok: false,
    mensaje: "La cantidad de pesos y fechas no coincide"
    });
    return;
}
 
  let usuario = await Usuario.findOne({_id:uid})  
       
   if (usuario) {
    console.log(`El usuario ${usuario} fue localizado para actualizar su registro de Pesos con los valores pesos: ${pesos} y fechas: ${fechas}`);
    usuario.registroPeso.pesos = pesos;
    usuario.registroPeso.fechas = fechas;    
    usuario.save();
    
 
    res.status(200).json({
      ok: true,
      mensaje: "Actualizada la propiedad registroPeso para el usuario " 
    });

  } else {
    res.status(404).json({
      ok: false,
      mensaje: "No se ha encontrado al usuario para actualizarle la grafica de pesos"
    });
  }

}

const updateHarris = async (req, res) => {
  const { uid, datosHarris } = req.body;

  try {
    let usuario = await Usuario.findOne({ _id: uid });

    if (usuario) {
      console.log(`El usuario ${usuario} fue localizado para actualizar su Harris Benedict`, datosHarris);

      if (datosHarris.altura) {
        usuario.altura = parseFloat(datosHarris.altura);
      }
      
      if (datosHarris.pesoActual) {
        usuario.pesoActual = parseFloat(datosHarris.pesoActual);
      }
      
      if (datosHarris.genero) {
        usuario.genero = datosHarris.genero;
      }
      
      if (datosHarris.nivelActividad) {
        usuario.nivelActividad = datosHarris.nivelActividad;
      }
      
      if (datosHarris.objetivo) {
        usuario.objetivo = datosHarris.objetivo;
      }

      if (datosHarris.kcalObjetivo) {
        usuario.kcalObjetivo = datosHarris.kcalObjetivo;
      }

      if (datosHarris.edad) {
        usuario.edad = parseInt(datosHarris.edad, 10);
      }

      await usuario.save();

      res.status(200).json({
        ok: true,
        mensaje: "Actualizados los datos de Harris Benedict para el usuario"
      });
    } else {
      res.status(404).json({
        ok: false,
        mensaje: "No se ha encontrado al usuario para actualizar los datos de Harris Benedict"
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error al actualizar los datos de Harris Benedict",
      error
    });
  }
}

const getKcalsPerWeek = async (req, res) => {
  const { uid, datesArray } = req.body;

  try {
    // Buscamos el usuario y rellenamos los detalles de las recetas
    const usuario = await Usuario.findOne({ _id: uid }).populate('calendarRecipes.receta');
    
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: "No se ha encontrado al usuario para calcular las kcal"
      });
    }

    const kcalsArray = await Promise.all(datesArray.map(date => {
      // Filtramos las recetas que coinciden con la fecha especificada
      const recetasParaLaFecha = usuario.calendarRecipes.filter(recipe => normalizeDate(recipe.fecha) === normalizeDate(date));

      if (recetasParaLaFecha.length === 0) return 0;  // Si no hay recetas para la fecha, devolvemos 0

      // Ahora, sumamos las kcal de todas las recetas filtradas (sin tener que hacer consultas adicionales porque ya tenemos los datos)
      const totalKcalForDate = recetasParaLaFecha.reduce((sum, currentRecipe) => {
        return sum + (currentRecipe.receta.totales.kcal || 0);
      }, 0);

      return totalKcalForDate;
    }));

    res.status(200).json({
      ok: true,
      mensaje: "Kcal totales para las fechas dadas",
      kcals: kcalsArray
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un error al procesar la solicitud",
      error: error.message
    });
  }
}

function normalizeDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
}

const refreshUsuarioLikesYFavs = async (req, res) => {
  const { uid } = req.body;
  console.log("jajaja que recibo en el uid?")

  try {
    let usuario = await Usuario.findOne({ _id: uid });

    if (usuario) {  

        res.status(200).json({
        ok: true,
        mensaje: "Encontrado el usuario, devolviendo sus likes y favs",
        likedRecipes: usuario.likedRecipes,
        favRecipes: usuario.favRecipes
      });

    } else {
      res.status(404).json({
        ok: false,
        mensaje: "No se ha encontrado al usuario"
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error al encontrar al usuario",
      error
    });
  }
}

 

export {
  crearUsuario,
  updateUserFavs,
  updateUserLikes,
  getRecipeLikedYFavs,
  updateUsuarioCalendarRecipes,
  loginUsuario,
  revalidarToken,
  addRecetaCalendario,
  usuarioIndividual,
  addRegistroPeso,
  updateHarris,
  getKcalsPerWeek,
  getUsuarioCalendarRecipes,
  refreshUsuarioLikesYFavs,

};