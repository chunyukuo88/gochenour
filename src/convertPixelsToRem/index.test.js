import { describe, expect, test, vi } from 'vitest';
import { convertAllFiles } from './index.js';
import { convertSingleFile } from './convertSingleFile.js';

vi.mock('./convertSingleFile.js');

describe('convertAllFiles()', () => {
  describe('GIVEN: The function is invoked,', () => {
    describe('WHEN: The current directory contains CSS files,', () => {
      test('THEN: The pixels-to-REM conversion function is applied to each CSS file.', () => {
        convertSingleFile.mockImplementation(vi.fn());

        convertAllFiles();

        expect(convertSingleFile).toHaveBeenCalled();
        vi.clearAllMocks();
      });
    });
  });
});
