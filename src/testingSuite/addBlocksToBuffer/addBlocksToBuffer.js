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
  noArgumentsFound: 'No arguments found. Try running this command again with the --help flag for more information.',
};

export function addBlocksToBuffer(){
  const userArgs = getAllUserArguments();
  console.log('userArgs: ', userArgs);
  try {
    if (!userArgs || userArgs === '--help') console.log(notifications.noArgumentsFound);
    copyAndLogBufferContent(blocks[userArgs], notifications[userArgs]);
  } catch(e) {
    console.error(e)
  }
}

function copyAndLogBufferContent(blockString, notificationString){
  clipboard.writeSync(blockString);
  console.log(notificationString);
}


addBlocksToBuffer();