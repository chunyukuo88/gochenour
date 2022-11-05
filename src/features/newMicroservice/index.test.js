import { createMicroservice, messages } from './index.js';
import * as utils from './utils.js';
import { derived } from '../../common/displayMethods.js';
import { describe, expect, test, vi } from 'vitest';
import fs from 'fs';

vi.mock('fs');

describe('GIVEN: The createMicroservice function is invoked,', () => {
  describe('WHEN: the user enters a name for the microservice,', () => {
    describe('AND: a microservice of that name already exists,', () => {
      test('THEN: the program notifies the user and stops.', async () => {
        const mockUserResponses = {
          nameOfNewService: 'index.js',
        };
        vi.spyOn(utils, 'getUserResponses').mockImplementationOnce(() => mockUserResponses);
        fs.readdirSync.mockImplementationOnce(() => ['index.js']);
        const loggerSpy = vi.spyOn(derived, 'logRedBox');

        await createMicroservice();

        expect(loggerSpy).toBeCalledWith(messages.SERVICE_ALREADY_EXISTS);
      });
    });
  });
});
