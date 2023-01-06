import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import Album from '../pages/home/HomePage';
import LoginInside from '../pages/login/Login';
import RegisterInside from '../pages/login/Register';
import { RecipePage } from '../pages/recipe/RecipePage';
import  UserPage from '../pages/user/UserPage';    


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
                            <Route path="/" element={ <Album /> } />
                            <Route path="/receta/:recipeid" element={ <RecipePage /> } />
                            <Route path="/user/:userid" element={ <UserPage /> } />
                            <Route path="/receta" element={ <RecipePage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }

        </Routes>
    )
}
