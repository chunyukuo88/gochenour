import 'dotenv/config';
import clipboard from 'clipboardy';
import { getAllUserArguments } from './getUserArgs.js'

export const blocks = {
  ddd: "describe('', ()=>{\n  describe('', ()=>{\n    describe('', ()=>{\n      //\n    });\n  });\n});",
  ddt: "describe('GIVEN: ', ()=>{\n  describe('WHEN: ', ()=>{\n    test('THEN: ', ()=>{\n      //\n    });\n  });\n});"
};

export const notifications = {
  ddd: `The following has been copied to your clipboard: \n\n${blocks.ddd}\n\n`,
  ddt: `The following has been copied to your clipboard: \n\n${blocks.ddt}\n\n`,
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
  noArgumentsFound: 'No arguments found. Try running this command again with the --help flag for more information.',
};

export function addBlocksToBuffer(){
  const userArgsArray = getAllUserArguments();
  if (!userArgsArray) {
    console.log(notifications.noArgumentsFound);
    return;
  }
  if (userArgsArray[0] === '--help' || userArgsArray[0] === '-h') {
    console.log(notifications.help);
    return;
  }
  try {
    const commandName = userArgsArray[0];
    copyAndLogBufferContent(blocks[commandName], notifications[commandName]);
  } catch(e) {
    console.error(`ERROR: ${e}`)
  }
}

function copyAndLogBufferContent(blockString, notificationString){
  clipboard.writeSync(blockString);
  console.log(notificationString);
}


addBlocksToBuffer();