import {useDispatch, useSelector} from 'react-redux';
import recetaApi from '../apis/authApi';
import { onclearErrorMessage, onChecking, onLogin, onLogout, onValoresTotales } from '../store/auth/authSlice';

//new
import { format, parseISO } from 'date-fns';

export const useAuthStore = () => {

   const {status, user, errorMessage, premium} = useSelector(state => state.auth) // con esto pillo el slice
   const dispatch = useDispatch();
   
   // Start Login
   const startLogin = async({email,password, socialLogin}) => {
    console.log("Esto es lo que mando desde el Hook de startLogin", {email, password});
    dispatch(onChecking())
    
    try {     
        
        let datos; 

        if(socialLogin) {
            // Si socialLogin es true, hace esta petición omitiendo el password
            const {data} = await recetaApi.post('/auth', {email, socialLogin})
            console.log(" startLogindata socialLogin=true", data)
            datos = data
        } else {
            // Si socialLogin es false o undefined, hace la petición original
            const {data} = await recetaApi.post('/auth', {email, password, socialLogin})
            console.log(" startLogindata socialLogin=true", data)
            datos = data
        }        
        
        if(datos.usuario && datos.usuario.calendarRecipes) {
            const calendarRecipesEspaña = datos.usuario.calendarRecipes.map(({ receta, fecha, _id }) => ({
                receta,
                fecha: format(parseISO(fecha), 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Europe/Madrid' }),
                _id,
            }));
            
            console.log("startLogin, el BE me devuelve este data: ", datos);
            
            localStorage.setItem('token',datos.token);
            localStorage.setItem('token-init-date',new Date().getTime());        
            
            dispatch(onLogin({
                nombre:datos.usuario.nombre,
                email:datos.usuario.email,
                uid:datos.usuario._id,
                avatar:datos.usuario.avatarUrl,
                recetasCalendar:calendarRecipesEspaña,
                //... (otros campos)
            }));
        } else {
            console.log("data: ", datos)
            console.log("Error: data.usuario o data.usuario.calendarRecipes no definidos", datos);
        }
        
    } catch (error) {
        console.log("error", error);
        dispatch(onLogout('Credenciales Incorrectas'));
        setTimeout(() => {
            dispatch(onclearErrorMessage());
        },10)
    }
  }

    const startLogout = () => {        
        dispatch(onLogout('Credenciales Incorrectas')); 

    }
    
    // Esto lo vamos a utilizar en cada petición en el router. Hemos metido ya un interceptor axios que nos debería dar el token   

    const startCheckAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) {
            console.log("No viene Token en el req", token);
            return dispatch( onLogout() );
        }

        try {
            console.log("Vale, venía un token en el localstorage", token);
            const { data } = await recetaApi.get('auth/renew');
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startRegister = async({ email, password, nombre, uid, socialLogin }) => {
        dispatch( onChecking() );
        console.log(`Que me llega en el HOOK startRegister?? email:${email}, password:${password}, nombre:${nombre}, uid:${uid}, socialLogin:${socialLogin}`)
      
        try {
          const body = socialLogin ? { email, nombre, uid, socialLogin } : { email, password, nombre };
          console.log(`Que me llega en el HOOK startRegister por SocialLogin?? body: ${JSON.stringify(body)}`);

          const { data } = await recetaApi.post('/auth/new', body);
          console.log("Que me viene en el nuevo data social?", data)
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('token-init-date', new Date().getTime());
          
          dispatch( onLogin({ name: data.nombre, uid: data.uid }) );
          
        } catch (error) {
          console.log("Ha fallado en el catch del StartRegister", error);
          dispatch( onLogout( error.response.data?.msg || '--' ) );
          setTimeout(() => {
              dispatch( onclearErrorMessage() );
          }, 10);
        }
      }

// /api/auth/addRecetaUsuario !!!!!

const startAddRecetaCalendar = async({recipeid, uid, fecha}) => {
    console.log({recipeid});
    console.log({uid});
    console.log({fecha});
    //new
    const date = format(new Date(fecha), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    console.log("nueva date con fns",date)
    dispatch(onChecking())

    try {        
              
        const {data} = await recetaApi.post('/auth/addRecetaUsuario', {recipeid, uid, fecha:date})
        console.log("login desde el backend: ",data);
        
        //por qué hace on Onchecking aqui? Pierde todo los valores
        

    } catch (error) {
        console.log("error", error);
        dispatch(onLogout('Credenciales Incorrectas'));
        setTimeout( () =>{
            dispatch(onclearErrorMessage());
        },10)
    }
}

    const startUpdateRecetaCalendar = async({uid,recetas}) => {
        try {
            console.log("que recibo en el Hook de calendar?",{uid,recetas})
            const {data} = await recetaApi.post('/auth/updateUserCalendarRecipes', {uid, userRecipes:recetas})
            console.log("El Hook del updateCalendarRecipes me devuelve esto: ",data);
        } catch (error) {
           console.log(error) 
        }
        
    }


    // HAcer el Hook de usuario individual
    const startUsuarioIndividual = async({uid}) =>{ 
        console.log("Usuario individual que recibo en el Hook", uid);        
    
        try {        
                  
            const {data} = await recetaApi.post('/auth/usuarioIndividual', {uid})
            console.log("Usuario individual, recibo desde el BE:",data);                 
            return data.usuario
    
        } catch (error) {
            console.log("Hubo un problema encontrando al usuario individual", error);
            
        }

   
    }

    const startActualizacionTotales = async({totales}) => {               
    
        try {        
                    
            dispatch(onValoresTotales({totales}))
            

        } catch (error) {
            console.log("Hubo un problema actualizando los valores totales", error);
            
        }
    }

    const startUpdateGraficoPeso = async({pesos,fechas, uid}) => {

         // Asegúrate de que las longitudes de pesos y fechas coincidan
      
        try {            
            const {data} = await recetaApi.post('/auth/updateRegistroPeso', {uid, pesos, fechas})
            console.log("El Hook del startUpdateGraficoPeso me devuelve esto: ",data);
        
        } catch (error) {
           console.log(error) 
        }
        
    }

    const startGetRecipeLikesYFavs = async({uid}) => {        
     
       try {            
           const {data} = await recetaApi.post('/auth/getRecipeLikesYFavs', {uid})
           console.log("El Hook del startGetRecipeLikesYFavs me devuelve esto: ",data);
           return data
       } catch (error) {
          console.log(error) 
       }
       
   }

   const startUpdateUserLikes = async({uid, likedRecipe}) => {        
     
    try {                  
        const {data} = await recetaApi.post('/auth/updateUserLikes', {uid, likedRecipe})
        console.log("BE startUpdateUserLikes Hook: ",data);
        return data
    } catch (error) {
       console.log("Error en el startUpdateUserLikes", error) 
    }
    
}

const startUpdateUserFavs = async({uid, favRecipe}) => {        
     
    try {            
        const {data} = await recetaApi.post('/auth/updateUserFavs', {uid, favRecipe})
        console.log("El Hook del startUpdateUserFavs me devuelve esto: ",data);
        return data
    } catch (error) {
       console.log(error) 
    }
    
}

const startUpdateHarris = async({ uid, datosHarris}) => {
    console.log("startUpdateHarris, lo que recibo en uid",{uid});
    console.log("startUpdateHarris, lo que recibo en datosHarris", {datosHarris});
    
    
    try {        
              
        const {data} = await recetaApi.post('/auth/updateHarris', { uid, datosHarris})
        console.log("startUpdateHarris, lo que me devuelve el backend: ",data);
                

    } catch (error) {
        console.log("error", error);        
    }
}

const startGetKcalsPerWeek = async({ uid, datesArray}) => {
      
    
    try {        
              
        const {data} = await recetaApi.post('/auth/getKcalsPerWeek', { uid, datesArray})
        console.log("Hook getKcalsPerWeek: que recibo en el Hook y envío al backend: ",uid, datesArray);      
        console.log("Hook getKcalsPerWeek: lo que me devuelve el backend: ",data);
        return data

    } catch (error) {
        console.log("error en el Hook startGetKcalsPerWeek ", error);        
    }
}

const startGetUsuarioCalendarRecipes = async({ uid }) => {
      
    
    try {        
              
        const {data} = await recetaApi.post('/auth/getUsuarioCalendarRecipes', { uid })
        console.log("Hook startGetUsuarioCalendarRecipes: que recibo en el Hook y envío al backend: ",uid);      
        console.log("Hook startGetUsuarioCalendarRecipes: lo que me devuelve el backend: ",data);
        return data

    } catch (error) {
        console.log("error en el Hook startGetKcalsPerWeek ", error);        
    }
}

    

  return {

    // Propiedades
    status,
    user,
    errorMessage,

    //Metodos
    startLogin,
    startRegister,
    startCheckAuthToken,
    startAddRecetaCalendar,
    startUpdateRecetaCalendar,
    startLogout,
    startUsuarioIndividual,
    startActualizacionTotales,
    startUpdateGraficoPeso,
    startGetRecipeLikesYFavs,
    startUpdateUserLikes,
    startUpdateUserFavs,
    startUpdateHarris,
    startGetKcalsPerWeek,
    startGetUsuarioCalendarRecipes
    
  }

};

