import { processArrayOfLines } from './utils.js';
import { describe, expect, test } from 'vitest';

import { mocks } from './mocks.js';

describe('buildUpdatedArrayOfLines', ()=>{
  describe('WHEN: Invoked with the lines of a file,', ()=>{
    test('THEN: It runs removal functions on each line and returns an updated array.', ()=>{

      const fileDataArray = mocks.FILE_DATA_ARRAY;
      const updatedArrayOfLines = [
        `test('', ()=>{`,
        ` render(Something)`,
        `});`,
      ];

      const result = processArrayOfLines(fileDataArray);

      expect(result).toEqual(updatedArrayOfLines);
    });
  });
});