import React, { Component } from 'react'
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

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

        this.setState({
            chartWidth: data["score-partwise"]["measure-list"]["score-measure"].length*16,
        })

        const chartRef = this.chartRef.current.getContext('2d')
        new Chart(chartRef, config(partData));
    }
    
    render() {
        const {chartWidth} = this.state

        return (
            <div className="chart-outer-wrapper">
                <div className="chart-inner-wrapper" style={{
                    width: chartWidth ? `${chartWidth * 12.5}px` : '300px',
                    height: '500px'
                }}>
                    <canvas id="myChart" width="0" ref={this.chartRef}></canvas>
                </div>
            </div>
        )
    }
}
