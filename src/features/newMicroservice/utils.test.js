import { describe, expect, test, vi } from 'vitest';
import { exec } from 'child_process';
import { installDependencies } from './utils';
import { templates } from './static.js';

vi.mock('child_process');

describe('GIVEN: a microserviceName', ()=>{
  describe('WHEN: invoked,', ()=>{
    test('THEN: It ', async ()=>{
      const microserviceName = 'service';
      const mockCommand = `cd ${microserviceName} && npm i --save-dev ${templates.packageJsonDevDependencies}`;
      const mockOptions = {};
      exec.mockImplementationOnce(vi.fn());

      await installDependencies(microserviceName);

      expect(exec).toBeCalledWith(mockCommand, mockOptions, expect.any(Function));
    });
  });
});
