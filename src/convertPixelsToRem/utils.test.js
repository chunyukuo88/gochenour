import { describe, expect, test, vi } from 'vitest';
import { convertSingleLine } from './utils.js';

describe('convertSingleLine/1', ()=>{
  describe('GIVEN: A line of code that contains pixels that need to be converted to REM', ()=>{
    describe('WHEN: This function is invoked,', ()=>{
      describe('AND: This line specifies rules for a margin,', ()=>{
        test('THEN: The pixels get converted to REM', ()=>{
          const lineOfCode = '    margin: 4px 16px 0 32px;';
          const expectedResult = '    margin: 0.25rem 1rem 0 2rem;';

          const result = convertSingleLine(lineOfCode);

          expect(result).toEqual(expectedResult);
        });
      });
    });
  });
  describe('GIVEN: A line of code that does NOT contain pixels that need to be converted to REM', ()=>{
    describe('WHEN: This function is invoked,', ()=>{
      describe('AND: This line specifies rules for a border,', ()=>{
        test('THEN: The pixels get converted to REM', ()=>{
          const lineOfCode = '    border: 1px solid black;';
          const expectedResult = lineOfCode;

          const result = convertSingleLine(lineOfCode);

          expect(result).toEqual(expectedResult);
        });
      });
    });
  });
});
