import { removeComments } from './index.js';
import { describe, expect, test, vi } from 'vitest';
import { mocks } from './mocks.js';

describe('removeComments()', ()=>{
  describe('WHEN: The function is invoked with a line NOT containing a comment', ()=>{
    test('THEN: It returns the line of code unchanged', ()=>{
      const lineOfCode = 'const something = "something";';

      const result = removeComments(lineOfCode);

      expect(result).toEqual(lineOfCode);
    });
  });
  describe('WHEN: The function is invoked with a line that starts with a comment', ()=>{
    test('THEN: It replaces the line with an empty string.', ()=>{
      const lineOfCode = mocks.STARTS_WITH_COMMENT;

      const result = removeComments(lineOfCode);

      expect(result).toEqual('');
    });
  });
  describe('WHEN: The function is invoked with a line that starts with a comment after some whitespace,', ()=>{
    test('THEN: It replaces the line with an empty string.', ()=>{
      const lineOfCode = mocks.STARTS_WITH_INDENTED_COMMENT;

      const result = removeComments(lineOfCode);

      expect(result).toEqual('');
    });
  });
  describe('WHEN: the line has both uncommented and commented code,', ()=>{
    test('THEN: It trims away the commented part only.', ()=>{
      const lineOfCode = mocks.PARTIALLY_COMMENTED;
      const uncommentedPartOnly = '  const something = "something";';

      const result = removeComments(lineOfCode);

      expect(result).toEqual(uncommentedPartOnly);
    });
  });
});