const noteFrequency = ({baseNote={octave:'4',step:'A',alter:'0'},baseFrequency=440,fixedNote}) => {
  //frequency formula is fn = f0 * (a)n
  //n = number of half steps from baseNote to fixedNote
  //0 is the frequency of the baseNote, this must be defined for this to work
  //a = 12th root of 2
  if(fixedNote['pitch'] === undefined) {
    return 0
  }
  const halfStepDistance = totalHalfSteps(baseNote,fixedNote['pitch'])
  const root = Math.pow(2,1/12)
  const fixedNoteFrequency = baseFrequency * Math.pow(root,halfStepDistance)
  return Number(fixedNoteFrequency.toFixed(2))
}

const totalHalfSteps = (baseNoteObj,fixedNoteObj) => {
  const baseScale = ['C','D','E','F','G','A','B']
  //the octave number should be the last position on the note string
  
  const bnOct = Number(baseNoteObj['octave'])
  const fnOct = Number(fixedNoteObj['octave'])
  const octaveDiff = Math.abs(Number(fnOct) - Number(bnOct))
  //the number of halfsteps between octaves is 12
  let octaveHS = octaveDiff*12

  const fnLttr = fixedNoteObj['step']
  const bnLttr = baseNoteObj['step']


  let baseAccidentals = baseNoteObj['alter'] !== undefined ? Number(baseNoteObj['alter']) : 0
  let fixedAccidentals = fixedNoteObj['alter'] !== undefined ? Number(fixedNoteObj['alter']) : 0
  //The alter element represents chromatic alteration in number of semitones (e.g., -1 for flat, 1 for sharp). 

  //really think this one out loud
  let accidentalHSTotal = fnOct < bnOct ? 0+baseAccidentals-fixedAccidentals : 0-baseAccidentals+fixedAccidentals
  //here we use zero as a fixed point to anchor the 'position' of the fixedNote relative to the BasedNote 
  //fixedNote higher than basedNote: count the halfsteps going up from the basedNote
  //fixedNote lower than baseNote: count the halfsteps going down from the basedNote

  let halfStepTotal = octaveHS + accidentalHSTotal

  //it helps to think of this if else statement as if you're looking at a line scale, with the baseNote resting at a metaphorical 0
  if(baseScale.indexOf(bnLttr) > baseScale.indexOf(fnLttr)){
    return fnOct < bnOct ? (halfStepTotal+relativeHalfSteps(fnLttr,bnLttr))*-1 : halfStepTotal-relativeHalfSteps(fnLttr,bnLttr)
  }
  else {
    return fnOct < bnOct ? (halfStepTotal-relativeHalfSteps(bnLttr,fnLttr))*-1 : halfStepTotal+relativeHalfSteps(bnLttr,fnLttr) 
  }
}
  //use the baseNote as the anchor for how you handle the conditionals
  //what this function is doing is adding the halfsteps in logical stages 
  //ex: base B♯4 to fixed C♯3
  //stage1 calculating the octave half steps 
    //12 half steps between any octave, only 1 octave in this example so it's 12 
  //stage2 calculating the halfSteps added/subtracted by the accidentals
    //since the fnOct is less than the bsOct than the ♯ accidental will shorten the distance from the base
  //stage3 determine how to add/subtract the remaining halfsteps to get a total 
  //so now all you need to do now is add the half steps from C♯4 to B♯4, as the half steps from C♯3 to C♯4 have already been calculated, and you'll get the total

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
  //used to determine the number of half steps from note1 to note2
  //only to be used on notes within an octave of each other
  if(note1 === note2) return 0
  const scale = scaleMaker(note1)
  //use minimumSteps as the bast number before accidentals
  let minimumSteps = 0
  for(let i = 1; i < scale.length; i++){
    let curr = scale[i]
    let halfSteps = curr === 'C' || curr === 'F' ? 1 : 2
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
