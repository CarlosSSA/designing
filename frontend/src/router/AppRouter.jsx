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
import Categorias from '../pages/categorias/Categorias';
import Cesta from '../pages/cesta/Cesta';
import Premium from '../pages/premium/Premium';
import BusquedaAvanzada from '../pages/avanzada/BusquedaAvanzada';
import UserProfile from '../pages/profile/UserProfile';
import UserCalendar from '../pages/calendar/UserCalendar';
import MiDiario from '../pages/miDiario/MiDiario';
import HarrisTest from '../pages/test/HarrisTest'; 
import IngredientUpload from '../pages/subirIngrediente/IngredientUpload';


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
                            <Route path="/recipe/:recipeid" element={ <RecipePage /> } />
                            <Route path="/user/:userid" element={ <UserPage /> } />
                            <Route path="/recipe" element={ <RecipePage /> } />
                            <Route path="/crearReceta" element={ <CrearReceta /> } /> 
                            <Route path="/loles" element={ <Mainete /> } />  
                            <Route path="/categorias" element={ <Categorias /> } />    
                            <Route path="/cesta" element={ <Cesta /> } />  
                            <Route path="/premium" element={ <Premium /> } />
                            <Route path="/busquedaAvanzada" element={ <BusquedaAvanzada /> } />
                            <Route path="/misdatos" element={ <MiDiario /> } />
                            <Route path="/midiario" element={ <MiDiario /> } />
                            <Route path="/userCalendar" element={ <UserCalendar /> } /> 
                            <Route path="/miperfil" element={ <UserProfile /> } />  
                            <Route path="/test" element={ <HarrisTest /> } />   
                            <Route path="/ingredientUpload" element={ <IngredientUpload /> } />                
                            <Route path="/*" element={ <Navigate to="/" /> } />
                            
                        </>
                    )
            }

        </Routes>
    )
}
