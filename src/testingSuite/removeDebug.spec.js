import { removeAllDebug } from './removeDebug.mjs';

describe('removeAllDebug', ()=>{
  describe('GIVEN: This function is invoked with a line of code', ()=>{
    describe('WHEN: The code does not contain debug', ()=>{
      it('THEN: It returns undefined.', ()=>{
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
      it('THEN: The line is unchanged.', ()=>{
        const lineOfCode = 'const debugThatShouldNotBeDeleted = "";';

        const result = removeAllDebug(lineOfCode);

        expect(result).toEqual(lineOfCode);
      });
    });
    describe.each`
      codeSnippet                                           | expectedResult
      ${'const { debug } = render('}                        | ${' render('}
      ${'  const { debug } = render('}                      | ${' render('}
      ${'const { debug, component } = render('}             | ${'const { component } = render('}
      ${'const { component, debug } = render('}             | ${'const { component } = render('}
      ${'const { component, debug, getByRole } = render('}  | ${'const { component, getByRole } = render('}
    `('WHEN: The code contains $codeSnippet, destructured from a render() invocation, ',
      ({ codeSnippet, expectedResult })=>{
      it(`THEN: It is removed, leaving a line that begins with "{expectedResult}".`, ()=>{
        const result = removeAllDebug(codeSnippet);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
