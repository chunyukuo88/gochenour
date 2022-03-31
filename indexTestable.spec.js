import { describe, test, expect, vi } from 'vitest';
import { main } from './indexTestable.js';
import { getProcessData } from './src/nodeUtils/getProcessData.js';
import { getNodeCompatibility} from './src/nodeUtils/nodeVersionCheck/index.js';
import './src/testingSuite/cleanAllSuites/index.js';
import * as versionCheck from './src/nodeUtils/nodeVersionCheck/index.js';
import * as argsEval from './src/nodeUtils/evaluateArgs/index.js';

vi.mock('./src/nodeUtils/getProcessData.js');
vi.mock('./src/nodeUtils/nodeVersionCheck/index.js');
vi.mock('./src/testingSuite/cleanAllSuites/index.js');

describe('index.js', ()=>{
  describe('WHEN: main() is invoked:', ()=>{
    test('THEN: It clears the screen.', async ()=>{
      const spyClear = vi.spyOn(console, 'clear');

      await main();

      expect(spyClear).toHaveBeenCalledTimes(1);
    });
    test('THEN: It gets the user\'s version of Node.', async ()=>{
      getProcessData.mockImplementationOnce(()=>{});

      await main();

      expect(getProcessData).toHaveBeenCalled();
    });
    test('THEN: It determines whether the user has a compatible version of Node.', async ()=>{
      const nodeVersion = '16.11.1';
      getProcessData.mockImplementationOnce(() => nodeVersion);
      const spy = vi.spyOn(versionCheck, 'getNodeCompatibility');

      await main();

      expect(spy).toHaveBeenCalledWith(nodeVersion);
    });
    test('THEN: If compatible, it invokes the callback to evaluate the arguments the user has entered.', async ()=>{
      const nodeVersion = '16.11.1';
      getProcessData.mockImplementationOnce(() => nodeVersion);
      getNodeCompatibility.mockImplementationOnce(() => true)
      const spyEvaluateArgs = vi.spyOn(argsEval, 'evaluateArgs');

      await main();

      expect(spyEvaluateArgs).toHaveBeenCalledTimes(1);
    });
    test('THEN: If compatible, it does NOT invoke that callback.', async ()=>{
      const nodeVersion = '1.2.3';
      getProcessData.mockImplementationOnce(() => nodeVersion);
      getNodeCompatibility.mockImplementationOnce(() => false)
      const spyEvaluateArgs = vi.spyOn(argsEval, 'evaluateArgs');

      await main();

      expect(spyEvaluateArgs).not.toHaveBeenCalled();
    });
  });
});
