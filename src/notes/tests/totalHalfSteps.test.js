import {totalHalfSteps} from "../index"

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const scale = ['A','B','C','D','E','F','G']

const testObjMaker = ({note,baseOct,fixedOct}) => {
    const testBaseObj = {
        'step' : note,
        'octave' : baseOct,
        'alter' : 0
    }
    const testFixedObj = {
        'step' : note,
        'octave' : fixedOct,
        'alter' : 0
    }
    return [testBaseObj,testFixedObj]
}

test('returned octave total is 12 - ascending', () => {
    scale.forEach(element => {
        const baseOctave = getRandomIntInclusive(0,7)
        const fixedOctave = baseOctave+1
        const testArguments = {element,baseOctave,fixedOctave}
        const testObjects = testObjMaker(testArguments)
        const testBaseObj = testObjects[0]
        const testFixedObj = testObjects[1]
        expect(totalHalfSteps(testBaseObj,testFixedObj)).toBe(12)
    });
})

test('returned octave total is -12 - descending', () => {
    scale.forEach(element => {
        const baseOctave = getRandomIntInclusive(1,8)
        const testBaseObj = {
            'step' : element,
            'octave' : baseOctave,
            'alter' : 0
        }
        const testFixedObj = {
            'step' : element,
            'octave' : baseOctave-1,
            'alter' : 0
        }
        expect(totalHalfSteps(testBaseObj,testFixedObj)).toBe(-12)
    });
})

test('works with minimum alter - octave ascending, base sharp', () => {
    scale.forEach(element => {
        const baseOctave = getRandomIntInclusive(0,7)
        const testBaseObj = {
            'step' : element,
            'octave' : baseOctave,
            'alter' : 1
        }
        const testFixedObj = {
            'step' : element,
            'octave' : baseOctave+1,
            'alter' : 0
        }
        expect(totalHalfSteps(testBaseObj,testFixedObj)).toBe(11)
    });
})