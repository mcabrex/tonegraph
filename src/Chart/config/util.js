import {noteFrequency} from "../../notes"
import 'chartjs-adapter-luxon';
import { Duration } from "luxon";

export const noteInterpolater = (measureList) => {
    //create a list of noteObjects in order
    const noteDataList = []
    let lastDivisions = ''
    let qpm = 0
    measureList.forEach((measure)=> {
        let currentDivisions = measure['attributes'][0]['divisions'] 
        if(currentDivisions !== undefined) lastDivisions = currentDivisions
        if(measure['sound']) qpm = measure['sound'][1]['$tempo']
        measure['note'].forEach((note,ind) => {
            //define note objects here and push to the noteDataList
            const {pitch,duration,voice,chord,rest} = note
            if(chord && ind > 0) return
            //this if statement makes it so we only use the basenote for the frequency chart
            const noteObj = {
                qpm,
                divisions: currentDivisions === undefined ? lastDivisions : currentDivisions,
                //divisions is the number of divisions per quarter note
                pitch,
                duration,
                voice,
                chord,
                rest
            }
            noteDataList.push(noteObj)
        })
    })
    return noteDataList
}


export const dataSetGenerator = (noteDataList) => {
    const data = [{
        'time':0,
        'frequency':0
    }]
    let time = 0

    noteDataList.forEach((noteObj,ind,list)=>{
        const {divisions,duration,pitch,rest} = noteObj
        const frequency = noteFrequency({
            fixedNote:pitch,
            rest
        })
        
        time+=(4/divisions*duration)
        data.push({
            'time':time,
            'frequency':frequency
        })
    })

    return data
}
