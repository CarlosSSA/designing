import * as React from 'react';
import DailyRecipes from './DailyRecipes';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useSelector } from 'react-redux';


function DatePickerSection({recetasCalendario, obtenerRecetas}) {

  const [selectedDate, setSelectedDate] = useState(new Date());  

  const sigFecha = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
    console.log("Nueva Fecha  +1 selectedDate" ,selectedDate);
    console.log("selectedDate.toDateString", selectedDate.toDateString())
  };
  
  const prevFecha = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
    console.log("Nueva fecha -1", selectedDate);
    console.log(selectedDate.toDateString());
  };
 
  return (
    <>
      <h3>Tus recetas diarias</h3>
      <div style={{ display: "inline-block" }}>
        <button onClick={prevFecha}>&lt;</button>      
        <p style={{ display: "inline-block" }}>{selectedDate.toDateString()}</p>
        <button onClick={sigFecha}>&gt;</button>
      </div>
      {recetasCalendario && <DailyRecipes fecha={selectedDate} recetas={recetasCalendario} obtenerRecetas={obtenerRecetas} />}      
    </>
  );
  }

export default DatePickerSection;

