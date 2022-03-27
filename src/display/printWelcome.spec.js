import { printWelcome } from './printWelcome.js';
import { derived } from '../common/displayMethods.js';
import { describe, expect, test, vi} from "vitest";

vi.mock('../common/displayMethods.js', ()=>({
  derived: {
    logCyanBox: vi.fn(),
    logYellowInverse: vi.fn(),
  },
}));


describe('printWelcome()', ()=>{
  describe('WHEN: The function is invoked,', ()=>{
    test('THEN: It displays the description and version.', ()=>{
      printWelcome();

      expect(derived.logYellowInverse).toBeCalledTimes(1);
    });
    test('AND: It prints the author bio.', ()=>{
      printWelcome();

      expect(derived.logCyanBox).toBeCalledTimes(2);
    });
  });
});
