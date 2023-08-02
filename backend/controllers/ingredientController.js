import Ingrediente from '../database/models/ingredientModel.js';

const crearIngrediente = async (req,res) => {       

      let nuevoIngrediente = new Ingrediente(req.body);   
        
      try {
         await nuevoIngrediente.save();
         console.log(nuevoIngrediente)
       } catch (error) {
        console.log(error)
         console.log("Ha habido un error creando el ingrediente");
         res.status(500).json({
            ok:false,
            mensaje: "Ha habido un error creando el ingrediente"
         })
       }

      res.status(201).json({
         ok: true,
         mensaje: "Creada un nuevo ingrediente",
         nombre:nuevoIngrediente.nombre,
         descripcion: nuevoIngrediente.descripcion        
        
        }) 
    } 
    
   const actualizarIngrediente = async (req,res) => {  
      const {nombre, newName} = req.body
      
      await Ingrediente.findOneAndUpdate({nombre:nombre},
         {nombre:newName},
         )      
               

      res.status(201).json({
         ok: true,
         mensaje: "Se ha actualizado el documento",
         nombre:nombre                  
         
         }) 
   } 

const getIngredientes = async (req,res) => {  
         
   const ingredientes = await Ingrediente.find();      
            

   res.status(201).json({
      ok: true,
      mensaje: "Se ha enviado correctamente toda la lista de ingredientes",
      ingredientes                  
      
      }) 
} 

   



export { getIngredientes, crearIngrediente, actualizarIngrediente };
