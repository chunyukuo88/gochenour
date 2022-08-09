import { afterEach, describe, expect, test, vi } from 'vitest';
import { convertSingleFile } from './convertSingleFile.js';
import { mocks } from './mocks.js';
import fs from 'fs';

vi.mock('./utils.js');
afterEach(()=> vi.clearAllMocks());

describe('GIVEN: convertSingleFile is passed a CSS file', ()=>{
  describe('WHEN: The file contains rules that require conversion,', ()=>{
    test('THEN: convertSingleFile converts the px values of the specific rules that require it.', ()=>{
      const mockRead = vi.spyOn(fs, 'readFileSync').mockImplementationOnce(()=>mocks.ORIGINAL_DOC);
      const mockWrite = vi.spyOn(fs, 'writeFileSync');

      const testFile = './toHavePixelsConverted.css';

      convertSingleFile();

      expect(mockWrite).toBeCalledWith(testFile, mocks.UPDATED_DOC);
    });
  });
});
