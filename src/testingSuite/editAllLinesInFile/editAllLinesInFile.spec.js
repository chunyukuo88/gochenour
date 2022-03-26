import { describe, test, expect } from 'vitest';
import { removeDebugFromGivenFile } from './editAllLinesInFile.js';

describe('removeDebugFromGivenFile()', ()=>{
  describe('WHEN: Invoked on a specific file,', ()=>{
    test('THEN: It runs a function on each line of that file.', ()=>{
      const someEditFn = (lineOfCode) => lineOfCode + ' - EDITED.';


    });
  });
});