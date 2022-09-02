import { derived } from "../../../common/displayMethods.js";
import { describe, expect, it, vi } from "vitest";
import { printHelpText } from "./help.js";

vi.mock("../../../common/displayMethods.js", () => ({
  derived: {
    logYellowBox: vi.fn(),
    underline: vi.fn(),
  },
}));

describe("printHelpText()", () => {
  it("This function prints a message with a yellow box and an underline.", () => {
    printHelpText();

    expect(derived.logYellowBox).toHaveBeenCalled();
    expect(derived.underline).toHaveBeenCalled();
  });
});
