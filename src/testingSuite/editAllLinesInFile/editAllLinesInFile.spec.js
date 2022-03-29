import { afterEach, describe, expect, test, vi } from 'vitest';
import { removeDebugFromGivenFile } from './editAllLinesInFile.js';
import * as RemoveDebug from './removeDebug/removeDebug.js';
import * as RemoveMethods from './removeMethods/removeMethods.js';
import fs from 'fs';

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

        await removeDebugFromGivenFile(filePath);

        expect(writeSpy).toBeCalledWith(filePath, mockUpdatedDocument);
      });
    });
    describe('WHEN: All other use cases:', ()=>{
      describe('WHEN: That file is not found,', ()=>{
        test('THEN: It throws an error.', async ()=>{
          const mockError = new Error("ENOENT: no such file or directory, open './SomeFile/someFile.js'");
          const mockRemoveAllDebug = vi
            .spyOn(RemoveDebug, 'removeAllDebug')
            .mockImplementationOnce(vi.fn(), ()=>{ throw mockError });
          const spy = vi.spyOn(console, 'error');
          const filePath = './SomeFile/someFile.js';

          await removeDebugFromGivenFile(filePath);

          expect(spy).toBeCalledWith(mockError);
        });
      });
      describe('GIVEN: This function is invoked without an argument passed to it,', ()=>{
        test('THEN: It invokes the removal functions on the default test file.', async ()=>{
          const mockRemoveAllDebug = vi.spyOn(RemoveDebug, 'removeAllDebug').mockImplementationOnce(vi.fn());
          const mockRemoveMethods = vi.spyOn(RemoveMethods, 'removeMethods').mockImplementationOnce(vi.fn());

          await removeDebugFromGivenFile();

          expect(mockRemoveAllDebug).toBeCalled();
          expect(mockRemoveMethods).toBeCalled();
        });
      });
    });
  });
});