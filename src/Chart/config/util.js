import {noteFrequency} from "../../notes"

export const noteInterpolater = (measureList) => {
    //recieves a list of measures
    //creates a list of noteObjects in order
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
    let times = {}
    const dataSets = {}
    let voiceNum = 0
    let data = []

    noteDataList.forEach((noteObj,ind,list)=>{
        const {divisions,duration,pitch,rest,voice} = noteObj
        const frequency = noteFrequency({
            fixedNote:pitch,
            rest
        })

        if(!times[+voice]){
            times[+voice] = 0
            dataSets[+voice] = [{
                'time':0,
                'frequency':0
            }]
            //initialize data points at 0 and set the steppedLine point to 'after' to simulate the passage of time
            voiceNum++
        }
        console.log(times)

        times[+voice]+=(4/divisions*duration)
        dataSets[+voice].push({
            'time':times[+voice],
            'frequency':frequency
        })
    })

    for(let i = 1; i < voiceNum+1;i++){
        data.push(dataSets[i])
    }
    return data.flat()
}
