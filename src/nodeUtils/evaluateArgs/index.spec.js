import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { evaluateArgs, flags } from './index.js';
import { printAboutText} from '../../display/about/about.js';
import { printHelpText } from '../../display/help/help.js';
import { addBlocksToBuffer } from '../../testingSuite/addBlocksToBuffer';
import { derived } from '../../common/displayMethods.js';
import chalk from "chalk";
import boxen from "boxen";

vi.mock('../../display/about/about.js');
vi.mock('../../display/help/help.js');
vi.mock('../../testingSuite/addBlocksToBuffer/index.js');
vi.mock('../../common/displayMethods.js', ()=>({
 derived: {
   logBox: vi.fn(),
   logCyanBox: vi.fn(),
   logGreenBox: vi.fn(),
   logRedBox: vi.fn(),
   logYellow: vi.fn(),
   logYellowBox: vi.fn(),
   logYellowInverse: vi.fn(),
   underline: vi.fn(),
 },
}));

beforeEach(()=> {
  printAboutText.mockImplementationOnce(vi.fn());
  printHelpText.mockImplementationOnce(vi.fn());
  addBlocksToBuffer.mockImplementationOnce(vi.fn());
});
afterEach(()=> {
  vi.clearAllMocks();
});

describe('evaluateArgs()', ()=>{
  describe('WHEN: Invoked without an argument', ()=>{
    it('THEN: It logs a msg stating that no arguments were found.', ()=>{
      evaluateArgs();

      expect(derived.logBox).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of ABOUT`, ()=>{
    it('THEN: It runs the printAboutText() script', async ()=>{
      const argsArray = [ flags.ABOUT[0] ];

      await evaluateArgs(argsArray);

      expect(printAboutText).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Given a flag of ABOUT_ALIAS`, ()=>{
    it('THEN: It runs the printAboutText() script', ()=>{
      const argsArray = [ flags.ABOUT_ALIAS[0] ];

      evaluateArgs(argsArray);

      expect(printAboutText).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of ABOUT`, ()=>{
    it('THEN: It runs the printAboutText() script', async ()=>{
      const argsArray = [ flags.HELP[0] ];

      await evaluateArgs(argsArray);

      expect(printHelpText).toHaveBeenCalledTimes(1);

    });
  });
  describe(`WHEN: Given a flag of ABOUT_ALIAS`, ()=>{
    it('THEN: It runs the printAboutText() script', ()=>{
      const argsArray = [ flags.HELP_ALIAS[0] ];

      evaluateArgs(argsArray);

      expect(printHelpText).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of ADD_BLOCKS`, ()=>{
    it('THEN: It runs the addBlocksToBuffer() script', async ()=>{
      const argsArray = [ flags.ADD_BLOCKS[0] ];

      await evaluateArgs(argsArray);

      expect(addBlocksToBuffer).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of ADD_BLOCKS_ALIAS`, ()=>{
    it('THEN: It runs the addBlocksToBuffer() script', async ()=>{
      const argsArray = [ flags.ADD_BLOCKS_ALIAS[0] ];

      await evaluateArgs(argsArray);

      expect(addBlocksToBuffer).toHaveBeenCalledTimes(1);
    });
  });
});


