import React, { useEffect } from 'react';
import './GraficoSuperior.css';
import Donut from './Donut';



export default function GraficoSuperior({kcalObjetivo, totales})  {

  useEffect(() => {
    console.log("Que recibo en totales en GraficoSuperior?", totales)
    
  }, []);
  return (
    <div className="graph-container">
      <div className="donut-wrapper">
        <span className="calorie-objective">Objetivo: {kcalObjetivo}kcal</span>
        <Donut totales={totales} kcalObjetivo={kcalObjetivo} />
        <span className="calorie-remaining">Restantes: {kcalObjetivo-totales.kcal}</span>
      </div>
      <div className="macro-values">
        <div>Carbohidratos: {totales.hcs}/250g</div>
        <div>Proteínas: {totales.proteinas}/150g</div>
        <div>Grasas: {totales.grasas}/70g</div>
      </div>
    </div>
  );
}