import 'dotenv/config';
import clipboard from 'clipboardy';
import { beforeAll, afterAll, describe, expect, test, vi } from 'vitest';
import { addBlocksToBuffer, blocks, notifications } from './addBlocksToBuffer.js';
import { getSingleUserArgument } from '../getUserArgs.js';

vi.mock('clipboardy');
vi.mock('../getUserArgs.js');

describe('addBlocksToBuffer()', ()=>{
  describe('WHEN: Given an input of `ddd`', ()=>{
    beforeAll(()=>{
      getSingleUserArgument.mockImplementation(() => 'ddd');
    });
    afterAll(() => vi.clearAllMocks());

    test('THEN: It copies the 3 layers of describe blocks to the clipboard buffer.', ()=>{
      const spy = vi.spyOn(clipboard, 'writeSync');

      addBlocksToBuffer();

      expect(spy).toBeCalledWith(blocks.describeBlocks3Layers);
    });
    test('AND: It logs what has been copied to clipboard.', ()=>{
      const consoleSpy = vi.spyOn(console, 'log');

      addBlocksToBuffer();

      expect(consoleSpy).toBeCalledWith(notifications['ddd']);
    });
  });
  describe('WHEN: Given an input of `ddt`', ()=>{
    beforeAll(()=>{
      getSingleUserArgument.mockImplementation(() => 'ddt');
    });
    afterAll(() => vi.clearAllMocks());

    test('THEN: It copies the 2 layers of describe blocks and 1 test block to the clipboard buffer.', ()=>{
      const spy = vi.spyOn(clipboard, 'writeSync');

      addBlocksToBuffer();

      expect(spy).toBeCalledWith(blocks.describeBlocks2Test);
    });
    test('AND: It logs what has been copied to clipboard.', ()=>{
      const spy = vi.spyOn(console, 'log');

      addBlocksToBuffer();

      expect(spy).toBeCalledWith(notifications['ddt']);
    });
  });
});