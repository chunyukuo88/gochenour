import { describe, expect, test, vi } from 'vitest';
import { convertSingleLine } from './utils.js';

describe('convertSingleLine/1', ()=>{
  describe('GIVEN: This function is invoked with given a line of code,', ()=>{
    describe('WHEN: The line of code that contains px units', ()=>{
      describe('AND: That rule should be converted,', ()=>{
        test('THEN: The pixels get converted to REM.', ()=>{
          const lineOfCode = '    margin: 4px 16px 0px 32px;';
          const expectedResult = '    margin: 0.25rem 1rem 0rem 2rem;';

          const result = convertSingleLine(lineOfCode);

          expect(result).toEqual(expectedResult);
        });
      });
      describe('AND: That rule need not be converted,', ()=>{
        test('THEN: The line is returned as-is.', ()=>{
          const lineOfCode = '    border: 1px solid black;';
          const expectedResult = lineOfCode;

          const result = convertSingleLine(lineOfCode);

          expect(result).toEqual(expectedResult);
        });
      });
      // describe('AND: This line is from a CSS-in-JavaScript module,', ()=>{
      //   test('THEN: The pixels get converted to REM just the same.', ()=>{
      //     const lineOfCode = "    padding: '0px 8px',";
      //     const expectedResult = "    padding: '0rem 0.5rem',";
      //
      //     const result = convertSingleLine(lineOfCode);
      //
      //     expect(result).toEqual(expectedResult);
      //   });
      // });
    });
    describe('WHEN: The line of code does NOT contain px units', () => {
      test('THEN: The line is returned as-is.', ()=>{
        const lineOfCode = '}';
        const expectedResult = lineOfCode;

        const result = convertSingleLine(lineOfCode);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
