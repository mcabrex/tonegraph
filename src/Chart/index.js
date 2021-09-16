import React, {useRef,useEffect,useState} from 'react'
import Chart from 'chart.js/auto';
import config from './config'
import dataSets from './config/data'

import './Chart.css'

const LineChart = (props) => {
    const {data} = props
    const setLengths = data["score-partwise"]["part"].map(part => +part['measure'].length)
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current && !chartInstance) {
            //runs on instance start
            const newChartInstance = new Chart(chartContainer.current, config(data));
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    useEffect(() => {
        //runs on props change (props.data)
        if(chartInstance && data){
            chartInstance.data = dataSets(data);
            chartInstance.update();
        }
    },[props.data])

    return (
        <div className="chart-outer-wrapper">
            <div className="chart-inner-wrapper" style={{
                width: `${Math.max(...setLengths)*35*5}px`
            }}>
                <canvas id="myChart" ref={chartContainer}></canvas>
            </div>
        </div>
    )
}

export default LineChart
