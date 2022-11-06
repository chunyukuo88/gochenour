import { createMicroservice, messages } from './index.js';
import * as utils from './utils.js';
import { derived } from '../../common/displayMethods.js';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import fs from 'fs';
import path from "path";

vi.mock('fs');

describe('GIVEN: The createMicroservice function is invoked,', () => {
  describe('WHEN: the user enters a name for the microservice,', () => {
    describe('AND: a microservice of that name already exists,', () => {
      test('THEN: it tells the user to try again.', async () => {
        const mockUserResponses = {
          nameOfNewService: 'index.js',
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
          nameOfNewService: 'someMicroservice',
        };
        let loggerSpy;
        beforeEach(async () => {
          vi.spyOn(utils, 'getUserResponses').mockImplementationOnce(() => mockUserResponses);
          loggerSpy = vi.spyOn(derived, 'logGreenBox');
          vi.spyOn(fs, 'mkdirSync');
          fs.readdirSync.mockImplementationOnce(() => ['index.js', 'index.test.js', 'utils.js']);
          await createMicroservice();
        });
      test('THEN: it tells the user that creation was successful.', async () => {
        expect(loggerSpy).toBeCalledWith(messages.SUCCESS_MESSAGE);
      });
      test('THEN: it creates a folder for the new microservice', async () => {
        expect(fs.mkdirSync).toBeCalledWith(mockUserResponses.nameOfNewService);
      });
      test('THEN: it creates a Controller for the new microservice', async () => {
        const filePath = path.join(process.cwd(), mockUserResponses.nameOfNewService);
        const completeFilePath = `${filePath}/Controller.js`;

        expect(fs.writeFileSync).toBeCalledWith(completeFilePath, 'moist!');
      });
    });
  });
});
