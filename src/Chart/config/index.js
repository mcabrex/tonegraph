import data from "./data"
import plugins from "./plugins"
import scales from "./scales"

const chartConfig = (dataArr) => {
    return {
        type: 'line',
        data: data(dataArr),
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