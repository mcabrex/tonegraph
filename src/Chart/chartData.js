import {noteFrequency} from "../notes"

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

export const dataSetGenerator = (noteDataList) => {
    //dataSetGenerator needs to take in a singular array of data and return an array of data objects 

    const timeArr = []
    const dataArr = []
    const voiceList = []

    noteDataList.forEach((noteObj,ind,list) => {
        const {qpm,divisions,duration,pitch,voice,chord} = noteObj
        const voiceNum = Number(voice) - 1
        const optionsObj = {
            data: [],
            borderColor: ['#0095FF'],
            borderWidth: 2,
            pointStyle: 'line',
            steppedLine: 'middle',
        }

        const qps = qpm / 60
        const quarterNoteValInSecs = 1/qps
        const noteLength = (quarterNoteValInSecs/divisions) * duration

        if(timeArr[voiceNum] === undefined) timeArr.push(0)
        //initialize the time for each voice at 0
        //since we're starting at the time 0 the updateTime function has to start with the length of the previous note
         
        //the time(x) needs to be updated at the same time (in this case in the same function) as the frequency(y)
        if(voiceList.indexOf(voiceNum) < 0  && chord === undefined){
            voiceList.push(voiceNum)
            dataArr.push({
                ...optionsObj,
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

