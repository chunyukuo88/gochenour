import { describe, expect, test, vi } from 'vitest';
import { convertSingleLine } from './convertSingleLine.js';

describe('convertSingleLine/1', ()=>{
  describe('GIVEN: This function is invoked with given a line of code from a normal CSS file,', ()=>{
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
        const cases = [
          ['    border: 1px solid black;'],
          ['  transform: translate(12px, 0px) rotate(-40deg);'],
          ['  box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.07);'],
        ];
        test.each(cases)('THEN: The line is returned as-is.', (lineOfCode)=>{
          const result = convertSingleLine(lineOfCode);

          expect(result).toEqual(lineOfCode);
        });
      });
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
