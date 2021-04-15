import {noteFrequency} from "../notes"
import 'chartjs-adapter-luxon';
import { Duration } from "luxon";

export const noteInterpolater = ({measureList,qpm}) => {
    //here we define a note object
    const noteDataList = []
    let lastDivisions = ''
    measureList.forEach((measure)=> {
        let currentDivisions = measure['attributes'][0]['divisions'] 
        if(currentDivisions !== undefined) lastDivisions = currentDivisions
        measure['note'].forEach((note,ind) => {
            const {pitch,duration,voice,chord} = note
            if(chord && ind > 0) return
            //this if statement makes it so we only use the basenote for the frequency chart
            const noteObj = {
                qpm,
                divisions: currentDivisions === undefined ? lastDivisions : currentDivisions,
                //divisions is the number of divisions per quarter note
                pitch,
                duration,
                voice,
                chord
            }
            noteDataList.push(noteObj)
        })
    })
    return noteDataList
}

export const dataSetGenerator = (noteDataList) => {
    const data = []
    let time = Duration.fromObject({})
    noteDataList.forEach((noteObj,ind,list)=>{
        const {qpm,divisions,duration,pitch,voice} = noteObj
        const qps = qpm / 60
        const quarterNoteValInSecs = 1/qps
        const noteLength = (quarterNoteValInSecs/divisions) * duration 
        const frequency = noteFrequency({fixedNote:pitch})
        if(ind === 0){
            //initializing time 
            data.push({
                x:+time.as('seconds').toFixed(2),
                y:frequency
            })
        }
        
        time = time.plus(Duration.fromObject({
            seconds: noteLength
        }))

        data.push({
            x:+time.as('seconds').toFixed(2),
            y:frequency
        })
        
    })

    return data
}



