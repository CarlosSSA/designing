import React from 'react';
import './UserProfile.css';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import RecipeReviewCard from '../../ui/Tarjeta'
import recipeModel from '../../../../backend/database/models/recipeModel';
import { useAuthStore } from '../../hooks/useAuthStore';
import RecipeCalendarCard from '../calendar/RecipeCalendarCard';
import TarjetaRecetaProfile from './TarjetaRecetaProfile';




const UserProfile = () => {
  

  const { user } = useSelector(state => state.auth) // con esto pillo el slice
  console.log("que me viene en user?", user);

  const [usuarioPopulado, setUsuarioPopulado] = useState()

  // tengo que recoger todos los datos de las recetas una vez tengo el user
  // ver si me popula llamando a usuarioIndividual pasandole el uid simplemente
  const {startUsuarioIndividual} = useAuthStore();

  const popularUsuario = async () => {
    
    const usuarioPopulado = await startUsuarioIndividual({uid:user.uid});
    console.log("El usuario populado que me llega", usuarioPopulado);      
    setUsuarioPopulado(usuarioPopulado)
    
  }; 

  useEffect(() => {
    popularUsuario();
  }, []);

  // Si el campo calorías objetivo no viene definido, entoences muestro el componente de formulario
  const tabNames = ["Mis Recetas","Me Gustan", "Favoritas"];
  const [value, setValue] = useState(tabNames[0]);
  const handleChange = (event, newValue) => {
    setValue(tabNames[newValue]);
  };

  // me falta definir el prop de user, necesito al usuario? o casi mejor hago un Selector del auth y una llamada a la BBDD y recojo todo

  return (
    
    <div className="profile-container">
      
      <div className="profile-header">
        <img src={user ? user.nombre || "ruta/default/avatar.jpg" : "ruta/default/avatar.jpg"} alt="Avatar del usuario" className="user-avatar" />
        <div className="profile-info">
          <h2>{user ? user.nombre : ""}</h2>
          <div className="profile-stats">
            <span>{user && user.recetas ? user.recetas.length : 0} publicaciones</span>
            <span>{user && user.followers ? user.followers.length : 0} seguidores</span>
            <span>{user && user.following ? user.following.length : 0} seguidos</span>
          </div>
      </div>
    </div>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <Tabs value={value} onChange={handleChange} centered>
                  <Tab label="Mis Recetas" />
                  <Tab label="Me Gustan" />
                  <Tab label="Favoritas" />            
                  </Tabs>
        </Box>
      
        {value === "Mis Recetas" ? (
        <div>

          Mis Recetas
            
          {
        usuarioPopulado && usuarioPopulado.recetas.length > 0 
        ? 
        usuarioPopulado.recetas.map((recipe) => (
            <TarjetaRecetaProfile 
                key={recipe._id} 
                nombre={recipe.nombre} 
                autor={recipe.autor.nombre} 
                receta={recipe} 
                descripcion={recipe.descripcion} 
                likes={recipe.likes.length} 
                comments={recipe.comentarios.length}
            />
        ))
        : 
        <p>Aun no has creado ninguna receta</p>
    }

        </div>               
           
      ) : value === "Me Gustan" ? (
        <div>

          Recetas que Me Gustan
          
          {
        usuarioPopulado && usuarioPopulado.likedRecipes.length > 0 
        ? 
        usuarioPopulado.likedRecipes.map((recipe) => (
            <TarjetaRecetaProfile 
                key={recipe._id} 
                nombre={recipe.nombre} 
                autor={recipe.autor.nombre} 
                receta={recipe} 
                descripcion={recipe.descripcion} 
                likes={recipe.likes.length} 
                comments={recipe.comentarios.length}
            />
        ))
        : 
        <p>Aun no has dado Like a ninguna receta</p>
    }
          

        </div>
      ) : value === "Favoritas" ? (
        <div>

          Recetas Favoritas

          {
        usuarioPopulado && usuarioPopulado.favRecipes.length > 0 
        ? 
        usuarioPopulado.favRecipes.map((recipe) => (
            <TarjetaRecetaProfile 
                key={recipe._id} 
                nombre={recipe.nombre} 
                autor={recipe.autor.nombre} 
                receta={recipe} 
                descripcion={recipe.descripcion} 
                likes={recipe.likes.length} 
                comments={recipe.comentarios.length}
            />
        ))
        : 
        <p>Aun no has guardado en favoritos ninguna receta</p>
    }

        </div>
      ) : (
        <div>

          Mis Recetas

          {
        usuarioPopulado && usuarioPopulado.recetas.length > 0 
        ? 
        usuarioPopulado.recetas.map((recipe) => (
            <TarjetaRecetaProfile 
                key={recipe._id} 
                nombre={recipe.nombre} 
                autor={recipe.autor.nombre} 
                receta={recipe} 
                descripcion={recipe.descripcion} 
                likes={recipe.likes.length} 
                comments={recipe.comentarios.length}
            />
        ))
        : 
        <p>Aun no has creado ninguna receta</p>
    }

        </div>
      )}
     
    </div>
    
  );
  
}

export default UserProfile;
