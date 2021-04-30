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
    const data = []
    let time = Duration.fromObject({
        seconds: 0
    })

    noteDataList.forEach((noteObj,ind,list)=>{
        const {qpm,divisions,duration,pitch,voice,rest} = noteObj
        const qps = qpm / 60
        const quarterNoteValInSecs = 1/qps
        const noteLength = (quarterNoteValInSecs/divisions) * duration 
        const frequency = noteFrequency({
            fixedNote:pitch,
            rest
        })

        if(ind === 0){
            //initializing time 
            data.push({
                'time':time.toISOTime(),
                'frequency':frequency
            })
        }
        
        time = time.plus(Duration.fromObject({
            seconds: noteLength.toFixed(2)
        }))

        data.push({
            'time':time.toISOTime(),
            'frequency':frequency
        })
    })

    return data
}
