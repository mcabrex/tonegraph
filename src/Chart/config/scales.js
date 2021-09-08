const scales = {
    x: {
        type: 'linear',
        beginAtZero: true,
        grid: {
            display: false
        },
        ticks: {
            min: -1,
            max: 8,
            stepSize: 1,
            fixedStepSize: 1,
        },
        display: false
    },
    y: {
        grid: {
            display: false
        }
    }
} 

export default scales