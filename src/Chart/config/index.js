import data from "./data"
import plugins from "./plugins"
import scales from "./scales"

const chartConfig = (partsList) => {
    return {
        type: 'line',
        data: data(partsList),
        options: {
            responsive: true,
            maintainAspectRatio: false,  
            elements: {
                point: {
                    radius: 0,
                    pointHitRadius: 2
                },
            },
            plugins,    
            scales
        },
    };
}

export default chartConfig