import path from 'path';
import fs from 'fs';
import { cleanAllTestSuites } from './index.js';
import { cleanSingleTestSuite } from '../cleanSingleSuite/index.js';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('../cleanSingleSuite/index.js');

describe('GIVEN: The function is invoked,', ()=>{
  describe('WHEN: The directory does NOT contain test files', ()=>{
    test('THEN: The removal function is not applied to any of them.', ()=>{
      cleanSingleTestSuite.mockImplementationOnce(vi.fn());
      cleanAllTestSuites();

      expect(cleanSingleTestSuite).not.toHaveBeenCalled();
    });
  });
});