import { createMicroservice } from './index.js';
import { templates, messages } from './static.js';
import * as utils from './utils.js';
import { derived } from '../../common/displayMethods.js';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import child_process from 'child_process';
import path from 'path';
import fs from 'fs';

vi.mock('fs');

afterEach(() => vi.clearAllMocks());

describe('GIVEN: The createMicroservice function is invoked,', () => {
  describe('WHEN: the user enters a name for the microservice,', () => {
    describe('AND: a microservice of that name already exists,', () => {
      test('THEN: it tells the user to try again.', async () => {
        const mockUserResponses = {};
        mockUserResponses.microserviceName = 'index.js';

        vi.spyOn(utils, 'getUserResponses').mockImplementationOnce(() => mockUserResponses);
        vi.spyOn(utils, 'getUserResponses').mockImplementationOnce(() => mockUserResponses);
        vi.spyOn(utils, 'getUserResponses').mockImplementationOnce(() => mockUserResponses);
        vi.spyOn(utils, 'getUserResponses').mockImplementationOnce(() => mockUserResponses);
        fs.readdirSync.mockImplementationOnce(() => ['index.js', 'index.test.js', 'utils.js']);
        vi.spyOn(fs, 'mkdirSync');
        const loggerSpy = vi.spyOn(derived, 'logRedBox');

        await createMicroservice();

        expect(loggerSpy).toBeCalledWith(messages.SERVICE_ALREADY_EXISTS);
      });
    });
    describe('AND: the new name is valid', () => {
      const mockUserResponses = {
        microserviceName: 'woob',
        httpMethod: 'GET',
        shouldCreatePackageJson: 'No',
      };
      let loggerSpy;
      beforeEach(async () => {
        vi.spyOn(utils, 'getUserResponses').mockImplementation(() => mockUserResponses);
        vi.spyOn(utils, 'getUserResponses').mockImplementation(() => mockUserResponses);
        vi.spyOn(utils, 'getUserResponses').mockImplementation(() => mockUserResponses);
        loggerSpy = vi.spyOn(derived, 'logGreenBox');
        vi.spyOn(fs, 'mkdirSync');
        fs.readdirSync.mockImplementation(() => ['index.js', 'index.test.js', 'utils.js']);
        await createMicroservice();
      });

      test('THEN: it tells the user that creation was successful.', async () => {
        expect(loggerSpy).toBeCalledWith(messages.SUCCESS_MESSAGE);
      });
      test('THEN: it creates the folders for the new microservice', async () => {
        expect(fs.mkdirSync).toBeCalledWith(mockUserResponses.microserviceName);
        expect(fs.mkdirSync).toBeCalledWith(`${mockUserResponses.microserviceName}/src`, { recursive: true });
        expect(fs.mkdirSync).toBeCalledWith(`${mockUserResponses.microserviceName}/test/unit`, { recursive: true });
        expect(fs.mkdirSync).toBeCalledWith(`${mockUserResponses.microserviceName}/test/integration`, { recursive: true });
      });
      test('THEN: it creates a Controller for the new microservice', async () => {
        const filePath = path.join(process.cwd(), mockUserResponses.microserviceName);
        const completeFilePath = `${filePath}/src/Controller.js`;

        expect(fs.writeFileSync).toBeCalledWith(completeFilePath, templates.Controller);
      });
      test('THEN: it creates an httpHandler based on what the HTTP method the user selects.', () => {
        const { microserviceName, httpMethod } = mockUserResponses;
        const filePath = path.join(process.cwd(), microserviceName);
        const completeFilePath = `${filePath}/src/httpGetHandler.js`;
        expect(fs.writeFileSync).toBeCalledWith(completeFilePath, templates.handler(httpMethod));
      });
      test('THEN: it creates a controllerFactory module based on what the HTTP method the user selects.', () => {
        const { microserviceName } = mockUserResponses;
        const filePath = path.join(process.cwd(), microserviceName);
        const completeFilePath = `${filePath}/src/controllerFactory.js`;
        expect(fs.writeFileSync).toBeCalledWith(completeFilePath, templates.controllerFactory);
      });
      test('THEN: it creates the 6 configuration files that are common to all microservices.', () => {
        const { microserviceName } = mockUserResponses;
        const filePath = path.join(process.cwd(), microserviceName);
        const envFile = `${filePath}/.env`;
        const babelRc = `${filePath}/.babelrc`;
        const eslintrc = `${filePath}/.eslintrc`;
        const jestConfig = `${filePath}/jest.config.js`;
        const npmIgnore = `${filePath}/.npmignore`;
        const swagger = `${filePath}/swagger.yml`;

        expect(fs.writeFileSync).toBeCalledWith(envFile, '');
        expect(fs.writeFileSync).toBeCalledWith(babelRc, templates.babelrc);
        expect(fs.writeFileSync).toBeCalledWith(eslintrc, templates.eslintrc);
        expect(fs.writeFileSync).toBeCalledWith(jestConfig, templates.jestConfig);
        expect(fs.writeFileSync).toBeCalledWith(npmIgnore, templates.npmIgnore);
        expect(fs.writeFileSync).toBeCalledWith(swagger, '');
      });
      test('THEN: it creates the serverless.yml file.', () => {
        const { microserviceName, httpMethod } = mockUserResponses;
        const filePath = path.join(process.cwd(), microserviceName);
        const serverlessYml = `${filePath}/serverless.yml`;

        expect(fs.writeFileSync).toBeCalledWith(serverlessYml, templates.serverlessYml(microserviceName, httpMethod));
      });
      test('THEN: it creates the test file for the Controller.', () => {
        const filePath = path.join(process.cwd(), mockUserResponses.microserviceName);
        const controllerTestPath = `${filePath}/test/unit/Controller.test.js`;

        expect(fs.writeFileSync).toBeCalledWith(controllerTestPath, templates.ControllerTest);
      });
      test('THEN: it creates the test file for the handler.', () => {
        const filePath = path.join(process.cwd(), mockUserResponses.microserviceName);
        const handlerTestPath = `${filePath}/test/unit/httpGetHandler.test.js`;

        expect(fs.writeFileSync).toBeCalledWith(handlerTestPath, templates.handlerTest(mockUserResponses.httpMethod));
      });
      test('THEN: it creates the test file for the controllerFactory.', () => {
        const filePath = path.join(process.cwd(), mockUserResponses.microserviceName);
        const controllerFactoryTestPath = `${filePath}/test/unit/controllerFactory.test.js`;

        expect(fs.writeFileSync).toBeCalledWith(controllerFactoryTestPath, templates.controllerFactoryTest);
      });
    });
  });
  describe('WHEN: it asks the user if they want to run `npm init` to create a package.json file,', () =>{
    describe('AND: the user selects YES,', () => {
      test.skip('THEN: it creates the package.json file inside the newly created microservice\'s root.', async () => {
        const userResponses = {
          microserviceName: 'woob',
          httpMethod: 'GET',
          shouldCreatePackageJson: 'Yes',
        };
        vi.spyOn(utils, 'getUserResponses').mockImplementation(() => userResponses);
        vi.spyOn(utils, 'getUserResponses').mockImplementation(() => userResponses);
        vi.spyOn(utils, 'getUserResponses').mockImplementation(() => userResponses);
        vi.spyOn(fs, 'mkdirSync');
        fs.readdirSync.mockImplementation(() => ['index.js', 'index.test.js', 'utils.js']);
        const spy = vi.spyOn(child_process, 'execSync');

        await createMicroservice();

        expect(spy).toBeCalledWith('npm init -y', { cwd: `${userResponses.microserviceName}`});
      });
    });
    describe('AND: the user selects NO,', () => {
      test('THEN: the application terminates.', async () => {
        const userResponses = {
          microserviceName: 'woob',
          httpMethod: 'GET',
          shouldCreatePackageJson: 'No',
        };
        vi.spyOn(utils, 'getUserResponses').mockImplementation(() => userResponses);
        vi.spyOn(utils, 'getUserResponses').mockImplementation(() => userResponses);
        vi.spyOn(utils, 'getUserResponses').mockImplementation(() => userResponses);
        vi.spyOn(fs, 'mkdirSync');
        const spy = vi.spyOn(child_process, 'execSync');
        fs.readdirSync.mockImplementation(() => ['index.js', 'index.test.js', 'utils.js']);

        await createMicroservice();

        expect(spy).not.toBeCalled();
      });
    });
  });
});
