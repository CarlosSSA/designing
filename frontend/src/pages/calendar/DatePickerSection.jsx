import * as React from 'react';
import DailyRecipes from './DailyRecipes';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useSelector } from 'react-redux';


function DatePickerSection({recetasCalendario, obtenerRecetas}) {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate())));
  const [showDailyRecipes, setShowDailyRecipes] = useState(false);

  useEffect(() => {
    setShowDailyRecipes(true);
    console.log("DatepickerSection: Useeffect fecha :", selectedDate.toUTCString());
  }, [selectedDate]);

  const sigFecha = () => {
    const newDate = new Date(selectedDate);
    newDate.setUTCDate(selectedDate.getUTCDate() + 1);
    setSelectedDate(newDate);
    setShowDailyRecipes(false);
  };
  
  const prevFecha = () => {
    const newDate = new Date(selectedDate);
    newDate.setUTCDate(selectedDate.getUTCDate() - 1);
    setSelectedDate(newDate);
    setShowDailyRecipes(false);
  };

  return (
    <>
      <h3>Tus recetas diarias</h3>
      <div style={{ display: "inline-block" }}>
        <button onClick={prevFecha}>&lt;</button>
        <p style={{ display: "inline-block" }}>{selectedDate.toUTCString().split(' ').slice(0, 4).join(' ')}</p>
        <button onClick={sigFecha}>&gt;</button>
      </div>
      {recetasCalendario && showDailyRecipes && 
         <DailyRecipes fecha={selectedDate} recetas={recetasCalendario} obtenerRecetas={obtenerRecetas} />
      }      
    </>
  );
}

export default DatePickerSection; 

