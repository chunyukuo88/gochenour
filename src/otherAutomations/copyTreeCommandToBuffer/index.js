import { derived } from '../../common/displayMethods.js';
import clipboard from 'clipboardy';

export const copyTreeCommandToBuffer = () => {
  clipboard.writeSync(expectedBufferContent);
  derived.logGreenBox(expectedBufferContent); 
};

export const expectedBufferContent = '\n The following has been copied to your clipboard buffer: \n\n   tree -I "node_modules|coverage|.serverless|dist"\n\nPress COMMAND+V to paste it into the terminal.\n';
