import React from 'react';
import { Line } from 'react-chartjs-2';

const GraficoKcal = ({ kcalData, kcalGoal, weekDates }) => {
    const goalData = new Array(kcalData.length).fill(kcalGoal);

    //Días de la semana

    

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
