import { afterEach, describe, expect, test, vi } from "vitest";
import { printWelcome } from "../welcome/printWelcome.js";
import { derived } from "../../common/displayMethods.js";
import { printAboutText } from "./about.js";

vi.mock("../welcome/printWelcome.js");
vi.mock("../../common/displayMethods.js", () => ({
  derived: {
    logYellow: vi.fn(),
  },
}));

afterEach(() => vi.clearAllMocks());

describe("about.js", () => {
  describe("printAboutText()", () => {
    test("First it prints a welcome message.", async () => {
      printWelcome.mockImplementationOnce(vi.fn());

      await printAboutText();

      expect(printWelcome).toBeCalled();
    });
  });
});
