import clipboard from 'clipboardy';
import { derived } from '../../common/displayMethods.js';

export function copyVitestBoilerplate(){
  clipboard.writeSync(vitestBoilerplateString);
  derived.logGreenBox(successMsg);
}

export const successMsg = 'The Vitest boilerplate has been copied to your system\'s clipboard.';

export const vitestBoilerplateString = `
import { describe, expect, test, vi } from 'vitest';
import {} from '';

describe('GIVEN: ', ()=>{
  describe('WHEN: ', ()=>{
    test('THEN: ', ()=>{
      //
    });
  });
});
`;