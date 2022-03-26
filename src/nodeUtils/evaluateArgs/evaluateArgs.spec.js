import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { evaluateArgs, flags } from './evaluateArgs.js';
import { printAboutText} from '../../display/about/about.js';
import { printHelpText } from '../../display/help/help.js';
import { addBlocksToBuffer } from '../../testingSuite/addBlocksToBuffer/addBlocksToBuffer.js';

vi.mock('../../display/about/about.js');
vi.mock('../../display/help/help.js');
vi.mock('../../testingSuite/addBlocksToBuffer/addBlocksToBuffer.js');
const {
  ABOUT,
  ABOUT_ALIAS,
  ADD_BLOCKS,
  ADD_BLOCKS_ALIAS,
  HELP,
  HELP_ALIAS,
} = flags;

beforeEach(()=> {
  printAboutText.mockImplementationOnce(vi.fn());
  printHelpText.mockImplementationOnce(vi.fn());
  addBlocksToBuffer.mockImplementationOnce(vi.fn());
});
afterEach(()=> {
  vi.clearAllMocks();
});

describe('evaluateArgs()', ()=>{
  describe(`WHEN: Invoked with a flag of ABOUT`, ()=>{
    it('THEN: It runs the printAboutText() script', async ()=>{
      const argsArray = [ ABOUT[0] ];

      await evaluateArgs(argsArray);

      expect(printAboutText).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Given a flag of ABOUT_ALIAS`, ()=>{
    it('THEN: It runs the printAboutText() script', ()=>{
      const argsArray = [ ABOUT_ALIAS[0] ];

      evaluateArgs(argsArray);

      expect(printAboutText).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of ABOUT`, ()=>{
    it('THEN: It runs the printAboutText() script', async ()=>{
      const argsArray = [ HELP[0] ];

      await evaluateArgs(argsArray);

      expect(printHelpText).toHaveBeenCalledTimes(1);

    });
  });
  describe(`WHEN: Given a flag of ABOUT_ALIAS`, ()=>{
    it('THEN: It runs the printAboutText() script', ()=>{
      const argsArray = [ HELP_ALIAS[0] ];

      evaluateArgs(argsArray);

      expect(printHelpText).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of ADD_BLOCKS`, ()=>{
    it('THEN: It runs the addBlocksToBuffer() script', async ()=>{
      const argsArray = [ ADD_BLOCKS[0] ];

      await evaluateArgs(argsArray);

      expect(addBlocksToBuffer).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of ADD_BLOCKS_ALIAS`, ()=>{
    it('THEN: It runs the addBlocksToBuffer() script', async ()=>{
      const argsArray = [ ADD_BLOCKS_ALIAS[0] ];

      await evaluateArgs(argsArray);

      expect(addBlocksToBuffer).toHaveBeenCalledTimes(1);
    });
  });
});
