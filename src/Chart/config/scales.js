import { Duration } from "luxon";

const scales = {
    x: {
        type: 'time',
        time: {
            unit: 'second'
        },
        grid: {
            display: false
        },
        ticks: {
            stepSize: 10,
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

export default scales