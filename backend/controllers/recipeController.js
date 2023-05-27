const { default: mongoose } = require('mongoose')
const Receta = require('../database/models/recipeModel')
const Usuario = require('../database/models/userModel')


const crearReceta = async (req,res) => {
  // está esperando el autor en el body, ahí el problema!
    const {autor} = req.body  

     
    console.log("RecipeController: que trae autor?", autor); //me llega
    console.log("RecipeController: que trae el req.body?", req.body); // me llega
    console.log("RecipeController: que trae el req.body con stringify JSON?", JSON.stringify(req.body)); // me llega
    
   
    const userFound = await Usuario.findById(mongoose.Types.ObjectId(autor)) // lo encuentra
    console.log("RecipeController: hago un findbyID con el id del usuario ",userFound );

    let totalVacio = {
      kcal:0,
      proteinas:0,
      grasas:0,
      hcs:0,
      grasasSaturadas:0,
      colesterol:0,
      sodio:0,
      potasio:0,
      fibra:0,
      azucares:0,
      sal:0,
      vitaminaC:0,
      vitaminaD:0,
      hierro:0,
      calcio:0,
      vitaminaB6:0,
      magnesio:0,
      vitaminaB12:0,
      fosforo:0,
      vitaminaB1,
      vitaminaB2,
      vitaminaB3,
      vitaminaB5,
      vitaminaB7,

    }

    const receta = new Receta(req.body);
    console.log("el req.body con el que relleno la receta en la API", req.body)  
    console.log("la receta que construyo con el new Receta", receta)    
  
  // Funcion que calcula un {} con la suma de todos los valores de cada ingrediente
  // Recibe [{ingrediente:{nombre, grasas}, cantidad}, {}, {}]
  let calculoTotales = (array) =>{
    array.map( i=>{
      totalVacio.kcal = Math.round(totalVacio.kcal + (i.ingrediente.kcal ?? 0) /100 * i.cantidad)
      totalVacio.hcs = Math.round(totalVacio.hcs + (i.ingrediente.hcs ?? 0) /100 * i.cantidad)
      totalVacio.proteinas = Math.round(totalVacio.proteinas + (i.ingrediente.proteinas ?? 0) /100 * i.cantidad)
      totalVacio.grasas = Math.round(totalVacio.grasas + (i.ingrediente.grasas ?? 0) /100 * i.cantidad)      
      totalVacio.grasasSaturadas = Math.round(totalVacio.grasasSaturadas + (i.ingrediente.grasasSaturadas ?? 0) /100 * i.cantidad)
      totalVacio.colesterol = Math.round(totalVacio.colesterol + (i.ingrediente.colesterol ?? 0) /100 * i.cantidad)
      totalVacio.sodio = Math.round(totalVacio.sodio + (i.ingrediente.sodio ?? 0) /100 * i.cantidad)
      totalVacio.potasio = Math.round(totalVacio.potasio + (i.ingrediente.potasio ?? 0) /100 * i.cantidad)
      totalVacio.fibra = Math.round(totalVacio.fibra + (i.ingrediente.fibra ?? 0) /100 * i.cantidad)
      totalVacio.azucares = Math.round(totalVacio.azucares + (i.ingrediente.azucares ?? 0) /100 * i.cantidad)
      totalVacio.sal = Math.round(totalVacio.sal + (i.ingrediente.sal ?? 0) /100 * i.cantidad    )     
      totalVacio.vitaminaC = Math.round(totalVacio.vitaminaC + (i.ingrediente.vitaminaC ?? 0) /100 * i.cantidad)
      totalVacio.vitaminaD = Math.round(totalVacio.vitaminaD + (i.ingrediente.vitaminaD ?? 0) /100 * i.cantidad)
      totalVacio.hierro = Math.round(totalVacio.hierro + (i.ingrediente.hierro ?? 0) /100 * i.cantidad)
      totalVacio.calcio = Math.round(totalVacio.calcio + (i.ingrediente.calcio ?? 0) /100 * i.cantidad)
      totalVacio.vitaminaB6 = Math.round(totalVacio.vitaminaB6 + (i.ingrediente.vitaminaB6 ?? 0) /100 * i.cantidad)
      totalVacio.magnesio = Math.round(totalVacio.magnesio + (i.ingrediente.magnesio ?? 0) /100 * i.cantidad)
      totalVacio.vitaminaB12 = Math.round(totalVacio.vitaminaB12 + (i.ingrediente.vitaminaB12 ?? 0) /100 * i.cantidad)
      totalVacio.fosforo = Math.round(totalVacio.fosforo + (i.ingrediente.fosforo   ?? 0) /100 * i.cantidad)
      totalVacio.selenio = Math.round(totalVacio.selenio + (i.ingrediente.selenio   ?? 0) /100 * i.cantidad)
      totalVacio.yodo = Math.round(totalVacio.yodo + (i.ingrediente.yodo   ?? 0) /100 * i.cantidad)
      totalVacio.acidoFolico = Math.round(totalVacio.acidoFolico + (i.ingrediente.acidoFolico   ?? 0) /100 * i.cantidad)
      totalVacio.cobre = Math.round(totalVacio.cobre + (i.ingrediente.cobre   ?? 0) /100 * i.cantidad)
      totalVacio.vitaminaB1 = Math.round(totalVacio.vitaminaB1 + (i.ingrediente.vitaminaB1   ?? 0) /100 * i.cantidad)
      totalVacio.vitaminaB2 = Math.round(totalVacio.vitaminaB2 + (i.ingrediente.vitaminaB2   ?? 0) /100 * i.cantidad)
      totalVacio.vitaminaB3 = Math.round(totalVacio.vitaminaB3 + (i.ingrediente.vitaminaB3   ?? 0) /100 * i.cantidad)
      totalVacio.vitaminaB5 = Math.round(totalVacio.vitaminaB5 + (i.ingrediente.vitaminaB5  ?? 0) /100 * i.cantidad)
      totalVacio.vitaminaB7 = Math.round(totalVacio.vitaminaB7 + (i.ingrediente.vitaminaB7   ?? 0) /100 * i.cantidad)

    })
    return totalVacio
    
  }   
   
    try {
      //el id lo está haciendo antes
      let recetaGuardada = await receta.save(); 
      const recetaPopulada = await Receta.findById(recetaGuardada._id).populate('ingredientes.ingrediente')     
      console.log("el id para el populate: ", recetaGuardada._id);
      console.log(typeof(recetaGuardada._id));
         
      

     //receta.totales = calculoTotales(recetaPopulada.ingredientes)
     
       // Añades la receta a su array
      await userFound.save() //guardas la actualización en el creador
      
      console.log("aqui va la receta normal",recetaGuardada);
      console.log("aqui va la receta populada",recetaPopulada);
      // Esto no popula nada -- OK
      console.log("Y los ingredientes de la receta guardada? ",recetaGuardada.ingredientes);
       //Esto SÍ lo popula, si no profundizas te lo pone como [Object] en lugar de un ID
      console.log("una vez populada como quedan los ingredientes?",recetaPopulada.ingredientes);
      console.log("aqui va el id de la receta",recetaGuardada._id);
      let objetoSuma = calculoTotales(recetaPopulada.ingredientes)   
      recetaGuardada = await Receta.findByIdAndUpdate(recetaGuardada._id, { totales: objetoSuma })
      userFound.recetas = userFound.recetas.concat(receta._id)
      await userFound.save() //guardas la actualización en el creador
      console.log("Aquí ejecuto la función de sumatorio: ",objetoSuma);
      console.log("Estos son los totales de la receta que se guarda y actualiza",recetaGuardada.totales);
      

      res.status(201).json({
         ok: true,
         mensaje: "Creada una nueva Receta",         
         recetaPopulada,
         valoresTotales:receta.totales            
      })

    } catch (error) {
      console.log(error);
    }
        
      
  }

   const recetasUsuario = async (req,res) => {

      const {autor} = req.body

     
      const userFound = await Usuario.findById(autor).populate('recetas')      
      const recetasUser = userFound.recetas // saco las recetas del usuario   
      
     
      
       // Esto te devuelve el array con todas las recetas del usuario      
   
         res.status(201).json({
            ok: true,
            mensaje: "Encontrando recetas del usuario",
            recetas: recetasUser
                           
          }) 
    }

    const todasRecetas = async (req,res) => {            
              
      try {
       
        const allRecipes = await Receta.find().populate('autor').limit(6)        
        console.log("Son estas las 6 recetas?: ", allRecipes);        
        

        res.status(201).json({
           ok: true,
           mensaje: "Displayeando las 6 recetas",
           allRecipes               
        })
  
      } catch (error) {
        console.log(error);
      }
          
        
    }
    
    // Esto creo que está OK
    const recetaIndividual = async (req,res) => {

      const {rid} = req.params   //id    
      const receta = await Receta.findById(rid).populate('ingredientes.ingrediente').populate('autor')
            
            
      console.log(receta);
       // Esto te devuelve el array con todas las recetas del usuario      
   
         res.status(201).json({
            ok: true,
            mensaje: "Encontrada la receta del usuario",
            receta                
          }) 
    }
     // OK
    const updateReceta = async (req,res) => {
      const {id, nombre} = req.body   // se puede inicializar a 0 desde aqui?       
              
      try {
       
        const recetaFound = await Receta.findOneAndUpdate({_id:id},{
          nombre,
        })         
        console.log(recetaFound);

        res.status(201).json({
           ok: true,
           mensaje: "Updateada la Receta",
           id,
           nombre               
        })
  
      } catch (error) {
        console.log(error);
      }
          
        
    }

       // OK
       const deleteReceta = async (req,res) => {
        const {id} = req.body   // se puede inicializar a 0 desde aqui?    
              
                              
        try {

          // Buscar el id de la receta en el array de recetas del usuario

          // Encontrar la receta que quieres borrar
          const recetaFound = await Receta.findByIdAndRemove({_id:id})
          console.log("Esta es la receta que hemos borrado", recetaFound);

          // Encontrar al usuario autor de esa receta
          const userFound = await Usuario.findById(recetaFound.autor)
          console.log("Este era el usuario de la receta",userFound)

          // Acceder a su array de recetas y eliminar esa
          const recetaUser = userFound.recetas // esto es el array de IDs
          console.log("Así quedaría el array inicial", recetaUser);

          //Borramos la receta del array       

          let indexReceta = recetaUser.indexOf(id);  //me da la posicion en el array      

          if (indexReceta !== -1) { //esto evita errores
            recetaUser.splice(indexReceta, 1); // en la posición que te paso, borra 1 item
          }

          console.log("Asi quedaría el array final", recetaUser );   

          //Guardamos lel nuevo array
          await userFound.save()
                             
            
          res.status(201).json({
              ok: true,
              mensaje: "Receta Borrada con éxito",
              id,
              user: userFound,
              receta:recetaUser               
          })
    
        } catch (error) {
          console.log(error);
        }
            
          
      }


   



 module.exports = { crearReceta, recetasUsuario, recetaIndividual, updateReceta, deleteReceta,todasRecetas }