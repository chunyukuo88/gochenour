import { printAboutText } from '../../display/about/about.js';
import { printHelpText } from '../../display/help/help.js';
import { addBlocksToBuffer } from '../../testingSuite/addBlocksToBuffer/index.js';
import { derived } from '../../common/displayMethods.js';
import { cleanAllTestSuites } from '../../testingSuite/cleanAllSuites/index.js';

const { logBox } = derived;

export async function evaluateArgs(argsArray){
  const validPair = getFirstValidFlagFunctionPair(argsArray);
  if (!validPair) return printNoArgsFound();
  const correspondingFunction = validPair[1];
  await correspondingFunction();
}

function getFirstValidFlagFunctionPair(argsArray){
  if (!argsArray) return;
  const flagFunctionPairs = Object.values(flags);
  const firstValidPair = getFirstValidPair(argsArray, flagFunctionPairs);
  return firstValidPair;
}

function getFirstValidPair(userArgsOnly, flagFunctionPairs){
  for (let i = 0; i < flagFunctionPairs.length; i++){
    if (flagFunctionPairs[i][0] === userArgsOnly[0]) {
      return flagFunctionPairs[i];
      break;
    }
  }
}

function printNoArgsFound(){
  const availableFlags = Object.values(flags).map(pair => ('\n      '+pair[0]));
  logBox(`
    No flags or inputs detected.
    Try running this CLI with the --help flag for detailed information or try one of the following valid flags and aliases:  \n${availableFlags}
  `);
}

export const flags = {
  ABOUT: ['--about', printAboutText],
  ABOUT_ALIAS: ['-a', printAboutText],
  ADD_BLOCKS: ['test', addBlocksToBuffer ],
  ADD_BLOCKS_ALIAS: ['t', addBlocksToBuffer],
  CLEAN_TESTS: ['clean', cleanAllTestSuites],
  CLEAN_TESTS_ALIAS: ['ct', cleanAllTestSuites],
  HELP: ['--help', printHelpText],
  HELP_ALIAS: ['-h', printHelpText],
};
