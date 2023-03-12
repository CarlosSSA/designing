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
import { onLoadUserRecipes, onSetActiveRecipe, onFormRecipe } from "../store/recipes/recipesSlice"

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

    const startFormRecipe = ( receta ) => {
        dispatch(onFormRecipe( receta ))   
        console.log("Se actualiza el store recipe desde el Hook: ", receta);     
        
    } 

    const startCreateRecipe = async( receta ) => {
        console.log("esto es lo que me llega en el useREcipeStore, con esto construyo la llamada", receta);
        console.log("esto es lo que me llega en el useREcipeStore con JSONStringify", JSON.stringify(receta));
        const recetaStringed = JSON.stringify(receta)

        try {  
            //esto es la respuesta del servidor baseURL:'http://localhost:4001/api/'       
            const {data} = await recetaApi.post('/recipe/new', receta)           
            console.log("Esta es la respuesta del servidor", data); 
            console.log("Se ha creado una NUEVA receta con este data", receta); 
        } catch (error) {
            console.log("Ha habido un problema creando la receta", error);
        }
            
        
    }

    const startAllRecipes = async(  ) => {      
        

        try {  
            //esto es la respuesta del servidor baseURL:'http://localhost:4001/api/'       
            const {data} = await recetaApi.get('/recipe/')    
            const allRecipes = data.allRecipes       
            console.log("Esta es la respuesta del servidor", allRecipes);  
            return allRecipes           
        } catch (error) {
            console.log("Ha habido un problema creando la receta", error);
        }
            
        
    }

    const startSelectRecipe = async( recipeID ) => {    
        

        try {  
            //esto es la respuesta del servidor baseURL:'http://localhost:4001/api/'       
            const {data} = await recetaApi.get(`/recipe/${recipeID}`)   
                   
            console.log("Esto me llega del servidor con un ID de receta", data);  
            return data           
        } catch (error) {
            console.log("Ha habido un problema creando la receta", error);
        }
            
        
    }

    return {
     
        startActiveRecipe ,
        startUserRecipes ,
        startCreateRecipe ,
        startFormRecipe,
        startAllRecipes,
        startSelectRecipe,
        
        
    }


}

