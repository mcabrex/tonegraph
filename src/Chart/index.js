import React, {useRef,useEffect,useState} from 'react'
import Chart from 'chart.js/auto';
import config from './config'
import dataSets from './config/data'

import './Chart.css'

const LineChart = (props) => {
    const {data} = props
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current && !chartInstance) {
            //runs on instance start
            const newChartInstance = new Chart(chartContainer.current, config(data));
            setChartInstance(newChartInstance);
        }
        if(chartInstance && data){
            //runs on props change (props.data)
            chartInstance.data = dataSets(data);
            chartInstance.update();
        }
    }, [chartContainer,props.data]);

    return (
        <div className="chart-outer-wrapper">
            <div className="chart-inner-wrapper">
                <canvas id="myChart" width="0" ref={chartContainer}></canvas>
            </div>
        </div>
    )
}

export default LineChart
