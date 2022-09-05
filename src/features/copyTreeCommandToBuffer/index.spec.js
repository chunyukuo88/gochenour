import { describe, expect, test, vi } from 'vitest';
import { copyTreeCommandToBuffer, expectedBufferContent, treeCommand } from './index.js';
import clipboard from 'clipboardy';
import { derived } from '../../common/displayMethods.js';

vi.mock('../../common/displayMethods.js', ()=>({
  derived : {
    logGreenBox: vi.fn(),
  }
}));

describe('copyTreeCommandToBuffer()', () => {
  describe('WHEN: this function is invoked,', () => {
    test('THEN: it copies the common tree command to the user\'s clipboard buffer.', () => {
      const spy = vi.spyOn(clipboard, 'writeSync');

      copyTreeCommandToBuffer();

      expect(spy).toHaveBeenCalledWith(treeCommand);
    });
    test('AND: it logs a message indicating that the tree command has been copied.', () => {
      copyTreeCommandToBuffer();
    
      expect(derived.logGreenBox).toHaveBeenCalledWith(expectedBufferContent);
    });
  });
});
