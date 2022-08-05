import { describe, expect, test, vi } from 'vitest';
import { convertSingleLine } from './utils.js';

describe('convertSingleLine/1', ()=>{
  describe('GIVEN: A line of code that contains pixels that need to be converted to REM', ()=>{
    describe('WHEN: This function is invoked,', ()=>{
      describe('AND: This line is margin,', ()=>{
        test('THEN: The pixels get converted to REM', ()=>{
          const lineOfCode = '    margin: 4px 16px 0 32px;';
          const expectedResult = '    margin: 0.25rem 1rem 0 2rem;';

          const result = convertSingleLine(lineOfCode);

          expect(result).toEqual(expectedResult);
        });
      });
    });
  });
});