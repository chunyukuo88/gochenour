import { describe, expect, test, vi } from 'vitest';
import clipboard from 'clipboardy';
import { addBlocksToBuffer, blocks } from './addBlocksToBuffer.js';

vi.mock('clipboardy');

describe('addBlocksToBuffer()', ()=>{
  describe('WHEN: Given an input of `ddd`', ()=>{
    test('THEN: It copies the 3 layers of describe blocks to the clipboard buffer.', ()=>{
      const spy = vi.spyOn(clipboard, 'writeSync');

      const userInput = 'ddd';

      addBlocksToBuffer(userInput);

      expect(spy).toBeCalledWith(blocks.describeBlocks3Layers);
    });
    test('AND: It notifies the user of what has been copied to their clipboard.', ()=>{
      const spy = vi.spyOn(clipboard, 'writeSync');
      const consoleSpy = vi.spyOn(console, 'log');

      const userInput = 'ddd';

      addBlocksToBuffer(userInput);

      expect(consoleSpy).toBeCalledWith(`The following has been copied to your clipboard: ${blocks.describeBlocks3Layers}`);
    });
  });
  describe('WHEN: Given an input of `ddt`', ()=>{
    test('THEN: It copies the 2 layers of describe blocks and 1 test block to the clipboard buffer.', ()=>{
      const spy = vi.spyOn(clipboard, 'writeSync');

      const userInput = 'ddt';

      addBlocksToBuffer(userInput);

      expect(spy).toBeCalledWith(blocks.describeBlocks2Test);
    });
    test('AND: It notifies the user of what has been copied to their clipboard.', ()=>{
      const spy = vi.spyOn(console, 'log');

      const userInput = 'ddt';

      addBlocksToBuffer(userInput);

      expect(spy).toBeCalledWith(`The following has been copied to your clipboard: ${blocks.describeBlocks2Test}`);
    });
  });
});