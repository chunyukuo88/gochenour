import { printAboutText } from './about.mjs';
import { printHelpText } from './help.mjs';
import boxen from "boxen";

export async function evaluateArgs(argsArray){
  const validPair = getFirstValidFlagFunctionPair(argsArray);
  if (!validPair) return printNoArgsFound();
  const correspondingFunction = validPair[1];
  await correspondingFunction();
}

function getFirstValidFlagFunctionPair(argsArray){
  const userArgsOnly = argsArray.slice(2);
  const flagFunctionPairs = Object.values(flagsAndAliases);
  return getFirstValidPair(userArgsOnly, flagFunctionPairs);
}

function getFirstValidPair(userArgsOnly, flagFunctionPairs){
  for (let i = 0; i < flagFunctionPairs.length; i++){
    if (flagFunctionPairs[i][0] === userArgsOnly[0]) return flagFunctionPairs[i];
  }
}

function printNoArgsFound(){
  const availableFlags = Object.values(flagsAndAliases).map(pair => ('\n      '+pair[0]));
  console.log(boxen(`
    No flags or inputs detected. 
    Try running this CLI with the --help flag for detailed information or try one of the following valid flags and aliases:  \n${availableFlags}
  `));
}

const flagsAndAliases = {
  ABOUT: ['--about', printAboutText],
  ABOUT_ALIAS: ['-a', printAboutText],
  HELP: ['--help', printHelpText],
  HELP_ALIAS: ['-h', printHelpText],
};
