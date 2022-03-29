import { describe, test, expect } from 'vitest';
import { removeMethods } from './removeMethods.js';

describe('GIVEN: removeMethods is invoked with a line of code and a removal target,', ()=>{
  describe('Invalid cases: ', ()=>{
    describe('WHEN: Given an inapplicable lineOfCode and no target,', ()=>{
      test('THEN: It returns the original lineOfCode.', ()=>{
        const lineOfCode = 'removeTypeScript();';

        const result = removeMethods(lineOfCode);

        expect(result).toEqual(lineOfCode);
      });
    });
    describe('WHEN: The line of code includes the an invalid target,', ()=>{
      test('THEN: Invalid targets result in an unchanged line.', ()=>{
        const lineOfCode = 'describe.skip("WHEN: Something happens,", ()=>{';
        const target = '.anInvalidTarget';
        const expectedResult = 'describe.skip("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(expectedResult);
      });
    });
    describe('WHEN: The target is `.skip` but it does not belong to a `describe` or `test` block,', ()=>{
      test('THEN: It returns in an unchanged line.', ()=>{
        const lineOfCode = 'someObject.skip(data)';
        const target = '.skip';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(lineOfCode);
      });
    });
    describe('WHEN: The target is `.only` but it does not belong to a `describe` or `test` block,', ()=>{
      test('THEN: It returns in an unchanged line.', ()=>{
        const lineOfCode = 'someObject.only(data)';
        const target = '.only';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(lineOfCode);
      });
    });
  });
  describe('Valid cases: ', ()=>{
    describe('WHEN: The line of code includes the removal target,', ()=>{
      test('THEN: "describe.skip" becomes "describe"', ()=>{
        const lineOfCode = 'describe.skip("WHEN: Something happens,", ()=>{';
        const target = '.skip';
        const expectedResult = 'describe("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(expectedResult);
      });
      test('AND: "test.skip" becomes "describe"', ()=>{
        const lineOfCode = 'test.skip("WHEN: Something happens,", ()=>{';
        const target = '.skip';
        const expectedResult = 'test("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(expectedResult);
      });
      test('THEN: "describe.only" becomes "describe"', ()=>{
        const lineOfCode = 'describe.only("WHEN: Something happens,", ()=>{';
        const target = '.only';
        const expectedResult = 'describe("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(expectedResult);
      });
      test('AND: "test.only" becomes "describe"', ()=>{
        const lineOfCode = 'test.only("WHEN: Something happens,", ()=>{';
        const target = '.only';
        const expectedResult = 'test("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(expectedResult);
      });
    });
    describe('WHEN: The function is not given a target and the lineOfCode contains .only(', ()=>{
      test('THEN: That methods is removed.', ()=>{
        const lineOfCode = 'describe.only("WHEN: Something happens")';
        const expectedResult = 'describe("WHEN: Something happens")';

        const result = removeMethods(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
    });
    describe('WHEN: The function is not given a target and the lineOfCode contains .only(', ()=>{
      test('THEN: Those methods are removed.', ()=>{
        const lineOfCode = 'test.skip("WHEN: Something happens")';
        const expectedResult = 'test("WHEN: Something happens")';

        const result = removeMethods(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});