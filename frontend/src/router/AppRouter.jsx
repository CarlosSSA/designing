import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CrearReceta from '../pages/crearReceta/CrearReceta';
import { useAuthStore } from '../hooks/useAuthStore';
import LoginInside from '../pages/login/Login';
import RegisterInside from '../pages/login/Register';
import { RecipePage } from '../pages/recipe/RecipePage';
import  UserPage from '../pages/user/UserPage';   
import HomePage from '../pages/home/HomePage';
import Mainete from '../components/Mainete';


 


export const AppRouter = () => {

    const { status, startCheckAuthToken } = useAuthStore();
    //const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';
    
    useEffect(() => {
        startCheckAuthToken();
    }, [])

     if ( status === 'checking' ) {
        return (
            <h3>Cargando...</h3>
        )
    }

    
    return (
        <Routes>
            {
                ( status === 'no autenticado')  
                    ? (
                        <>
                            <Route path="/auth/*" element={ <LoginInside /> } />
                            <Route path="/register/*" element={ <RegisterInside /> } />
                            <Route path="/*" element={ <LoginInside /> } />
                            
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <HomePage /> } />
                            <Route path="/receta/:recipeid" element={ <RecipePage /> } />
                            <Route path="/user/:userid" element={ <UserPage /> } />
                            <Route path="/receta" element={ <RecipePage /> } />
                            <Route path="/crearReceta" element={ <CrearReceta /> } /> 
                            <Route path="/loles" element={ <Mainete /> } />                               
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }

        </Routes>
    )
}
