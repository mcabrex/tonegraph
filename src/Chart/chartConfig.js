const chartConfig = (dataArr) => {
    console.log('config data',dataArr)

    return {
        type: 'line',
        data: {
            labels: dataArr[0].map(obj => obj.x),
            datasets: [{
                label:'pitch',
                data: dataArr[0].map(obj => obj.y),
                fill: false,
                stepped: 'middle',
                borderColor: '#489AEC',
            }],
            steppedLine: 'middle',
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  
            elements: {
                point: {
                    pointStyle: 'line'
                },
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'millisecond'
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            console.log('value',value)
                            return value.slice(8,11);
                        }
                    }
    
                  },
            }    
        },
    };
}

export default chartConfig