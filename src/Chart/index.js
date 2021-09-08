import React, { Component } from 'react'
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import './Chart.css'

import config from './config'

export default class LineChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartWidth: 0,
        };
        this.chartRef = React.createRef();
    }

    componentDidMount(){
        const {partData,data} = this.props  
        const partNames = data["score-partwise"]["part-list"]["score-part"].map(part=>part['part-name'])
        this.setState({
            chartWidth: data["score-partwise"]["measure-list"]["score-measure"].length*32*5,
        })
        const chartRef = this.chartRef.current.getContext('2d')
        new Chart(chartRef, config({partData,partNames}));
    }
    
    render() {
        const {chartWidth} = this.state

        return (
            <div className="chart-outer-wrapper">
                <div className="chart-inner-wrapper" style={{
                    width: chartWidth ? `${chartWidth}px` : '300px',
                }}>
                    <canvas id="myChart" width="0" ref={this.chartRef}></canvas>
                </div>
            </div>
        )
    }
}
