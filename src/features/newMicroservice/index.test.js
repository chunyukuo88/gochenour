import { createMicroservice } from './index.js';
import { templates, messages } from './static.js';
import * as utils from './utils.js';
import { derived } from '../../common/displayMethods.js';

import { beforeEach, describe, expect, test, vi } from 'vitest';
import path from 'path';
import fs from 'fs';

vi.mock('fs');

describe.skip('GIVEN: The createMicroservice function is invoked,', () => {
  describe('WHEN: the user enters a name for the microservice,', () => {
    describe('AND: a microservice of that name already exists,', () => {
      test('THEN: it tells the user to try again.', async () => {
        const mockUserResponses = {
          microserviceName: 'index.js',
          httpMethod: 'GET',
        };

        vi.spyOn(utils, 'getUserResponses').mockImplementationOnce(() => mockUserResponses);
        fs.readdirSync.mockImplementationOnce(() => ['index.js', 'index.test.js', 'utils.js']);
        const loggerSpy = vi.spyOn(derived, 'logRedBox');

        await createMicroservice();

        expect(loggerSpy).toBeCalledWith(messages.SERVICE_ALREADY_EXISTS);
      });
    });
    describe('AND: the new name is valid', () => {
      const mockUserResponses = {
        microserviceName: 'someMicroservice',
        httpMethod: 'GET',
      };
      let loggerSpy;
      beforeEach(async () => {
        vi.spyOn(utils, 'getUserResponses').mockImplementation(() => mockUserResponses);
        loggerSpy = vi.spyOn(derived, 'logGreenBox');
        vi.spyOn(fs, 'mkdirSync');
        fs.readdirSync.mockImplementation(() => ['index.js', 'index.test.js', 'utils.js']);
        await createMicroservice();
      });

      test('THEN: it tells the user that creation was successful.', async () => {
        expect(loggerSpy).toBeCalledWith(messages.SUCCESS_MESSAGE);
      });
      test('THEN: it creates a folder for the new microservice', async () => {
        expect(fs.mkdirSync).toBeCalledWith(mockUserResponses.microserviceName);
      });
      test('THEN: it creates a Controller for the new microservice', async () => {
        const filePath = path.join(process.cwd(), mockUserResponses.microserviceName);
        const completeFilePath = `${filePath}/Controller.js`;

        expect(fs.writeFileSync).toBeCalledWith(completeFilePath, templates.Controller);
      });
      test.skip('THEN: it creates an httpHandler based on what the HTTP method the user selects.', () => {
        const { microserviceName, httpMethod } = mockUserResponses;
        const filePath = path.join(process.cwd(), microserviceName);
        const completeFilePath = `${filePath}/http${httpMethod}.js`;
        const handlerContent = '';
        expect(fs.writeFileSync).toBeCalledWith(completeFilePath, templates.httpMethod);
      });
    });
  });
});
