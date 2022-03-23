import { describe, test, expect, vi } from 'vitest';
import { main } from './index.js';
import * as versionCheck from './src/nodeVersionCheck.js';
import * as argsEval from './src/evaluateArgs.js';

describe('index.js', ()=>{
  const currentNodeVersion = process.versions.node;
  describe('main()', ()=>{
    test('It clears the screen and logs the user\'s current version of Node.', async ()=>{
      const spyClear = vi.spyOn(console, 'clear');
      const spyLog = vi.spyOn(console, 'log');

      await main();

      expect(spyClear).toHaveBeenCalledTimes(1);
      expect(spyLog).toHaveBeenCalledWith(currentNodeVersion);
    });
    test('It determines whether the user has a compatible version of Node.', async ()=>{
      const spy = vi.spyOn(versionCheck, "getNodeCompatibility");

      await main();

      expect(spy).toHaveBeenCalledWith(currentNodeVersion);
    });
    test('If compatible, it evaluates the arguments the user has entered.', async ()=>{
      const spyGetNodeCompatibility = vi
        .spyOn(versionCheck, "getNodeCompatibility")
        .mockImplementationOnce(()=>true);
      const spyEvaluateArgs = vi.spyOn(argsEval, "evaluateArgs");

      await main();

      expect(spyEvaluateArgs).toHaveBeenCalledTimes(1);
      expect(spyEvaluateArgs).toHaveBeenCalledWith(process.argv);
    });
    test('If incompatible, it does not evaluate user arguments.', async ()=>{
      const spyGetNodeCompatibility = vi
        .spyOn(versionCheck, "getNodeCompatibility")
        .mockImplementationOnce(()=>false);
      const spyEvaluateArgs = vi.spyOn(argsEval, "evaluateArgs");

      await main();

      expect(spyEvaluateArgs).not.toHaveBeenCalled();
    });
  });
});
