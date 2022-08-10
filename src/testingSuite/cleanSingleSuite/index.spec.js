import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanSingleTestSuite } from './index.js';
import fs from 'fs';

import { processArrayOfLines } from './utils.js';
import { mocks } from './mocks.js';

vi.mock('./utils.js');
afterEach(()=> vi.clearAllMocks());

describe('removeDebugFromGivenFile()', ()=>{
  describe('GIVEN: This function is invoked on a specific file,', ()=>{
    describe('WHEN: No error is thrown,', ()=>{
      test('THEN: It runs the removal methods on that file.', async ()=>{
        processArrayOfLines.mockImplementationOnce(()=>mocks.UPDATED_DOC.split('\n'));
        const mockRead = vi.spyOn(fs, 'readFileSync').mockImplementationOnce(()=>mocks.ORIGINAL_DOC);
        const mockWrite = vi.spyOn(fs, 'writeFileSync');
        const filePath = 'somePath/someFile.js';

        cleanSingleTestSuite(filePath);

        expect(mockWrite).toBeCalledWith(filePath, mocks.UPDATED_DOC);
      });
    });
    describe('WHEN: That file is not found,', ()=>{
      test('THEN: It logs an error.', async ()=>{
        const mockError = new Error("ENOENT: no such file or directory, open './SomeFile/someFile.js'");
        processArrayOfLines.mockImplementationOnce(vi.fn(), ()=>{ throw mockError });
        const spy = vi.spyOn(console, 'error');
        const filePath = './SomeFile/someFile.js';

        await cleanSingleTestSuite(filePath);

        expect(spy).toBeCalledWith(mockError);
      });
    });
  });
});