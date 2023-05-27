import React from 'react';
import { Line } from 'react-chartjs-2';

const GraficoKcal = ({ kcalData, kcalGoal }) => {
    // Crear un array con el objetivo de calorías para cada día
    const goalData = new Array(kcalData.length).fill(kcalGoal);

    // Datos para el gráfico
    const data = {
        labels: [...Array(kcalData.length).keys()].map(day => `Day ${day + 1}`),
        datasets: [
            {
                label: 'Calorías consumidas',
                data: kcalData,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Objetivo de calorías',
                data: goalData,
                fill: '+1', // Esta propiedad rellena el área entre este dataset y el anterior
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    // Opciones para el gráfico
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default GraficoKcal;
