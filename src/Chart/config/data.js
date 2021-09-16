import {noteFrequency} from "../../notes"

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

const dataSets = (data) => {
    const partNames = data["score-partwise"]["part-list"]["score-part"].map(part=>part['part-name'])
    const partData = data["score-partwise"]["part"]
    //interpolate data here
    return {
        datasets: partData.map((partObj,ind) => {
            //take the measure array (part['measure]) and turn it into a sequence of note objects in order
            const noteObjects = noteInterpolater(partObj['measure'])
            const noteArr = dataSetGenerator(noteObjects)

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
}


const noteInterpolater = (measureList) => {
    //recieves a list of measures
    //creates a list of noteObjects in order
    const noteDataList = []
    let lastDivisions = ''
    measureList.forEach((measure)=> {
        let currentDivisions = measure['attributes'][0]['divisions'] 
        if(currentDivisions !== undefined) lastDivisions = currentDivisions
        measure['note'].forEach((note,ind) => {
            //define note objects here and push to the noteDataList
            const {pitch,duration,voice,chord,rest} = note
            if(chord && ind > 0) return
            //this if statement makes it so we only use the basenote for the frequency chart
            const noteObj = {
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


const dataSetGenerator = (noteDataList) => {
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


export default dataSets