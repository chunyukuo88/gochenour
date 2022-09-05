import { describe, expect, test, vi } from 'vitest';
import { sortSingleFile } from '../sortSingleFile.js';
import { alphabetizeCssInAllFiles } from '../index.js';

vi.mock('../sortSingleFile.js');

describe('alphabetizeCssInAllFiles()', ()=>{
  describe('WHEN: This function is invoked,', ()=>{
    test('THEN: It sorts the rule sets of all files in the directory.', ()=>{
      sortSingleFile.mockImplementation(vi.fn());

      const dir = '__test__';

      alphabetizeCssInAllFiles(dir);

      expect(sortSingleFile).toHaveBeenCalledTimes(3);
    });
  });
});