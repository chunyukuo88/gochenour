import {
  describe,
  expect,
  test,
} from 'vitest';
import { removeAllDebug } from './index.js';
import { mocks } from './mocks.js';

describe('removeAllDebug', ()=>{
  describe('GIVEN: This function is invoked with a line of code', ()=>{
    describe('WHEN: The code does NOT contain debug', ()=>{
      test('THEN: It returns the line of code back.', ()=>{
        const result = removeAllDebug(mocks.EMPTY_STRING);

        expect(result).toBe(mocks.EMPTY_STRING);
      });
    });
    describe('WHEN: The code DOES contain debug', ()=>{
      test('THEN: That line is deleted.', ()=>{
        const result = removeAllDebug(mocks.DEBUG_INVOCATION);

        expect(result).toEqual('');
      });
    });
    describe('WHEN: The code contains `debug` in a context that should not be deleted', ()=>{
      test('THEN: The line is unchanged.', ()=>{
        const result = removeAllDebug(mocks.DEBUG_NOT_DELETABLE);

        expect(result).toEqual(mocks.DEBUG_NOT_DELETABLE);
      });
    });
    describe('WHEN: Given a string that should have `debug` removed from it,', ()=>{
      test('THEN: A singly destructured debug function becomes a `render()`', ()=>{
        const expectedResult = ' render(';

        const result = removeAllDebug(mocks.DEBUG_SINGLE_DESTRUCTURED);

        expect(result).toEqual(expectedResult);
      });
      test('THEN: A singly destructured debug function with an indent becomes a `render()`', ()=>{
        const expectedResult = ' render(';

        const result = removeAllDebug(mocks.DEBUG_SINGLE_DESTRUCTURED_INDENT);

        expect(result).toEqual(expectedResult);
      });
      test('THEN: A debug function, destructured before some other thing, causes only the debug to be removed.', ()=>{
        const expectedResult = 'const { component } = render(';

        const result = removeAllDebug(mocks.DOUBLE_DESTRUCTURE_1);

        expect(result).toEqual(expectedResult);
      });
      test('THEN: A debug function, destructured after some other thing, causes only the debug to be removed.', ()=>{
        const expectedResult = 'const { component } = render(';

        const result = removeAllDebug(mocks.DOUBLE_DESTRUCTURE_2);

        expect(result).toEqual(expectedResult);
      });
      test('THEN: A debug function, destructured between two other things, causes only the debug to be removed.', ()=>{
        const expectedResult = 'const { component, getByRole } = render(';

        const result = removeAllDebug(mocks.MULTIPLE_DESTRUCTURE);

        expect(result).toEqual(expectedResult);
      });
  });
  });
});
