import React from 'react'
import { useParams } from 'react-router-dom';

export const RecipePage = () => {
  const {recipeid} = useParams();
  return (
    <div>El id de la receta es {recipeid} </div>
    
  )
}
