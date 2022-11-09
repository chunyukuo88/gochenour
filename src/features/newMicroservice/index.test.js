import { createMicroservice } from './index.js';
import { templates, messages } from './static.js';
import * as utils from './utils.js';
import { derived } from '../../common/displayMethods.js';

import { beforeEach, describe, expect, test, vi } from 'vitest';
import path from 'path';
import fs from 'fs';

vi.mock('fs');

describe('GIVEN: The createMicroservice function is invoked,', () => {
  describe('WHEN: the user enters a name for the microservice,', () => {
    describe('AND: a microservice of that name already exists,', () => {
      test('THEN: it tells the user to try again.', async () => {
        const mockUserResponses = {
          microserviceName: 'index.js',
          httpMethod: 'GET',
        };

        vi.spyOn(utils, 'getUserResponses').mockImplementationOnce(() => mockUserResponses);
        vi.spyOn(utils, 'getUserResponses').mockImplementationOnce(() => mockUserResponses);
        fs.readdirSync.mockImplementationOnce(() => ['index.js', 'index.test.js', 'utils.js']);
        const loggerSpy = vi.spyOn(derived, 'logRedBox');

        await createMicroservice();

        expect(loggerSpy).toBeCalledWith(messages.SERVICE_ALREADY_EXISTS);
      });
    });
    describe('AND: the new name is valid', () => {
      const mockUserResponses = {
        microserviceName: 'woob',
        httpMethod: 'GET',
      };
      let loggerSpy;
      beforeEach(async () => {
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
        expect(fs.mkdirSync).toBeCalledWith(`${mockUserResponses.microserviceName}/test`, { recursive: true });
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
      test('THEN: it creates the a test files Controller.', () => {
        const filePath = path.join(process.cwd(), mockUserResponses.microserviceName);
        const controllerTestPath = `${filePath}/test/Controller.test.js`;

        expect(fs.writeFileSync).toBeCalledWith(controllerTestPath, templates.ControllerTest);
      });
      test('THEN: it creates the a test files handler.', () => {
        const filePath = path.join(process.cwd(), mockUserResponses.microserviceName);
        const handlerTestPath = `${filePath}/test/httpGetHandler.test.js`;

        expect(fs.writeFileSync).toBeCalledWith(handlerTestPath, templates.handlerTest(mockUserResponses.httpMethod));
      });
    });
  });
});
