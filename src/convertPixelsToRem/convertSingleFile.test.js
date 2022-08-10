import { afterEach, describe, expect, test, vi } from 'vitest';
import { convertSingleFile } from './convertSingleFile.js';
import { mocks } from './mocks.js';
import fs from 'fs';

vi.mock('./utils.js');
afterEach(()=> vi.clearAllMocks());


/**
 NOTE: Unless the intention is to specifically NOT clean up after this test, run this test together with all other tests
 by using `npm run test`, rather than by using the green IDE arrows below.
 **/


describe('GIVEN: convertSingleFile is passed a CSS file', ()=>{
  describe('WHEN: The file contains rules that require conversion,', ()=>{
    test('THEN: convertSingleFile converts the px values of the specific rules that require it.', ()=>{
      const mockRead = vi.spyOn(fs, 'readFileSync').mockImplementationOnce(()=>mocks.ORIGINAL_DOC);
      const mockWrite = vi.spyOn(fs, 'writeFileSync');

      const testFile = '__test__/toHavePixelsConverted.css';

      convertSingleFile();

      expect(mockWrite).toBeCalledWith(testFile, mocks.UPDATED_DOC);
    });
  });
});
