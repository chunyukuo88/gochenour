import 'dotenv/config';
import clipboard from 'clipboardy';
import { getSingleUserArgument } from '../getUserArgs.js'

export const blocks = {
  describeBlocks3Layers: "describe('', ()=>{\n  describe('', ()=>{\n    describe('', ()=>{\n      //\n    });\n  });\n});",
  describeBlocks2Test: "describe('GIVEN: ', ()=>{\n  describe('WHEN: ', ()=>{\n    test('THEN: ', ()=>{\n      //\n    });\n  });\n});"
};

export const notifications = {
  ddd: `The following has been copied to your clipboard: \n\n${blocks.describeBlocks3Layers}\n\n`,
  ddt: `The following has been copied to your clipboard: \n\n${blocks.describeBlocks2Test}\n\n`
};

export function addBlocksToBuffer(){
  const userArg = getSingleUserArgument();
  if (userArg === 'ddd') {
    clipboard.writeSync(blocks.describeBlocks3Layers);
    console.log(notifications[userArg]);
  } else {
    clipboard.writeSync(blocks.describeBlocks2Test);
    console.log(notifications[userArg]);
  }
}

addBlocksToBuffer();