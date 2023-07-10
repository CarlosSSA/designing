import {useDispatch, useSelector} from 'react-redux';
import recetaApi from '../apis/authApi';
import { onclearErrorMessage, onChecking, onLogin, onLogout, onValoresTotales } from '../store/auth/authSlice';


export const useCommentStore = () => {


    const startAddComentario = async({texto, autor}) => {
        console.log(`Qué Recibo en el Hook del startAddComentario? texto: ${texto} y autor: ${autor}`);
    
        try {       
                
            const {data} = await recetaApi.post('/createComment', {texto, autor})
            console.log("En el Hook del createComment, respuesta del BE: ",data);  
            return data            

        } catch (error) {
            console.log("error", error);
            dispatch(onLogout('Credenciales Incorrectas'));
            setTimeout( () =>{
                dispatch(onclearErrorMessage());
            },10)
        }
    }

    const startAddLikeComentario = async({comentarioID, like}) => {        
    
        try {       
                
            const {data} = await recetaApi.post('/createComment/addLikeComentario', {comentarioID, like})
            console.log(`Añadido un like del usuario ${like} al comentario ${comentarioID}`)
            return data            

        } catch (error) {
            console.log("error", error);
            
        }
    }

    

  return {

    // Propiedades

    //Metodos
    startAddComentario,
    startAddLikeComentario
    
    
  }

};