import { describe, expect, test } from "vitest";
import { buildCustomBlock } from "./utils.js";

describe("buildCustomBlock()", () => {
  describe("GIVEN: The user enters a two-character flag", () => {
    describe("WHEN: The input is d1", () => {
      test("THEN: It returns a one-layer describe block.", () => {
        const customFlag = "d1";
        const expectedResult = "\ndescribe('', () => {\n  //\n});\n";

        const result = buildCustomBlock(customFlag);

        expect(result).toEqual(expectedResult);
      });
    });
    describe("WHEN: The input is d2", () => {
      test("THEN: It returns a two-layer describe block.", () => {
        const customFlag = "d2";
        const expectedResult =
          "\ndescribe('', () => {\n  describe('', () => {\n    //\n  });\n});\n";

        const result = buildCustomBlock(customFlag);

        expect(result).toEqual(expectedResult);
      });
    });
    describe("WHEN: The input is d5", () => {
      test("THEN: It returns a five-layer describe block.", () => {
        const customFlag = "d5";
        const expectedResult =
          "\ndescribe('', () => {\n  describe('', () => {\n    describe('', () => {\n      describe('', () => {\n        describe('', () => {\n          //\n        });\n      });\n    });\n  });\n});\n";

        const result = buildCustomBlock(customFlag);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
