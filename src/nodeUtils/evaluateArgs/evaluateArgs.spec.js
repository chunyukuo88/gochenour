import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { evaluateArgs, flagsAndAliases } from './evaluateArgs.js';
import { printAboutText} from '../../display/about/about.js';
import { printHelpText } from '../../display/help/help.js';

vi.mock('../../display/about/about.js');
vi.mock('../../display/help/help.js');
const { ABOUT, ABOUT_ALIAS, HELP, HELP_ALIAS } = flagsAndAliases;

describe('evaluateArgs()', ()=>{
  beforeEach(()=> {
    printAboutText.mockImplementationOnce(vi.fn());
    printHelpText.mockImplementationOnce(vi.fn());
  });
  afterEach(()=> {
    vi.clearAllMocks();
  });
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
});
