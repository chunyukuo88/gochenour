import { describe, test, expect, vi } from 'vitest';
import { getNodeCompatibility, buildFailureMsg } from './index.js';

describe('getNodeCompatibility()', ()=>{
  describe('GIVEN: The minimum Node version', ()=>{
    describe('WHEN: The user\'s version is below the minimum required version,', ()=>{
      const currentNodeVersion = '1.1.1';
      test('THEN: It returns false;', ()=>{
        const result = getNodeCompatibility(currentNodeVersion);

        expect(result).toEqual(false);
      });
      test('AND: that error message is printed to the console.', ()=>{
        const spy = vi.spyOn(console, 'error');
        const currentNodeVersion = '1.2.3';
        const minimumNodeVersion = 16;
        const expectedFailureMsg = buildFailureMsg('1', minimumNodeVersion);

        getNodeCompatibility(currentNodeVersion);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expectedFailureMsg);
      });
    });
    describe('WHEN: The user\'s version is NOT below the minimum', ()=>{
      test('THEN: It returns true, (and the app carries on with the next task).', ()=>{
        const currentNodeVersion = '100.0.0';

        const result = getNodeCompatibility(currentNodeVersion);

        expect(result).toEqual(true);
      });
    });
  });
});
