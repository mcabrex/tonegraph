const noteFrequency = ({baseNote={octave:'4',step:'A',alter:'0'},baseFrequency=440,fixedNote,rest}) => {
  if(rest !== undefined) return 0
  //baseNote rests at baseFrequency which is generally A4 = 440
  //baseNote and fixedNote should be two pitch objects containin octave,step,alter
  
  //frequency formula is fn = f0 * (a)^n
  //n = the number of half steps away from the fixed note you are. If you are at a higher note, n is positive. If you are on a lower note, n is negative.
  //0 is the frequency of the baseNote, this must be defined for this to work
  //a = 12th root of 2
  const halfStepDistance = halfStepTotal(fixedNote) - halfStepTotal(baseNote)
  const root = Math.pow(2,1/12)
  const fixedNoteFrequency = baseFrequency * Math.pow(root,halfStepDistance)

  return Number(fixedNoteFrequency.toFixed(2))
}

  
const halfStepTotal = ({octave,step,alter=0}) => {
  const keyScale = 'C#D#EF#G#A#B'
  const octaveTotal = parseInt(octave)*12
  const pitchTotal = keyScale.indexOf(step)
  return octaveTotal+pitchTotal+parseInt(alter)
}
  
  
  const totalHalfSteps = (baseNoteObj,fixedNoteObj) => {
    //idea 2 add total halfsteps for fixed and base then subtract?
    //what this function is doing is calculating the halfsteps in logical stages
    //stage1 calculates the octave half steps 
    //stage2 calculates the accidental half steps
    //stage3 calculates the note half steps
    //stage4 accounts for the octave differential, more on that below

    const baseScale = ['C','D','E','F','G','A','B']
    //the octave number should be the last position on the note string

    const baseOct = Number(baseNoteObj['octave'])
    const baseLetter = baseNoteObj['step']
    const baseAccidentals = baseNoteObj['alter'] !== undefined ? Number(baseNoteObj['alter']) : 0

    const fixedOct = Number(fixedNoteObj['octave'])
    const fixedLetter = fixedNoteObj['step']
    const fixedAccidentals = fixedNoteObj['alter'] !== undefined ? Number(fixedNoteObj['alter']) : 0
    //The alter element represents chromatic alteration in number of semitones (e.g., -1 for flat, 1 for sharp). 

    //stage1
    const octaveDiff = Math.abs(Number(fixedOct) - Number(baseOct))
    let octaveHalfSteps = octaveDiff*12
  
    //stage2
    //here we use zero as a fixed point to anchor the 'position' of the fixedNote relative to the BasedNote 
    let accidentalHalfSteps = baseOct > fixedOct ? 0+baseAccidentals-fixedAccidentals : 0-baseAccidentals+fixedAccidentals
    let halfStepTotal = octaveHalfSteps + accidentalHalfSteps
  
    //stage3
    //B > C
    const countDirection = baseScale.indexOf(baseLetter) > baseScale.indexOf(fixedLetter) ? true : false
    const relativeHalfStepTotal = countDirection ? relativeHalfSteps(fixedLetter,baseLetter) : relativeHalfSteps(baseLetter,fixedLetter) 

    //stage4
    //if the fixed note is below the base note use negative numbers
    //it helps to think of this next part as a line scale with the basenote resting at the center of it
    //4 scenarios?
    //2 scenarios account for remainder half steps
        //octaves start at C and end on B but the base note does not necessarily have to follow that so you'll have to account for that octave differential
    //2 scenarios account for the octave being above or below
    if(countDirection){
      return fixedOct < baseOct ? (halfStepTotal+relativeHalfStepTotal)*-1 : halfStepTotal-relativeHalfStepTotal
    }
    else {
      return fixedOct < baseOct ? (halfStepTotal-relativeHalfStepTotal)*-1 : halfStepTotal+relativeHalfStepTotal
    }
  }
  
  const scaleMaker = (note1) => {
    //returned scale will always be in the key of 'C'
    //this particular scaleMaker is essentially used to assist the relativeHalfSteps function
    const baseScale = ['C','D','E','F','G','A','B']
    if(baseScale.indexOf(note1) === -1) throw new Error('Invalid Argument');
    if(note1 === 'C') return baseScale
    const baseLength = baseScale.length
    const newScale = []
    const ind = baseScale.findIndex(note => note === note1)
    for(let i = 0; i < baseLength; i++){
      let curr = ind+i > baseLength-1 ? ((ind+i) % baseLength) : ind + i
      newScale.push(baseScale[curr])
    }
    return newScale
  }
  
  const relativeHalfSteps = (note1,note2) => {
    //used to determine the number of half steps COUNTING UP from note1 to note2
    //only to be used on notes within an octave of each other
    //relativeHalfSteps functions calculates semitones before accidentals
    if(note1 === note2) return 0
    const scale = scaleMaker(note1)
    let minimumSteps = 0
    for(let i = 1; i < scale.length; i++){
      let curr = scale[i]
      let halfSteps = curr === 'C' || curr === 'F' ? 1 : 2
      //calculating the halfSteps between notes going up the scale
      //only one semitone between B -> C and E -> F
      //every other step has 2 semitones between them
      minimumSteps+=halfSteps
      if(curr === note2) break;
    }
    return minimumSteps
  }
  
  export {
    relativeHalfSteps,
    scaleMaker,
    totalHalfSteps,
    noteFrequency
  }
  