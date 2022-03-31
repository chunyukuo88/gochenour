import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanSingleTestSuite } from './index.js';
import { getMemoryUsage } from '../../nodeUtils/getProcessData';
import * as RemoveDebug from './removeDebug/index.js';
import { removeMethods } from './removeMethods/index.js';
import fs from 'fs';

vi.mock('../../nodeUtils/getProcessData.js');
vi.mock('./removeMethods/index.js');
afterEach(()=> vi.clearAllMocks());

describe('removeDebugFromGivenFile()', ()=>{
  describe('GIVEN: This function is invoked on a specific file,', ()=>{
    describe('WHEN: Normal use case: That file is valid,', ()=>{
      test('THEN: It runs the removal methods on that file.', async ()=>{
        const mockOriginalDocument = `test('It renders something', ()=>{\n  const { debug } = render(Component);\n});`;
        const mockUpdatedDocument = `test('It renders something', ()=>{\n render(Component);\n});`;
        const readSpy = vi.spyOn(fs, 'readFileSync').mockImplementationOnce(()=> mockOriginalDocument);
        const writeSpy = vi.spyOn(fs, 'writeFileSync');
        const filePath = './SomeFile/someFile.js';

        await cleanSingleTestSuite(filePath);

        expect(writeSpy).toBeCalledWith(filePath, mockUpdatedDocument);
      });
    });
    describe('WHEN: All other use cases:', ()=>{
      describe('WHEN: That file is not found,', ()=>{
        test('THEN: It logs an error.', async ()=>{
          const mockError = new Error("ENOENT: no such file or directory, open './SomeFile/someFile.js'");
          const mockRemoveAllDebug = vi
            .spyOn(RemoveDebug, 'removeAllDebug')
            .mockImplementationOnce(vi.fn(), ()=>{ throw mockError });
          const spy = vi.spyOn(console, 'error');
          const filePath = './SomeFile/someFile.js';

          await cleanSingleTestSuite(filePath);

          expect(spy).toBeCalledWith(mockError);
        });
      });
    });
    describe('WHEN: As long as an error is not caught,', ()=>{
      test('THEN: It logs the memory used.', async ()=>{
        getMemoryUsage.mockImplementationOnce(()=>({
          heapUsed: 10_485_760,
        }));
        const mockReadFile = vi.spyOn(fs, 'readFileSync');
        const mockWriteFile = vi.spyOn(fs, 'writeFileSync');
        const expectedLog = 'The script uses approximately 10 MB';
        const spy = vi.spyOn(console, 'log');

        await cleanSingleTestSuite();

        expect(spy).toHaveBeenCalledWith(expectedLog);
      });
    });
  });
});