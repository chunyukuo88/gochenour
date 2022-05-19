import { describe, expect, test, vi } from 'vitest';
import { copyTreeCommandToBuffer } from './index.js';
import clipboard from 'clipboardy';

describe('copyTreeCommandToBuffer()', () => {
  describe('WHEN: this function is invoked,', () => {
    test('THEN: it copies the common tree command to the user\'s clipboard buffer.', () => {
      const expectedBufferContent = 'tree -I "node_modules|coverage|.serverless|dist" ';
      const spy = vi.spyOn(clipboard, 'writeSync');

      copyTreeCommandToBuffer();

      expect(spy).toHaveBeenCalledWith(expectedBufferContent);
    });
  });
});