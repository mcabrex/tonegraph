import data from "./data"
import scales from "./scales"
import plugins from './plugins'

const chartConfig = ({partData,partNames}) => {
    return {
        type: 'line',
        data: data(partData,partNames),
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