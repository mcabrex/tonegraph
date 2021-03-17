import {noteFrequency} from "./notes"

export const noteInterpolater = ({measureList,qpm}) => {
    //here we define a note object
    const noteDataList = []
    let lastDivisions = ''
    measureList.forEach((measure,ind,measureArr)=> {
        let currentDivisions = measure['attributes'][0]['divisions'] 
        if(currentDivisions !== undefined) lastDivisions = currentDivisions
        measure['note'].forEach(note => {
            const {pitch,duration,voice,chord} = note
            const noteObj = {
                qpm,
                divisions: currentDivisions !== undefined ? currentDivisions : lastDivisions,
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

export const dataSetGenerator = (noteDataList,part) => {
    //dataSetGenerator needs to take in a singular array of data and return an array of data objects 

    const timeArr = []
    const dataArr = []
    const voiceList = []
    const palette = [
        "#356de1",
        "#ea2350",
        "#b48815",
        "#e055f1",
        "#a8f564",
        "#d76db8",
        "#749829",
        "#74da7d",
        "#e78fba",
        "#8a55df",
        "#b94c92",
        "#d98efa",
        "#b5bf74",
        "#7f01f",
        "#9cc50f",
        '#6600FF'
    ]        
    const lineColor = palette[part % palette.length]
    const lastNote = {
        frequency : 0
    }

    noteDataList.forEach((noteObj,ind,list) => {
        // console.log('noteObj',noteObj)

        if(ind < 600) return
        const {qpm,divisions,duration,pitch,voice,chord} = noteObj
        const voiceNum = Number(voice) - 1
        const optionsObj = {
            label: `P${part+1}V${voiceNum}`,
            data: [],
            borderColor: [lineColor],
            borderWidth: 1,
            pointStyle: 'line',
            steppedLine: 'before',
        }

        const qps = qpm / 60
        const quarterNoteValInSecs = 1/qps
        const noteLength = (quarterNoteValInSecs/divisions) * duration
        const lastNoteLength = {
            length: 0
        }

        if(timeArr[voiceNum] === undefined) timeArr.push(0)
        //initialize the time for each voice at 0
        //since we're starting at the time 0 the updateTime function has to start with the length of the previous note
         
        //the time(x) needs to be updated at the same time (in this case in the same function) as the frequency(y)
        if(voiceList.indexOf(voiceNum) < 0  && chord === undefined){
            voiceList.push(voiceNum)
            dataArr.push({
                ...optionsObj,
                borderColor: [lineColor],
            });
        }
        //initialize the specifications for the chart, dont forget to create a blank data array

        //load the array with the plot points
        //updateTime is called at the same time as the noteFrequency so that both arrays will match together for accuracy 
        //TODO if both arrays match already why bother even have them separate?

        if(chord === undefined){
            dataArr[voiceNum]['data'].push({
                x:timeArr[voiceNum],
                y:noteFrequency({
                    fixedNote: {pitch,voice}
                }),
            })
            timeArr[Number(voice) - 1]+=noteLength
        } else {
            
        }

        //use this to finish off the chart for timing
        if(ind === list.length - 1){
            dataArr[voiceNum]['data'].push({
                x:timeArr[voiceNum],
                y:noteFrequency({
                    fixedNote: {pitch,voice}
                }),
            })
        }
    })

    return dataArr
}