import { getNodeCompatibility, buildFailureMsg } from './nodeVersionCheck.mjs';

describe('getNodeCompatibility()', ()=>{
  describe('GIVEN: The minimum Node version', ()=>{
    describe('WHEN: The user\'s version is below the minimum required version,', ()=>{
      const currentNodeVersion = '1.1.1';
      it('THEN: It returns false;', ()=>{
        const result = getNodeCompatibility(currentNodeVersion);

        expect(result).toEqual(false);
      });
      it('AND: that error message is printed to the console.', ()=>{
        const spy = jest.spyOn(console, 'error');
        const currentNodeVersion = '1.2.3';
        const minimumNodeVersion = 16;
        const expectedFailureMsg = buildFailureMsg('1', minimumNodeVersion);

        getNodeCompatibility(currentNodeVersion);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expectedFailureMsg);
      });
    });
    describe('WHEN: The user\'s version is NOT below the minimum', ()=>{
      it('THEN: It returns false.', ()=>{
        const currentNodeVersion = '100.0.0';

        const result = getNodeCompatibility(currentNodeVersion);

        expect(result).toEqual(true);
      });
    });
  });
});

