import 'dotenv/config';
import clipboard from 'clipboardy';
import { beforeAll, afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { addBlocksToBuffer, blocks, notifications } from './addBlocksToBuffer.js';
import { buildCustomBlock } from './utils.js';
import { getAllUserArguments } from './getUserArgs.js';

vi.mock('clipboardy');
vi.mock('./getUserArgs.js');
vi.mock('./utils.js');

describe('addBlocksToBuffer()', ()=>{
  describe('WHEN: Invoked without an argument,', ()=>{
    test('THEN: It tells the user to run the command with the --help flag.', ()=>{
      const consoleSpy = vi.spyOn(console, 'log');

      addBlocksToBuffer();

      expect(consoleSpy).toBeCalledWith(notifications.noArgumentsFound);
    });
  });
  describe('WHEN: Invoked with a --help flag,', ()=>{
    test('THEN: It shows the available flags and their meanings.', ()=>{
      getAllUserArguments.mockImplementationOnce(() => ['--help']);
      const spy = vi.spyOn(console, 'log');

      addBlocksToBuffer();

      expect(spy).toBeCalledWith(notifications.help);
      vi.clearAllMocks();
    });
  });
  describe('WHEN: Given an input of `ddd`', ()=>{
    beforeAll(()=>{
      getAllUserArguments.mockImplementation(() => ['ddd']);
    });
    afterAll(() => vi.clearAllMocks());

    test('THEN: It copies the 3 layers of describe blocks to the clipboard buffer.', ()=>{
      const spy = vi.spyOn(clipboard, 'writeSync');

      addBlocksToBuffer();

      expect(spy).toBeCalledWith(blocks.ddd);
    });
    test('AND: It logs what has been copied to clipboard.', ()=>{
      const consoleSpy = vi.spyOn(console, 'log');

      addBlocksToBuffer();

      expect(consoleSpy).toBeCalledWith(notifications['ddd']);
    });
  });
  describe('WHEN: Given an input of `ddt`', ()=>{
    beforeAll(()=>{
      getAllUserArguments.mockImplementation(() => ['ddt']);
    });
    afterAll(() => vi.clearAllMocks());

    test('THEN: It copies the 2 layers of describe blocks and 1 test block to the clipboard buffer.', ()=>{
      const spy = vi.spyOn(clipboard, 'writeSync');

      addBlocksToBuffer();

      expect(spy).toBeCalledWith(blocks.ddt);
    });
    test('AND: It logs what has been copied to clipboard.', ()=>{
      const spy = vi.spyOn(console, 'log');

      addBlocksToBuffer();

      expect(spy).toBeCalledWith(notifications['ddt']);
    });
  });
  describe('GIVEN: The user wishes to specify the number of `describe` and `test` blocks,', ()=>{
    afterEach(() => vi.clearAllMocks());
    describe('WHEN: The user inputs the flag d5', ()=>{
      test('THEN: It copies to the clipboard a single `describe` block with a nested `describe` block and two test blocks inside that.', ()=>{
        const fiveLayerDescribeBlock = "\ndescribe('', ()=>{\n  describe('', ()=>{\n    describe('', ()=>{\n      describe('', ()=>{\n        describe('', ()=>{\n          //\n        });\n      });\n    });\n  });\n});\n";
        getAllUserArguments.mockImplementationOnce(() => ['d5']);
        buildCustomBlock.mockImplementationOnce(() => fiveLayerDescribeBlock);

        const spy = vi.spyOn(clipboard, 'writeSync');

        addBlocksToBuffer();

        expect(spy).toBeCalledWith(fiveLayerDescribeBlock);
      });
    });
  });
});