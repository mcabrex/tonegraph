import {relativeHalfSteps} from "../index"

test('throws an exception for invalid arguments', () => {
    //testing throws need to be invoked in a wrapper or the assertion will fail
    //this also means that calling it in an assigned variable will not work either
    //if you invoke it in a variable assignment it will throw the Error before the jest assertion will take place
    expect(() => relativeHalfSteps(21)).toThrow(Error);
    expect(() => relativeHalfSteps("C#")).toThrow(Error);
    //relativeHalfSteps function does not test for accidentals
    expect(() => relativeHalfSteps(null)).toThrow(Error);
    expect(() => relativeHalfSteps({foo: "bar"})).toThrow(Error);
    expect(() => relativeHalfSteps(false)).toThrow(Error);
})

test('Returns 0 if both  notes are the same',()=>{
    const musicalAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    musicalAlphabet.forEach(letter => {
        expect(relativeHalfSteps(letter,letter)).toEqual(0)
    })
})

test('Checks for the singular half steps between B -> C and E - > F',()=>{
    expect(relativeHalfSteps('B','C')).toEqual(1)
    expect(relativeHalfSteps('E','F')).toEqual(1)
})

test('Half Steps to equal 2 between every other note',()=>{
    expect(relativeHalfSteps('A','B')).toEqual(2)
    expect(relativeHalfSteps('C','D')).toEqual(2)
    expect(relativeHalfSteps('D','E')).toEqual(2)
    expect(relativeHalfSteps('F','G')).toEqual(2)
    expect(relativeHalfSteps('G','A')).toEqual(2)
})

test('Should give proper amount of half steps',()=>{
    expect(relativeHalfSteps('A','C')).toEqual(3)
    expect(relativeHalfSteps('G','B')).toEqual(4)
    expect(relativeHalfSteps('C','F')).toEqual(5)
    expect(relativeHalfSteps('F','B')).toEqual(6)
    expect(relativeHalfSteps('G','D')).toEqual(7)
    expect(relativeHalfSteps('F','D')).toEqual(9)
    expect(relativeHalfSteps('B','A')).toEqual(10)
    expect(relativeHalfSteps('C','B')).toEqual(11)
})