import { describe, expect, test, vi } from 'vitest';
import { sortSingleFile } from '../sortSingleFile.js';
import { alphabetizeCssInAllFiles } from '../index.js';
import { derived } from '../../../common/displayMethods.js';

vi.mock('../sortSingleFile.js');
vi.mock('../../../common/displayMethods.js');



describe('alphabetizeCssInAllFiles()', ()=>{
  describe('WHEN: This function is invoked,', ()=>{
    test('THEN: It sorts the rule sets of all eligible CSS files in the directory.', ()=>{
      sortSingleFile.mockImplementation(vi.fn());

      const dir = '__test__';

      alphabetizeCssInAllFiles(dir);

      expect(sortSingleFile).toHaveBeenCalledTimes(3);
    });
    test('THEN: It prints to the console the number of files that have been processed.', ()=>{
      sortSingleFile.mockImplementation(vi.fn());
      const mockLogYellowInverse = vi.spyOn(derived, 'logYellowInverse');

      const dir = '__test__';

      alphabetizeCssInAllFiles(dir);

      expect(mockLogYellowInverse).toHaveBeenCalledTimes(3);
    });
  });
});
