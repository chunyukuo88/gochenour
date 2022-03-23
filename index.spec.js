import { describe, test, expect, vi } from 'vitest';
import { main } from './index.js';
import { getCurrentNodeVersion } from './src/nodeUtils/getCurrentNodeVersion';
import { getNodeCompatibility } from './src/nodeUtils/nodeVersionCheck.js';
import * as versionCheck from './src/nodeUtils/nodeVersionCheck.js';
import * as argsEval from './src/nodeUtils/evaluateArgs.js';

vi.mock('./src/getCurrentNodeVersion');
vi.mock('./src/nodeVersionCheck.js');

describe('index.js', ()=>{
  describe('WHEN: main() is invoked:', ()=>{
    test('THEN: It clears the screen.', async ()=>{

      const spyClear = vi.spyOn(console, 'clear');

      await main();

      expect(spyClear).toHaveBeenCalledTimes(1);
    });
    test('THEN: It gets the user\'s version of Node.', async ()=>{
      const nodeVersion = '1.2.3';
      getCurrentNodeVersion.mockImplementationOnce(() => nodeVersion);

      await main();

      expect(getCurrentNodeVersion).toHaveBeenCalled();
    });
    test('THEN: It determines whether the user has a compatible version of Node.', async ()=>{
      const nodeVersion = '16.11.1';
      getCurrentNodeVersion.mockImplementationOnce(() => nodeVersion);
      const spy = vi.spyOn(versionCheck, 'getNodeCompatibility');

      await main();

      expect(spy).toHaveBeenCalledWith(nodeVersion);
    });
    test('THEN: If compatible, it invokes the callback to evaluate the arguments the user has entered.', async ()=>{
      const nodeVersion = '16.11.1';
      getCurrentNodeVersion.mockImplementationOnce(() => nodeVersion);
      getNodeCompatibility.mockImplementationOnce(() => true)
      const spyEvaluateArgs = vi.spyOn(argsEval, "evaluateArgs");

      await main();

      expect(spyEvaluateArgs).toHaveBeenCalledTimes(1);
    });
    test('THEN: If compatible, it does NOT invoke that callback.', async ()=>{
      const nodeVersion = '1.2.3';
      getCurrentNodeVersion.mockImplementationOnce(() => nodeVersion);
      getNodeCompatibility.mockImplementationOnce(() => false)
      const spyEvaluateArgs = vi.spyOn(argsEval, "evaluateArgs");

      await main();

      expect(spyEvaluateArgs).not.toHaveBeenCalled();
    });
  });
});
