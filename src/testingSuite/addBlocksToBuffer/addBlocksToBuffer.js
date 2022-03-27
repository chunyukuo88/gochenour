import 'dotenv/config';
import clipboard from 'clipboardy';
import { getAllUserArguments } from './getUserArgs.js'
import { derived } from '../../common/displayMethods.js';
import { buildCustomBlock } from './utils.js';

const { logRedBox, logCyanBox, logGreenBox } = derived;

export const presetBlocks = {
  ddd: "describe('', ()=>{\n  describe('', ()=>{\n    describe('', ()=>{\n      //\n    });\n  });\n});",
  ddt: "describe('GIVEN: ', ()=>{\n  describe('WHEN: ', ()=>{\n    test('THEN: ', ()=>{\n      //\n    });\n  });\n});"
};

export const notifications = {
  customBlockHasBeenCopied: 'The following custom block has been copied to your clipboard:\n',
  ddd: `The following has been copied to your clipboard: \n\n${presetBlocks.ddd}\n\n`,
  ddt: `The following has been copied to your clipboard: \n\n${presetBlocks.ddt}\n\n`,
  failureCustom: ' FAILED TO COPY CUSTOM BLOCK: ',
  failurePreset: ' FAILED TO COPY PRESET BLOCK: ',
  help: `
  
  COMMAND:
  $ gochenour test \<flag\>     |       $ goch t \<flag\>
  
  SYNOPSIS:
  The \`test\` command is used in conjunction with one of the two preset flags \`ddd\` and \`ddt\` to copy blocks of unit testing boilerplate to your computer's clipboard. Use this whenever you need to write one or more unit tests. 
  This feature is especially useful for those who employ Gherkin syntax in their unit tests.
  
  FLAGS:
  Running \`gochenour test\` with the \`ddd\` flags produces a single \`describe\` block with two \`describe\` blocks nested within it.
  Running \`gochenour test\` with the \`ddt\` produces a single \`describe\` block one \`describe\` blocks nested within it and a \`test\` block nested within that.
  
  EXAMPLES:
    Full commands:              Command shorthands
  $ gochenour test ddd        $ goch t ddd
  $ gochenour test ddt        $ goch t ddt
  
  `,
  noArgumentsFound: `\n Invalid argument or no arguments found.\n Try running this command again with the --help flag for more information. `,
};

const includesHelpFlag = (userArgsArray) => userArgsArray[0] === '--help' || userArgsArray[0] === '-h';

const includesNumbers = (userArgsArray) => {
  const testBlockWithNumbers = /[1-9]/;
  return testBlockWithNumbers.test(userArgsArray[0]);
};

function copyAndLogBufferContent(blockString, notificationString){
  clipboard.writeSync(blockString);
  logGreenBox(notificationString);
}

function buildErrorMessageCustom(e){
  return `${notifications.failureCustom}${e}${notifications.noArgumentsFound}`;
}

function buildErrorMessagePreset(e){
  return `${notifications.failurePreset}${e}${notifications.noArgumentsFound}`;
}

function copyWithCustomBlock(userArgsArray, notificationStub){
  try {
    const commandName = userArgsArray[0];
    const customBlock = buildCustomBlock(commandName);
    const msg = notificationStub + customBlock;
    return copyAndLogBufferContent(customBlock, msg);
  } catch(e) {
    const errorMessage = buildErrorMessageCustom(e);
    return logRedBox(errorMessage);
  }
}

function copyWithPresetBlock(userArgsArray){
  try {
    const commandName = userArgsArray[0];
    return copyAndLogBufferContent(presetBlocks[commandName], notifications[commandName]);
  } catch(e) {
    const errorMessage = buildErrorMessagePreset(e);
    return logRedBox(errorMessage);
  }
}

export function addBlocksToBuffer(){
  const userArgsArray = getAllUserArguments();
  if (!userArgsArray) return logRedBox(notifications.noArgumentsFound);
  if (includesHelpFlag(userArgsArray)) return logCyanBox(notifications.help);
  return (includesNumbers(userArgsArray))
    ? copyWithCustomBlock(userArgsArray, notifications.customBlockHasBeenCopied)
    : copyWithPresetBlock(userArgsArray);
}

addBlocksToBuffer();