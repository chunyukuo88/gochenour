import { afterEach, describe, expect, test, vi } from 'vitest';
import { convertPixelsInAllFiles } from '../index.js';
import { convertSingleFile } from '../convertSingleFile.js';

vi.mock('../convertSingleFile.js');

afterEach(() => vi.clearAllMocks());

describe('convertPixelsInAllFiles()', () => {
  describe('GIVEN: The function is invoked,', () => {
    describe('WHEN: The current directory and all subdirectories contain a total of two CSS files,', () => {
      test('THEN: The pixels-to-REM conversion function is applied to both CSS file.', () => {
        convertSingleFile.mockImplementation(vi.fn());

        const dir = '__test__';

        convertPixelsInAllFiles(dir);

        expect(convertSingleFile).toHaveBeenCalledTimes(2);
      });
    });
  });
});
