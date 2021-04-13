import React, { Component } from 'react'
import Chart from 'chart.js/auto';
import Loader from "react-loader-spinner";

import {noteInterpolater,dataSetGenerator} from "./chartData"
import chartConfig from './chartConfig'

export default class LineChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartWidth: 0,
        };
        this.chartRef = React.createRef();
    }

    componentDidMount(){
        // console.log('props',this.props.data)
        const measureListData = this.props.data['score-partwise']['part'].map(part => part['measure'])     
        console.log('measureListData',measureListData)
        const noteDataLists = measureListData.map((measureList,ind,partsArr) => {
            const qpm = partsArr[0][0]['sound'][1]['$tempo']
            return noteInterpolater({measureList,qpm})
        })

        console.table('noteDataLists',noteDataLists)
        const datasets = noteDataLists.map((noteList,ind) => {
                return dataSetGenerator(noteList,ind)
        }).flat()
        
        // console.log('datasets',datasets)

        //used to scale the scrollable width
        const dataWidths = Math.max(...datasets.map(set => set.data.length))
        
        if(this.state.chartWidth === 0){
            this.setState({
                chartWidth: dataWidths
            })
        }

        const chartRef = this.chartRef.current.getContext('2d')
        new Chart(chartRef, chartConfig(datasets));
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
