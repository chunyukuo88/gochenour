import { describe, test, expect } from 'vitest';
import { removeAllDebug } from './removeDebug.js';


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
    describe.each`
      lineOfCode                                           | expectedResult
      ${'const { debug } = render('}                        | ${' render('}
      ${'  const { debug } = render('}                      | ${' render('}
      ${'const { debug, component } = render('}             | ${'const { component } = render('}
      ${'const { component, debug } = render('}             | ${'const { component } = render('}
      ${'const { component, debug, getByRole } = render('}  | ${'const { component, getByRole } = render('}
    `('WHEN: The code contains $lineOfCode, destructured from a render() invocation, ',
      ({ lineOfCode, expectedResult })=>{
      test(`THEN: It is removed, leaving a line that begins with "{expectedResult}".`, ()=>{
        const result = removeAllDebug(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
