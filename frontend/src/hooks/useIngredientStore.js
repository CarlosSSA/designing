import {useDispatch, useSelector} from 'react-redux';
import recetaApi from '../apis/authApi';
///api/createIngredient

export const useIngredientStore = () => {

     const startAllIngredients = async() => {
            
        try {        
        
            const {data} = await recetaApi.get('/createIngredient/all')  
           
            console.log("Desde UseIngredient Store -Todos los ingredientes", data);
            return data 
            
            
        } catch (error) {
            console.log("error", error);        
        }

      }

      const startCreateIngredient = async(ingrediente) => {
            
        try {     
          
          console.log("Hook startCreateIngredient: creando un ingrediente ", ingrediente);
          console.log("Hook startCreateIngredient (en objeto): creando un ingrediente ", ingrediente);
        
            const {data} = await recetaApi.post('/createIngredient', ingrediente)  
           
            
            return data 
            
            
        } catch (error) {
            console.log("error al crear el ingrediente", error);        
        }

      }

  return {

    // Propiedades
    
    
 

    //Metodos
    startAllIngredients,
    startCreateIngredient
   
  }
}
