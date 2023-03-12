import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useRecipeStore } from '../../hooks/useRecipeStore';




export const RecipePage = () => {

 const {startSelectRecipe} = useRecipeStore()
 const {recipeid} = useParams()
 const [data, setData] = useState({})
 
  // Llamada a BBDD para recoger datos de esta receta en concreto

console.log("antes del useeffect", recipeid);
 useEffect(() => {
   const fetchData = async() =>{
    try {
      const data = await startSelectRecipe(recipeid)
      setData(data);
    } catch (error) {
      console.log(error);
    }
    
   } 
   fetchData()
 }, [])
 
 console.log("lo que me llega del hook", data);

   // construir la pagina, meterle los valores nutricionales, la lista de ing y el boton de ADD y EDIt

   // investigar como meter imagenes, va con multer
    // hacer una subida a git si eso xD


  return (
    <>
    {data.receta ? (
      <div>El autor de la receta es {data.receta.autor.nombre}</div>
    ) : (
      <div>Cargando...</div>
    )}
  </>
  )
}
