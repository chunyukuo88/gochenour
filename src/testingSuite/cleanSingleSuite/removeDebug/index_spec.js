import {
  describe,
  expect,
  test,
} from 'vitest';
import { removeAllDebug } from './index.js';

describe('removeAllDebug', ()=>{
  describe('GIVEN: This function is invoked with a line of code', ()=>{
    describe('WHEN: The code does not contain debug', ()=>{
      test('THEN: It returns undefined.', ()=>{
        const lineOfCode = '';

        const result = removeAllDebug(lineOfCode);

        expect(result).toBe(lineOfCode);
      });
    });
    describe('WHEN: The code contains debug(', ()=>{
      test('THEN: That line is deleted.', ()=>{
        const snippet = 'debug(';

        const result = removeAllDebug(snippet);

        expect(result).toEqual('');
      });
    });
    describe('WHEN: The code contains `debug` in a context that should not be deleted', ()=>{
      test('THEN: The line is unchanged.', ()=>{
        const lineOfCode = 'const debugThatShouldNotBeDeleted = "";';

        const result = removeAllDebug(lineOfCode);

        expect(result).toEqual(lineOfCode);
      });
    });
    describe('WHEN: Given a string that should have `debug` removed from it,', ()=>{
      test('THEN: A singly destructured debug function becomes a `render()`', ()=>{
        const lineOfCode = 'const { debug } = render(';
        const expectedResult = ' render(';

        const result = removeAllDebug(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
      test('THEN: A singly destructured debug function with an indent becomes a `render()`', ()=>{
        const lineOfCode = '  const { debug } = render(';
        const expectedResult = ' render(';

        const result = removeAllDebug(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
      test('THEN: A debug function, destructured before some other thing, causes only the debug to be removed.', ()=>{
        const lineOfCode = 'const { debug, component } = render(';
        const expectedResult = 'const { component } = render(';

        const result = removeAllDebug(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
      test('THEN: A debug function, destructured after some other thing, causes only the debug to be removed.', ()=>{
        const lineOfCode = 'const { component, debug } = render(';
        const expectedResult = 'const { component } = render(';

        const result = removeAllDebug(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
      test('THEN: A debug function, destructured between two other things, causes only the debug to be removed.', ()=>{
        const lineOfCode = 'const { component, debug, getByRole } = render(';
        const expectedResult = 'const { component, getByRole } = render(';

        const result = removeAllDebug(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
