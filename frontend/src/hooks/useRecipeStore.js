/*

1) Manejar el Slice de Recipes

- .recipes será una lista de objetos
- onActive --> marcar la receta que he pinchado?
- on new recipe --> maneja la creacion de una nueva receta, pushea al estado la receta
- on update recipe --> me devuelve la receta a atraves del id del payload
- on delete --> no me queda claro que hace
- on load recipes --> 


*/

import { useDispatch, useSelector } from "react-redux"
import recetaApi from "../apis/authApi"
import { onLoadUserRecipes, onSetActiveRecipe } from "../store/recipes/recipesSlice"

export const useRecipeStore = () => { 
    
    
    const {recipes} = useSelector(state => state.recipes) // payload.recipes
    console.log("Esto es lo que saco del useSelector desde el useRecipeStore", recipes);
    //recojo el id del usuario de la url "/user/123"  
    const dispatch = useDispatch();

    const startUserRecipes = async(userid) => {     //    
        console.log("recetaAPI", recetaApi); 
        console.log("userID", userid);            
        
        // llamar a la API con axios
        try {
            const {data} = await recetaApi.post('/recipe', {autor:userid}) // el objeto trae un parametro data            
            dispatch( onLoadUserRecipes(data.recetas) )  // Esto funciona guay            
            console.log("Se ha llamado correctamente a la BBDD para obtener las recetas");
            console.log("data desde el useSelector", data.recetas);            
            return data.recetas
            
        } catch (error) {
            console.log("Ha habido un error fetchea ndo las recetas del usuario");
        }  

    }
    
    const startActiveRecipe = ( receta ) => {
        dispatch( onSetActiveRecipe( receta ) )   
        console.log("Se ha pinchado esta receta", receta);     
        
    } 

    return {
     
        startActiveRecipe ,
        startUserRecipes ,
        
        
    }


}

