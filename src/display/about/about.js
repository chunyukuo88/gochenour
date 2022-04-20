import ora from "ora";
import { printWelcome } from "../welcome/printWelcome.js";
import { derived } from "../../common/displayMethods.js";

const spinner = ora();

export async function printAboutText() {
  printWelcome();
}
