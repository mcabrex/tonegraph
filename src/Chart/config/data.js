import {noteInterpolater,dataSetGenerator} from "./util"

const data = (partsList) => {
    //interpolate data here
    console.log('data partsList',partsList)
    return {
        datasets: partsList.map(partObj => {
            //take the measure array (part['measure]) and turn it into a sequence of note objects in order
            const noteObjects = noteInterpolater(partObj['measure'])
            const noteArr =  dataSetGenerator(noteObjects)

            return {
                label:'Pitch',
                data: noteArr.map(note => {
                    return {
                        x: note.time,
                        y: note.frequency
                    }
                }),
                fill: false,
                stepped: 'after',
                borderColor: '#489AEC',
            }
        }),
        steppedLine: 'middle',
    }
}

export default data