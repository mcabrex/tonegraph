import {
  relativeHalfSteps,
  scaleMaker,
  totalHalfSteps,
  noteFrequency
} from './notes';

//noteFrequency tests

//totalHalfSteps tests

//scaleMaker tests
test('throws an exception for invalid arguments',() => {
  //testing throws need to be invoked in a wrapper or the assertion will fail
  //this also means that calling it in an assigned variable will not work either
  //if you invoke it in a variable assignment it will throw the Error before the jest assertion will take place
  expect(() =>scaleMaker(21)).toThrow(Error);
  expect(() =>scaleMaker("C#")).toThrow(Error);
  expect(() =>scaleMaker(null)).toThrow(Error);
  expect(() =>scaleMaker({foo:"bar"})).toThrow(Error);
  expect(() =>scaleMaker(false)).toThrow(Error);
})

test('scale length is 7',() => {
  const testScale = scaleMaker('A')
  expect(testScale.length).toBe(7)
})

test('returned array contains all the letters in the musical alphabet',() => {
  const musicalAlphabet = ['A','B','C','D','E','F','G']
  musicalAlphabet.forEach(letter => {
    expect(scaleMaker(letter)).toEqual(expect.arrayContaining(musicalAlphabet)) 
  })
})

