import Ingrediente from '../database/models/ingredientModel.js';

const crearIngrediente = async (req,res) => {  
   
   console.log("BE crearIngrediente, que me llega en el body? ", req.body)

   let nuevoIngrediente = new Ingrediente(req.body);   
       
   try {
      await nuevoIngrediente.save();
      console.log("BE nuevoIngrediente: ", nuevoIngrediente)
      
      res.status(201).json({
         ok: true,
         mensaje: "Creado un nuevo ingrediente",
         nuevoIngrediente        
      }) 
 
    } catch (error) {
      console.log(error)
      console.log("Ha habido un error en el BE creando un ingrediente");
      return res.status(500).json({
         ok:false,
         mensaje: "Ha habido un error creando el ingrediente"
      })
    }
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
