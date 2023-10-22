import React, { Component } from "react";
import Chart from "react-apexcharts";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        labels: ['Kcals']
      },  
      series: [this.props.totales || 50]
    };
  }

  render() {
    const { totales, kcalObjetivo} = this.props;
    const porcentaje = (totales.kcal / kcalObjetivo) * 100;

    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              // Si deseas usar "totales" directamente en el render:
              series={[porcentaje || 50]}
              type="radialBar"
              width="250"
            />
          </div>
        </div>
      </div>
    );
}
}

export default Donut;