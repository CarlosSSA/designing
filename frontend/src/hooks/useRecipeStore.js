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

    const startUpdateLikesRecetaPost = async( rid, recipeLikes ) => {    
        

        try {  
            const {data} = await recetaApi.post('/recipe/updateRecetaIndividualPost, {rid, recipeLikes}')   
                   
            console.log("Esto me llega del servidor con startUpdateRecipeLikes", data);  
            return data           
        } catch (error) {
            console.log("Ha habido un problema actualizando los likes de la receta", error);
        }
            
        
    }

    const startUpdateRecipeLikes = async( {rid, userLike} ) => {   

        try { 
            
            console.log(`HOOK RECETA : que recibo de la card: ${rid} y el usuario que ha dado like: ${userLike}`)
            const {data} = await recetaApi.post('/recipe/updateRecipeLikes', { rid, userLike})   
                   
            console.log("Respuesta BE vs HOOK Receta: startUpdateRecipeLikes Hook:", data);  
            return data           
        } catch (error) {
            console.log("Error en el startUpdateRecipeLikes", error);
        }
            
        
    }


    const startGetRecipePost = async( rid ) => {   

        try {  
            //necesito llamar por el recipe id y recoger el receta.likes
            // aqui puedo hacer la lógica 
            const {data} = await recetaApi.post('/getRecetaIndividualPost',{rid})   
                   
            console.log("FE: Hook: Esto me llega si busco una receta por post", data);  
            return data           
        } catch (error) {
            console.log("Ha habido un problema modificando los likes de la receta", error);
        }
            
        
    }

    
    const startUpdateRecipeComments = async( {rid, comentarioID} ) => {   

        try {  
            console.log(`Vamos a ver qué envío al BE para que me actualice los comentarios de la receta, el rid es: ${rid} y el ID de comentario es: ${comentarioID}`)
            const {data} = await recetaApi.post('/recipe/updateRecipeComments',{rid,comentarioID})   
                   
            console.log("startUpdateRecipeComments Hook: Lo que me devuelve el BE", data);  
            return data           
        } catch (error) {
            console.log("Ha habido un problema modificando los comentarios de la receta", error);
        }
            
        
    }

    const startUpdateRecipeSteps = async( {rid, pasos} ) => {   

        try {  
            console.log(`Vamos a ver qué envío al BE para que me actualice los pasos de la receta, el rid es: ${rid} y los pasos son: ${pasos}`)
            const {data} = await recetaApi.post('/recipe/updateRecipeSteps',{rid,pasos})   
                   
            console.log("startUpdateRecipeSteps Hook: Lo que me devuelve el BE", data);  
            return data           
        } catch (error) {
            console.log("Ha habido un problema modificando los pasos de la receta", error);
        }
            
        
    }   

    
    const startGetRecetaByName = async( nombre ) => {   

        try {  
            console.log(`Vamos a ver qué envío al BE para que me de las recetas por titulo ${nombre}`)
            const {data} = await recetaApi.post('/recipe/getRecetaByName',{nombre})   
                   
            console.log("startUpdateRecipeSteps Hook: Lo que me devuelve el BE", data);  
            return data           
        } catch (error) {
            console.log("Ha habido un problema encontrando recetas con esa palabra", error);
        }
            
        
    }

    const startSearchByIngredientName = async( {nombreIngredientes} ) => {  
    
        try {  
            console.log(`Vamos a ver qué envío al BE para que me busque recetas por nombre ${nombreIngredientes}`)
            
            const {data} = await recetaApi.post('/recipe/searchByIngredientName',{nombreIngredientes})   
                   
            console.log("startUpdateRecipeSteps Hook: Lo que me devuelve el BE", data);  
            return data           
        } catch (error) {
            console.log("Ha habido un problema filtrando recetas por ingrediente", error);
        }
            
        
    }

    

    

    return {
     
        startActiveRecipe ,
        startUserRecipes ,
        startCreateRecipe ,
        startFormRecipe,
        startAllRecipes,
        startSelectRecipe,
        startUpdateLikesRecetaPost,
        startUpdateRecipeLikes,
        startGetRecipePost,
        startUpdateRecipeComments,
        startUpdateRecipeSteps,
        startGetRecetaByName,
        startSearchByIngredientName
        
        
    }


}

