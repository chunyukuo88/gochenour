import { derived } from '../../common/displayMethods.js';
import clipboard from 'clipboardy';

export const copyTreeCommandToBuffer = () => {
  clipboard.writeSync(treeCommand);
  derived.logGreenBox(expectedBufferContent); 
};

export const treeCommand = 'tree -I "node_modules|coverage|.serverless|dist"';

export const expectedBufferContent = `\n The following has been copied to your clipboard buffer: \n\n   ${treeCommand}\n\nPress COMMAND+V to paste it into the terminal.\n`;

