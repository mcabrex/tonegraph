import scales from "./scales"
import plugins from './plugins'
import dataSets from './data'

const chartConfig = (data) => {
    return {
        type: 'line',
        data: dataSets(data),
        options: {
            responsive: true,
            maintainAspectRatio: false,  
            elements: {
                point: {
                    radius: 0,
                    pointHitRadius: 2
                },
            },
            scales,
            plugins
        },
    };
}

export default chartConfig