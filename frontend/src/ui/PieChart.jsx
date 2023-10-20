import ApexCharts from 'apexcharts'

const PieChart = ()=> {
    const [options, setOptions] = useState({
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    });

    const [series, setSeries] = useState([44, 55, 41, 17, 15]);

    return (
        <div id="chart">
            <ApexCharts options={options} series={series} type="donut" />
        </div>
    );
}

export default PieChart;