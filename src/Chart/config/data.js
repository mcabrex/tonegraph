const data = (arr) => {
    return {
        datasets: [{
            label:'Pitch',
            data: arr[0].map(obj => {
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
    }
}

export default data