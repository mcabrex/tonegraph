import React, { Component } from 'react'
import Chart from 'chart.js';

import {noteInterpolater,dataSetGenerator} from "./chartData"

export default class LineChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartWidth: 0
        }
    }

    componentDidUpdate(){
        console.log('props',this.props.measureListData)
        if(!this.props.measureListData) return

        const noteDataLists = this.props.measureListData.map((measureList,ind,partsArr) => {
            //this is some pretty bad time complexity so try to optimize it later lol
            const qpm = partsArr[0][0]['sound'][1]['$tempo']
            return noteInterpolater({measureList,qpm})
        })

        console.table('noteDataLists',noteDataLists)
        const datasets = noteDataLists.map((noteList,ind) => {
                return dataSetGenerator(noteList,ind)
        }).flat()
        
        console.log('datasets',datasets)

        //used to scale the scrollable width
        const dataWidths = Math.max(...datasets.map(set => set.data.length))
        
        if(this.state.chartWidth === 0){
            this.setState({
                chartWidth: dataWidths
            })
        }

        const ctx = document.getElementById('myChart').getContext('2d');

        const myChart = new Chart(ctx, {
            maintainAspectRatio: false,
            responsive: true,
            type: 'line',
            data: {
                datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,     
                legend: {
                    labels: {
                       filter: function(label) {
                          if (label.text !== 'chord') return true;
                       }
                    }
                 },                          
                scales: {
                    xAxes: [{
                        distribution: 'linear',
                        type: 'time',
                        time: {
                            unit: 'millisecond',
                            displayFormats: {
                                'millisecond': 'SSS' 
                            }
                        },
                    }],
                },
            },
        });

    }
    
    render() {
        const {chartWidth} = this.state
        return (
            <div className="chart-outer-wrapper">
                <div className="chart-inner-wrapper" style={{
                    width: chartWidth ? `${chartWidth * 12.5}px` : '300px',
                    height: '500px'
                }}>
                    <canvas id="myChart" width="0"></canvas>
                </div>
            </div>
        )
    }
}
