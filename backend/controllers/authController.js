import Usuario from '../database/models/userModel.js';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/jwt.js';

//Este lleva el validationResult aqui mismo, el de login lo lleva en un middleware chulo :)
const crearUsuario = async (req,res) => {
    const {nombre, email, password} = req.body
    
    // FYI aqui va a saltar la validacion middleware que hemos creado aunque aqui no venga na (ver en la ruta)
    let usuario = await Usuario.findOne({  //esto es una promise myfriend
      email:email
    })  

    if (usuario) {
      console.log(`El usuario ${nombre} ya existe`);      
      res.status(400).json({
         ok:false,
         mensaje: "El usuario ya existe"
      })
    } else{

      usuario = new Usuario(req.body);
      
      //Necesitamos encriptar la contraseña con bcrypt
      var salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt); //hashea    
      
      let token = ''
      try {
         await usuario.save();
          // Necesitamos generar un JWT
         token = await generarJWT(usuario._id,nombre)
       } catch (error) {
         console.log("Ha habido un error");
         res.status(500).json({
            ok:false,
            mensaje: "Por favor hable con el administrador"            
         })
       }

      res.status(201).json({
         ok: true,
         mensaje: "registro de nuevo usuario",
         nombre,
         email,
         password,         
         token
        
        }) 
    }

    // Creo un usuario desde el modelo
    /* usuario = new Usuario(req.body);
    // Intento un nuevo registro en la BBDD
    try {
      await usuario.save();
    } catch (error) {
      console.log("Ha habido un error");
      res.status(500).json({
         ok:false,
         mensaje: "Por favor hable con el administrador"
      })
    }
    */
    

   
 }

 const loginUsuario = async (req,res) => {

   const { email, password } = req.body
    
   //Buscamos al usuario
   try {

    let usuario = await Usuario.findOne({
     email:email
    }) 
  
    // Si no existe devolvemos un 400    
    if ( !usuario ) {
      return res.status(400).json({
          ok: false,
          msg: 'El usuario no existe con ese email'
      });
    }
  
    let comparacion = bcrypt.compareSync(password, usuario.password);
    
    if (!comparacion) {
      return res.status(400).json({
         ok: false,
         msg: "La password no es correcta"
      });
    }
    
    // Genero JWT y mando la respuesta. En cada login genero un token
    const token = await generarJWT( usuario._id, usuario.nombre );    

    res.json({
      ok: true,
      uid: usuario._id,
      name: usuario.nombre,
      token,
      usuario,
      msg: "Se ha logeado al usuario correctamente"
  })

  // Si algo fallara devuelvo un error 500
  } catch (error) {

    console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo ha fallado tratando de logear al usuario'
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
  updateHarris

};