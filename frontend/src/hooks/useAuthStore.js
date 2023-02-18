import {useDispatch, useSelector} from 'react-redux';
import recetaApi from '../apis/authApi';
import { onclearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice';


export const useAuthStore = () => {

   const {status, user, errorMessage, premium} = useSelector(state => state.auth) // con esto pillo el slice
   const dispatch = useDispatch();
   
   // Start Login
   const startLogin = async({email,password}) => {
        console.log({email, password});
        dispatch(onChecking())

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

  return {

    // Propiedades
    status,
    user,
    errorMessage,

    //Metodos
    startLogin,
    startRegister,
    startCheckAuthToken
  }
}
