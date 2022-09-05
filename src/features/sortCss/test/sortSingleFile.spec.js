import { afterEach, describe, expect, test, vi } from 'vitest';
import { sortSingleFile } from '../sortSingleFile.js';
import { mocks } from './mocks.js';
import fs from 'fs';

vi.mock('fs');

afterEach(()=> {
  vi.clearAllMocks();
});
describe('GIVEN: A CSS file,', ()=>{
  const testFilepath = '__test__';
  const testFile = 'someCssFile.css';
  const updatedFilePath = `${testFilepath}/${testFile}`;

  describe('WHEN: that file contains a single rule set that needs to be alphabetized,', ()=>{
    test('THEN: the function sorts its rules alphabetically.', ()=>{
      const mockWrite = vi.spyOn(fs, 'writeFileSync');
      fs.readFileSync.mockImplementationOnce(() => mocks.SINGLE_RULE_SET_ORIGINAL);

      sortSingleFile(testFilepath, testFile);

      expect(mockWrite).toBeCalledWith(updatedFilePath, mocks.SINGLE_RULE_SET_UPDATED);
    });
  });
  describe('WHEN: that file contains multiple rule sets that need to be alphabetized,', ()=>{
    test('THEN: it alphabetically sorts each rule set and each rule set\'s rules.', ()=>{
      const mockWrite = vi.spyOn(fs, 'writeFileSync');
      fs.readFileSync.mockImplementationOnce(() => mocks.MULTIPLE_RULE_SETS_ORIGINAL);

      sortSingleFile(testFilepath, testFile);

      expect(mockWrite).toBeCalledWith(updatedFilePath, mocks.MULTIPLE_RULE_SETS_UPDATED);
    });
  });
});
