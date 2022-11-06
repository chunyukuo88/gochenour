import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { evaluateArgs, flags } from './index.js';
import { printAboutText} from '../../features/display/about/about.js';
import { printHelpText } from '../../features/display/help/help.js';
import { addBlocksToBuffer } from '../../features/testingSuite/addBlocksToBuffer';
import { copyVitestBoilerplate } from '../../features/testingSuite/copyVitestBoilerplate/index.js';
import { copyTreeCommandToBuffer } from '../../features/copyTreeCommandToBuffer/index.js';
import { convertPixelsInAllFiles } from '../../features/convertPixelsToRem/index.js';
import { alphabetizeCssInAllFiles } from '../../features/sortCss/index.js';
import { createMicroservice } from '../../features/newMicroservice/index.js';
import { derived } from '../../common/displayMethods.js';

vi.mock('../../features/display/about/about.js');
vi.mock('../../features/display/help/help.js');
vi.mock('../../features/testingSuite/addBlocksToBuffer/index.js');
vi.mock('../../features/copyTreeCommandToBuffer/index.js');
vi.mock('../../features/testingSuite/copyVitestBoilerplate/index.js');
vi.mock('../../features/convertPixelsToRem/index.js');
vi.mock('../../features/sortCss/index.js');
vi.mock('../../features/newMicroservice/index.js');
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
vi.mock('../../convertPixelsToRem/index.js');

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
  describe(`WHEN: Invoked with a flag of VITEST`, ()=>{
    it('THEN: It runs the copyVitestBoilerplate() script', async ()=>{
      copyVitestBoilerplate.mockImplementationOnce(vi.fn());
      const argsArray = [ flags.VITEST[0] ];

      await evaluateArgs(argsArray);

      expect(copyVitestBoilerplate).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of VITEST_ALIAS`, ()=>{
    it('THEN: It runs the copyVitestBoilerplate() script', async ()=>{
      copyVitestBoilerplate.mockImplementationOnce(vi.fn());
      const argsArray = [ flags.VITEST_ALIAS[0] ];

      await evaluateArgs(argsArray);

      expect(copyVitestBoilerplate).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of TREE`, ()=>{
    it('THEN: It runs the copyTreeCommandToBuffer() script', async ()=>{
      copyTreeCommandToBuffer.mockImplementationOnce(vi.fn());
      const argsArray = [ flags.TREE[0] ];

      await evaluateArgs(argsArray);

      expect(copyTreeCommandToBuffer).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of PIXEL`, ()=>{
    it('THEN: It runs the convertPixelsInAllFiles() script.', async ()=>{
      convertPixelsInAllFiles.mockImplementationOnce(vi.fn());
      const argsArray = [ flags.PIXEL[0] ];

      await evaluateArgs(argsArray);

      expect(convertPixelsInAllFiles).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of PIXEL_ALIAS`, ()=>{
    it('THEN: It runs the convertPixelsInAllFiles() script.', async ()=>{
      convertPixelsInAllFiles.mockImplementationOnce(vi.fn());
      const argsArray = [ flags.PIXEL_ALIAS[0] ];

      await evaluateArgs(argsArray);

      expect(convertPixelsInAllFiles).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of SORT_CSS`, ()=>{
    it('THEN: It runs the alphabetizeCssInAllFiles() script.', async ()=>{
      alphabetizeCssInAllFiles.mockImplementationOnce(vi.fn());
      const argsArray = [ flags.SORT_CSS[0] ];

      await evaluateArgs(argsArray);

      expect(alphabetizeCssInAllFiles).toHaveBeenCalledTimes(1);
    });
  });
  describe(`WHEN: Invoked with a flag of NEW_SERVICE`, ()=>{
    it('THEN: It runs the createMicroservice() script.', async () => {
      createMicroservice.mockImplementationOnce(vi.fn());
      const argsArray = [ flags.NEW_SERVICE[0] ];

      await evaluateArgs(argsArray);

      expect(createMicroservice).toHaveBeenCalledTimes(1);
    });
  });
});
