import { afterEach, describe, expect, test, vi } from 'vitest';
import { removeDebugFromGivenFile } from './editAllLinesInFile.js';
import { removeAllDebug } from './removeDebug/removeDebug.js';

vi.mock('./removeDebug/removeDebug.js');

describe('removeDebugFromGivenFile()', ()=>{
  afterEach(()=> vi.clearAllMocks());
  describe('WHEN: Invoked on a specific file,', ()=>{
    test('THEN: It runs a function on each line of that file.', async ()=>{
      const mockError = new Error("ENOENT: no such file or directory, open './SomeFile/someFile.js'");
      removeAllDebug.mockImplementationOnce(vi.fn(), ()=>{
        throw mockError;
      });
      const spy = vi.spyOn(console, 'error');
      const someFilePath = './SomeFile/someFile.js';

      await removeDebugFromGivenFile(someFilePath);

      expect(spy).toBeCalledWith(mockError);
    });
  });
});