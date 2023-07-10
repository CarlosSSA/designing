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

  return {

    // Propiedades
    
    
 

    //Metodos
    startAllIngredients,
   
  }
}
