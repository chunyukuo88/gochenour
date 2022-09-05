import { describe, test, expect } from 'vitest';
import { removeMethods } from './index.js';
import { mocks } from './mocks.js';

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
        const lineOfCode = 'describe("WHEN: Something happens,", ()=>{';
        const target = 'WHEN';
        const expectedResult = 'describe("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(expectedResult);
      });
    });
    describe('WHEN: The target is `.skip` but it does not belong to a `describe` or `test` block,', ()=>{
      test('THEN: It returns in an unchanged line.', ()=>{
        const lineOfCode = 'someObject.skip(data)';
        const target = mocks.REMOVABLE_SKIP;

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(lineOfCode);
      });
    });
    describe('WHEN: The target is `.only` but it does not belong to a `describe` or `test` block,', ()=>{
      test('THEN: It returns in an unchanged line.', ()=>{
        const lineOfCode = 'someObject.only(data)';
        const target = mocks.REMOVABLE_ONLY;

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(lineOfCode);
      });
    });
  });
  describe('Valid cases: ', ()=>{
    describe('WHEN: The line of code includes the removal target,', ()=>{
      test('THEN: "describe [dot] skip" becomes "describe"', ()=>{
        const lineOfCode = mocks.TARGET_DESCRIBE_SKIP;
        const target = mocks.REMOVABLE_SKIP;
        const expectedResult = 'describe("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(expectedResult);
      });
      test('AND: "test [dot] skip" becomes "test"', ()=>{
        const lineOfCode = mocks.TARGET_TEST_SKIP;
        const target = mocks.REMOVABLE_SKIP;
        const expectedResult = 'test("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(expectedResult);
      });
      test('THEN: "describe [dot] only" becomes "describe"', ()=>{
        const lineOfCode = mocks.TARGET_DESCRIBE_ONLY;
        const target = mocks.REMOVABLE_ONLY;
        const expectedResult = 'describe("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(expectedResult);
      });
      test('AND: "test [dot] only" becomes "test"', ()=>{
        const lineOfCode = mocks.TARGET_TEST_ONLY;
        const target = mocks.REMOVABLE_ONLY;
        const expectedResult = 'test("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode, target);

        expect(result).toEqual(expectedResult);
      });
    });
    describe('WHEN: The function is not given a target and the lineOfCode contains .only(', ()=>{
      test('THEN: That methods is removed.', ()=>{
        const lineOfCode = mocks.TARGET_DESCRIBE_SKIP;
        const expectedResult = 'describe("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
    });
    describe('WHEN: The function is not given a target and the lineOfCode contains .only(', ()=>{
      test('THEN: Those methods are removed.', ()=>{
        const lineOfCode = mocks.TARGET_TEST_ONLY;
        const expectedResult = 'test("WHEN: Something happens,", ()=>{';

        const result = removeMethods(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});