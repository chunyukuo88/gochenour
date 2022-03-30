import 'dotenv/config';
import clipboard from 'clipboardy';
import { beforeAll, afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { addBlocksToBuffer, presetBlocks, notifications } from './index.js';
import { buildCustomBlock } from './utils.js';
import { derived } from '../../common/displayMethods.js';
import { getAllUserArguments } from './getUserArgs.js';

vi.mock('clipboardy');
vi.mock('./getUserArgs.js');
vi.mock('./utils.js');
vi.mock('../../common/displayMethods.js', ()=>({
  derived: {
    logRedBox: vi.fn(),
    logCyanBox: vi.fn(),
    logGreenBox: vi.fn(),
  }
}));





describe('addBlocksToBuffer()', ()=>{
  describe('WHEN: Invoked without an argument,', ()=>{
    test('THEN: It tells the user to run the command with the --help flag.', ()=>{
      getAllUserArguments.mockImplementationOnce(() => []);
      const expectedErrorMsg = '\n Invalid argument or no arguments found.\n Try running this command again with the --help flag for more information. ';
      addBlocksToBuffer();

      expect(derived.logRedBox).toBeCalledWith(expectedErrorMsg);
    });
  });
  describe('WHEN: Invoked with a --help flag,', ()=>{
    test('THEN: It shows the available flags and their meanings.', ()=>{
      getAllUserArguments.mockImplementationOnce(() => ['--help']);

      addBlocksToBuffer();

      expect(derived.logCyanBox).toBeCalledWith(notifications.help);
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

      expect(spy).toBeCalledWith(presetBlocks.ddd);
    });
    test('AND: It logs what has been copied to clipboard.', ()=>{
      addBlocksToBuffer();

      expect(derived.logGreenBox).toBeCalledWith(notifications['ddd']);
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

      expect(spy).toBeCalledWith(presetBlocks.ddt);
    });
    test('AND: It logs what has been copied to clipboard.', ()=>{
      addBlocksToBuffer();

      expect(derived.logGreenBox).toBeCalledWith(notifications['ddt']);
    });
  });
  describe('GIVEN: The user wishes to specify the number of `describe` and `test` blocks,', ()=>{
    afterEach(() => vi.clearAllMocks());
    describe('WHEN: The user inputs the custom flag "d5"', ()=>{
      test('THEN: It copies to the clipboard a single `describe` block with a nested `describe` block and two test blocks inside that.', ()=>{
        const fiveLayerDescribeBlock = "\ndescribe('', ()=>{\n  describe('', ()=>{\n    describe('', ()=>{\n      describe('', ()=>{\n        describe('', ()=>{\n          //\n        });\n      });\n    });\n  });\n});\n";
        getAllUserArguments.mockImplementationOnce(() => ['d5']);
        buildCustomBlock.mockImplementationOnce(() => fiveLayerDescribeBlock);

        const spy = vi.spyOn(clipboard, 'writeSync');

        addBlocksToBuffer();

        expect(spy).toBeCalledWith(fiveLayerDescribeBlock);
      });
    });
    describe('WHEN: The user inputs an invalid custom flag', ()=>{
      test('THEN: It renders the error message specific to invalid custom flags.', ()=>{
        getAllUserArguments.mockImplementationOnce(() => ['invalid! 123456']);
        const errorFromCompiler = 'Expected a string, got undefined';
        buildCustomBlock.mockImplementationOnce(()=> {
          throw new Error(errorFromCompiler);
        });
        const expectedError = ` FAILED TO COPY CUSTOM BLOCK: Error: ${errorFromCompiler}\n Invalid argument or no arguments found.\n Try running this command again with the --help flag for more information. `;

        addBlocksToBuffer();

        expect(derived.logRedBox).toBeCalledWith(expectedError);
      });
    });
  });
});