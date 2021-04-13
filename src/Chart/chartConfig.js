const chartConfig = (datasets) => {
    console.log('config data',datasets)
    return {
        maintainAspectRatio: false,
        responsive: true,
        type: 'line',
        data: {
            datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,     
            legend: {
                display: false
            },          
            scales: {
                xAxes: [{
                    distribution: 'linear',
                    type: 'time',
                    time: {
                        unit: 'millisecond',
                        displayFormats: {
                            'millisecond': 'SSS' 
                        }
                    },
                }],
            },
        },
    };
}

export default chartConfig