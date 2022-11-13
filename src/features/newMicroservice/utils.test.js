import { derived } from '../../common/displayMethods.js';
import { describe, expect, test, vi } from 'vitest';
import { installPackages } from './utils.js';
import { execSync } from 'child_process';
import {messages, templates} from './static.js';

vi.mock('child_process');

describe('GIVEN: a response object "res" that includes a shouldCreatePackageJson string,', ()=>{
  describe('WHEN: the installPackages function is invoked,', ()=>{
    const res = {
      shouldCreatePackageJson: 'Yes',
      microserviceName: 'testName',
    };
    execSync.mockImplementation(vi.fn());
    const loggerSpy = vi.spyOn(derived, 'logGreenBox');

    installPackages(res);
    test('THEN: it creates the package.json file.', ()=>{
      expect(execSync).toBeCalledWith('npm init -y', {  cwd: `${ res.microserviceName }` });
    });
    test('THEN: it logs in green the success of the creation of the package.json file.', ()=>{
      expect(loggerSpy).toBeCalledWith(messages.PACKAGE_JSON_CREATION);
    });
    test('THEN: it installs the dev dependencies.', ()=>{
      expect(execSync).toBeCalledWith(`cd ${ res.microserviceName } && npm i --save-dev ${ templates.packageJsonDevDependencies }`);
    });
    test('THEN: it installs the other dependencies.', ()=>{
      expect(execSync).toBeCalledWith(`cd ${ res.microserviceName } && npm i ${ templates.packageJsonDependencies }`);
    });
    test('THEN: it logs in green the success of the installation of dependencies.', ()=>{
      expect(loggerSpy).toBeCalledWith(messages.PACKAGE_JSON_CREATION);
    });
  });
});
