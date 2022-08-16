import { describe, expect, test, vi } from 'vitest';
import { convertPixelsInAllFiles } from './index.js';
import { convertSingleFile } from './convertSingleFile.js';

vi.mock('./convertSingleFile.js');

describe('convertPixelsInAllFiles()', () => {
  describe('GIVEN: The function is invoked,', () => {
    describe('WHEN: The current directory contains CSS files,', () => {
      test('THEN: The pixels-to-REM conversion function is applied to each CSS file.', () => {
        convertSingleFile.mockImplementation(vi.fn());

        const dir = '__test__';

        convertPixelsInAllFiles(dir);

        expect(convertSingleFile).toHaveBeenCalledTimes(2);
        vi.clearAllMocks();
      });
    });
  });
});
