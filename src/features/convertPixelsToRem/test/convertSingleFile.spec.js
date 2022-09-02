import { afterEach, describe, expect, test, vi } from 'vitest';
import { convertSingleFile } from '../convertSingleFile.js';
import * as line from '../convertSingleLine.js';
import { mocks } from './mocks.js';
import { derived } from '../../../common/displayMethods.js';
import fs from 'fs';

vi.mock('./utils.js');
vi.mock('fs');

/**
 NOTE: Unless the intention is to specifically NOT clean up after this test, run this test together with all other tests
 by using `npm run test`, rather than by using the green IDE arrows below.
 **/


describe('GIVEN: convertSingleFile is passed a CSS file', ()=>{
  afterEach(()=> {
    vi.clearAllMocks();
  });
  describe('WHEN: The file contains rules that require conversion,', ()=>{
    test('THEN: convertSingleFile converts the px values of the specific rules that require it.', ()=>{
      const mockWrite = vi.spyOn(fs, 'writeFileSync');
      const mockRead = fs.readFileSync.mockImplementationOnce(() => mocks.ORIGINAL_DOC);
      const testFilepath = '__test__';
      const testFile = 'toHavePixelsConverted.css';
      const updatedFilePath = `${testFilepath}/${testFile}`;

      convertSingleFile(testFilepath, testFile);

      expect(mockWrite).toBeCalledWith(updatedFilePath, mocks.UPDATED_DOC);
    });
    test('AND: A message is displayed, stating that the file has been converted.', ()=>{
      const mockWrite = vi.spyOn(fs, 'writeFileSync');
      const mockYellowInverse = vi.spyOn(derived, 'logYellowInverse');
      fs.readFileSync.mockImplementationOnce(() => '');
      const mockSingleLine = vi
        .spyOn(line, 'convertSingleLine')
        .mockImplementationOnce(() => 'words');
      const testFilepath = '__test__';
      const testFile = 'toHavePixelsConverted.css';
      const joined = `${testFilepath}/${testFile}`;

      convertSingleFile(testFilepath, testFile);

      expect(derived.logYellowInverse).toBeCalledTimes(1);
      expect(derived.logYellowInverse).toBeCalledWith(`Pixel-to-rem conversion has been performed on file: ${joined}`);
    });
  });
  describe('WHEN: The file contains rules that do NOT require conversion,', () => {
    test('THEN: No message is displayed.', () => {
      const mockYellowInverse = vi.spyOn(derived, 'logYellowInverse');
      const mockConvertSingleLine = vi.spyOn(derived, 'logYellowInverse');
      const mockSingleLine = vi
        .spyOn(line, 'convertSingleLine')
        .mockImplementationOnce(() => 'words');
      fs.readFileSync.mockImplementationOnce(() => 'words');
      const testFilepath = '__test__';
      const testFile = 'simpleTextFile.txt';

      convertSingleFile(testFilepath, testFile);

      expect(derived.logYellowInverse).not.toBeCalled();
    });
  });
});
