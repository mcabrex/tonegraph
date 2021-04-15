import { DateTime,Duration } from "luxon";


const chartConfig = (dataArr) => {
    console.log('config data',dataArr)

    return {
        type: 'line',
        data: {
            datasets: [{
                label:'pitch',
                data: dataArr[0].map(obj => {
                   return {
                    x: obj.x,
                    y: obj.y
                   }
                }),
                fill: false,
                stepped: 'after',
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
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return +Duration.fromISOTime(value).as('seconds')
                        }
                    },
                    grid: {
                        display: false
                    },
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }    
        },
    };
}

export default chartConfig