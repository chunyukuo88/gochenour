import { cleanAllTestSuites } from './index.js';
import { cleanSingleTestSuite } from '../cleanSingleSuite/index.js';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('../cleanSingleSuite/index.js');

describe('GIVEN: The function is invoked,', ()=>{
  describe('WHEN: This directory (the one that contains this test module) contains test files', ()=>{
    test('THEN: The removal function is applied to this test module.', ()=>{
      cleanSingleTestSuite.mockImplementationOnce(vi.fn());

      cleanAllTestSuites();

      expect(cleanSingleTestSuite).toHaveBeenCalled();
      vi.clearAllMocks();
    });
  });
});
