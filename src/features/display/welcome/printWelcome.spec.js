import { derived } from "../../../common/displayMethods.js";
import { describe, expect, it, vi } from "vitest";
import { printWelcome } from "./printWelcome.js";

vi.mock('../../../common/displayMethods.js', ()=>({
  derived: {
    logCyanBox: vi.fn(),
    logYellowInverse: vi.fn(),
  },
}));

describe('printWelcome()', ()=>{
  describe('WHEN: The function is invoked,', ()=>{
    it('THEN: It displays the description and version.', ()=>{
      printWelcome();

      expect(derived.logYellowInverse).toBeCalledTimes(1);
    });
    it('AND: It prints the author bio.', ()=>{
      printWelcome();

      expect(derived.logCyanBox).toBeCalledTimes(2);
    });
  });
});
