import React, { useEffect, useState } from 'react';
import CajaDatos from '../profile/CajaDatos';
import GraficoKcal from './GraficoKcal';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GraficoPeso from '../miDiario/GraficoPeso';
import { useAuthStore } from '../../hooks/useAuthStore';


const MiDiario = () => {
  const [weekDates, setWeekDates] = useState([]);
  const [kcalData, setKcalData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [esISOweeks, setEsISOweeks] = useState([0, 0, 0, 0, 0, 0, 0]);
  const {user} = useSelector(state => state.auth);

  const { startUsuarioIndividual, startGetKcalsPerWeek } = useAuthStore();
  
  useEffect(() => {
    
      const getWeekDates = () => {
          let now = new Date();
          let dayOfWeek = now.getDay();
          let numDay = now.getDate();
          let start = new Date(now);
          start.setDate(numDay - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
          let end = new Date(now);
          end.setDate(numDay + (7 - dayOfWeek));
          let days = [];
          for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
              days.push(new Date(d));
          }
          console.log("days", days)
          return days;
      }

      setWeekDates(getWeekDates().map(d => `${d.getDate()}/${d.getMonth() + 1}`));
      const isoWeekDates = getWeekDates().map(d => d.toISOString());
      
      setEsISOweeks(isoWeekDates)

     
  }, []);

  useEffect(() => {

    // Para evitar que se lance cuando es un [0,0,0,0,0,0]
    if(esISOweeks[0] !== 0){

    const fetchKcals = async () => {
        console.log("lanzo la funcion fetchKcals")
        console.log("lanzo la funcion fetchKcals uid", user.uid) //undefined
        console.log("lanzo la funcion fetchKcals esISOweeks", esISOweeks.length)
        console.log("lanzo la funcion fetchKcals esISOweeks", esISOweeks)

        if (user.uid && esISOweeks.every(date => typeof date === 'string' && date !== '0')) {
            console.log("debería estar llamando a startGetKcalsPerWeek dentro del if")
            console.log("le pasaria uid", user.uid)
            console.log("le pasaria datesArray", esISOweeks)
            
            const {kcals} = await startGetKcalsPerWeek({ uid: user.uid, datesArray: esISOweeks });
            
            setKcalData(kcals);
            
        }
    };
    fetchKcals();
    console.log("iso weeks", esISOweeks)
  

    } //if
}, [esISOweeks]);
 
  return (
      <>
          <h1>Mi Diario</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <CajaDatos />
          </div>
          <div>
              <h2>Kcals Semanales</h2>
              <GraficoKcal kcalData={kcalData} kcalGoal={2000} weekDates={weekDates} />
              <h2>Evolución Peso</h2>
              <GraficoPeso />
          </div>
      </>
  );
};

export default MiDiario;