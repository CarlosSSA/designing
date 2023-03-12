import {useDispatch, useSelector} from 'react-redux';
import recetaApi from '../apis/authApi';
///api/createIngredient

export const useIngredientStore = () => {

 
   // Start Login
   const startGetIngredients = async() => {
        
        try {
            
            // Es que necesita meterle el nombre a pelo para que funcione XD, esto cambiarlo y dejarlo solo con login y password
            
            const {data} = await recetaApi.post('/auth', {email, password})
            console.log(data);
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime());        
            dispatch(onLogin({nombre:data.name, id:data.uid}))

        } catch (error) {
            console.log("error", error);
            dispatch(onLogout('Credenciales Incorrectas'));
            setTimeout( () =>{
                dispatch(onclearErrorMessage());
            },10)
        }

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
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

   const startRegister = async({ email, password, nombre}) => {
    dispatch( onChecking() );
   
    try {
        const { data } = await recetaApi.post('/auth/new',{ email, password, nombre }); //registra al usuario  - NO VA      
        localStorage.setItem('token', data.token );
        localStorage.setItem('token-init-date', new Date().getTime() );
        dispatch( onLogin({ name: data.nombre, uid: data.uid }) ); // esto es lo que guardaré en el payload
        
    } catch (error) {
        console.log("Ha fallado en el catch del StartRegister");
        dispatch( onLogout( error.response.data?.msg || '--' ) );
        setTimeout(() => {
            dispatch( onclearErrorMessage() );
        }, 10);
    }
}  

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
    status,
    
 

    //Metodos
    startGetIngredients,
    startAllIngredients,
    startRegister,
    startCheckAuthToken
  }
}
