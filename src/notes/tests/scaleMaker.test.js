import {
    scaleMaker,
} from '../index';

test('throws an exception for invalid arguments', () => {
    //testing throws need to be invoked in a wrapper or the assertion will fail
    //this also means that calling it in an assigned variable will not work either
    //if you invoke it in a variable assignment it will throw the Error before the jest assertion will take place
    expect(() => scaleMaker(21)).toThrow(Error);
    expect(() => scaleMaker("C#")).toThrow(Error);
    expect(() => scaleMaker(null)).toThrow(Error);
    expect(() => scaleMaker({foo: "bar"})).toThrow(Error);
    expect(() => scaleMaker(false)).toThrow(Error);
})

test('returned scale length is 7', () => {
    const testScale = scaleMaker('A')
    expect(testScale.length).toBe(7)
})

test('returned array contains all the letters in the musical alphabet', () => {
    const musicalAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    musicalAlphabet.forEach(letter => {
        expect(scaleMaker(letter)).toEqual(expect.arrayContaining(musicalAlphabet))
    })
})

test('returned array must contain unique values', () => {
    const musicalAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    function uniqueValues(array) {
        //note: this function only works for primitives which should be the only thing passed in here anyway
        return new Set(array).size === array.length
      }
    musicalAlphabet.forEach(letter => {
        expect(uniqueValues(scaleMaker(letter))).toEqual(true)
    })
})