import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler  } from 'chart.js';
import { useSelector } from 'react-redux';
import { useAuthStore } from "../../hooks/useAuthStore";


const GraficoPeso = () => {
    
    const {startUpdateGraficoPeso,startUsuarioIndividual} = useAuthStore();
    const {user} = useSelector(state => state.auth);

    const [weights, setWeights] = useState([]);
    const [dates, setDates] = useState([]);
    const [stateUid, setStateUid] = useState();


    useEffect(() => {
        const obtenerUsuario = async () => {
          const miUsuario = await startUsuarioIndividual({uid: user._id});
          if(miUsuario){
            setWeights(miUsuario.registroPeso.pesos);
            setDates(miUsuario.registroPeso.fechas);
            setStateUid(user._id);
            console.log(" UseEffect en Grafico Peso me llega esto del usuario", miUsuario)
        }
        };
        obtenerUsuario();
        console.log("UseEffect en Grafico Peso que tengo en pesos", weights);
        console.log("UseEffect en Grafico Peso que tengo en fechas", dates);
      }, []);
  

      
 
  Chart.register(
    
    CategoryScale,
    LinearScale, 
    PointElement,
    LineElement,
    Title, 
    Tooltip,
    Legend, 
    Filler

  );

  const addWeight = () => {
    let newWeight = prompt('Ingresa tu peso actual:'); //1
    if (newWeight) {
        setWeights(prevWeights => [...prevWeights, newWeight]); 
        setDates(prevDates => [...prevDates, new Date().toISOString()]);        
        startUpdateGraficoPeso({uid:stateUid, pesos:[...weights, newWeight],fechas:[...dates, new Date().toISOString()]});
        // 
    }
    
    
};

  const data = {
    labels: dates.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Peso',
        data: weights,
        fill: false,
        backgroundColor: 'rgb(75,192,192)',
        borderColor: 'rgba(75,192,192,0.2)',
        pointRadius:5,
        tension:0.5
      },
    ],
  };

  const options = {
    
  };

  return (
    <div>
      <Line key={weights.length} data={data} options={options} />
      <Button variant="contained" color="primary" onClick={addWeight}>
        Añadir Peso
      </Button>
    </div>
  );
};

export default GraficoPeso;
