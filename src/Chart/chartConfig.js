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
                    radius: 0,
                    pointHitRadius: 2
                },
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second'
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: function(value,index,values){
                            return +Duration.fromISOTime(value.slice(0,8)).as('seconds') % 43200;
                            //chartjs by default gives time values as ISOTime with an AM/PM at the end
                            //Duration defaults at 12:00 (43200 hours)
                        },
                    }
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