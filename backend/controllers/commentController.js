const Comentario = require('../database/models/commentModel')



const crearComentario = async (req,res) => {
    const {texto, autor} = req.body   

    console.log(`Lo que recibo en el body al crear comentario: texto: ${texto}, autor: ${autor}`)

      let comentario = new Comentario({texto, autor});
      
      try {
        console.log(`Que intento guardar? comentario: ${comentario}`)
         await comentario.save();          
       } catch (error) {
         console.log("Ha habido un error guardando el comentario");
         res.status(400).json({
            ok:false,
            mensaje: "Ha habido un error guardando el comenario"            
         })
       }

      res.status(201).json({
         ok: true,
         mensaje: "Nuevo comentario añadido",
         texto,
         autor, 
         comentario        
        
        }) 
    }  

    const addLikeComentario = async (req,res) => {
      const {comentarioID, like} = req.body   
  
      console.log(`Lo que recibo en el body dar like a un comentario? : comentario: ${comentarioID}, like: ${like}`)      
        
        try {

          let comentario = await Comentario.findOne({_id:comentarioID}) 
          comentario.likes = [...comentario.likes, like] // tiene que ser un [uid,uid...]
          await comentario.save(); 

         } catch (error) {
           console.log("Ha habido un error añadiendo el like al comentario");
           res.status(400).json({
              ok:false,
              mensaje: "Ha habido un error añadiendo el like al comentario"            
           })
         }
  
        res.status(201).json({
           ok: true,
           mensaje: "Like añadido al comentario",
           IDcomentario: comentarioID,
           UserQueDaLike:like,                    
          
          }) 
      }  

   
 

 

 module.exports = { crearComentario, addLikeComentario }