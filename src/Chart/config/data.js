import {noteInterpolater,dataSetGenerator} from "./util"

const COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
  ];

const data = (partData,partNames) => {
    //interpolate data here
    const datasets = {
        datasets: partData.map((partObj,ind) => {
            //take the measure array (part['measure]) and turn it into a sequence of note objects in order
            const noteObjects = noteInterpolater(partObj['measure'])
            const noteArr =  dataSetGenerator(noteObjects)

            return {
                label:`${partNames[ind]}`,
                data: noteArr.map(note => {
                    return {
                        x: note.time,
                        y: note.frequency
                    }
                }),
                fill: false,
                stepped: 'after',
                borderColor: COLORS[ind%COLORS.length],
            }
        }),
    }
    console.log('datasets',datasets) 
    return datasets
}

export default data