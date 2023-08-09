import React from 'react';
import { Line } from 'react-chartjs-2';

const GraficoKcal = ({ kcalData, kcalGoal }) => {
    const goalData = new Array(kcalData.length).fill(kcalGoal);

    //Días de la semana

    const getWeekDates = () => {
        let now = new Date();
        let dayOfWeek = now.getDay(); // 0-6, 0 es domingo, 6 es sábado
        let numDay = now.getDate();
    
        let start = new Date(now); // Copiar la fecha actual
        start.setDate(numDay - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Ajustar al lunes anterior
    
        let end = new Date(now);  // Copiar la fecha actual
        end.setDate(numDay + (7 - dayOfWeek)); // Ajustar al próximo domingo
    
        let days = [];
        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
        }
    
        return days;
    }
    
    const weekDates = getWeekDates().map(d => `${d.getDate()}/${d.getMonth() + 1}`); // Formato: día/mes
    

    const data = {
        labels: weekDates,
        datasets: [
            {
                label: 'Calorías consumidas',
                data: kcalData,
                fill: 'start', // Rellena el área debajo de la línea
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo más transparente
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: 'Objetivo de calorías',
                data: goalData,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                borderDash: [5, 5], // Línea punteada para el objetivo
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                intersect: false,
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
    };

    return <Line data={data} options={options} />;
};

export default GraficoKcal;
