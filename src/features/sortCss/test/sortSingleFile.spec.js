import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { sortSingleFile } from '../sortSingleFile.js';
import { mocks } from './mocks.js';
import fs from 'fs';

vi.mock('fs');

afterEach(()=> {
  vi.clearAllMocks();
});
describe('GIVEN: A CSS file,', ()=>{
  describe('WHEN: that file contains a single ruleset that needs to be alphabetized,', ()=>{
    test('THEN: the function sorts it alphabetically.', ()=>{
      const mockWrite = vi.spyOn(fs, 'writeFileSync');
      fs.readFileSync.mockImplementationOnce(() => mocks.ORIGINAL_DOC);
      const testFilepath = '__test__';
      const testFile = 'toHavePixelsConverted.css';
      const updatedFilePath = `${testFilepath}/${testFile}`;

      sortSingleFile(testFilepath, testFile);

      expect(mockWrite).toBeCalledWith(updatedFilePath, mocks.UPDATED_DOC);
    });
  });
  // describe('WHEN: that file contains multiple rulesets that need to be alphabetized,', ()=>{
  //   test('THEN: the function sorts them alphabetically.', ()=>{
  //
  //   });
  // });
});