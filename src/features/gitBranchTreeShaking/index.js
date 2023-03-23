import clipboard from 'clipboardy';
import { derived } from '../../common/displayMethods.js';

export const gitCommand = 'git branch | grep -v "main" | xargs git branch -D';

export const successMsg = ` The following has been copied to your clipboard:

                ${gitCommand}

 Executing this command will delete all git branches on your computer's hard drive except the "main" branch. `;

export function performGitBranchTreeShaking(){
  clipboard.writeSync(gitCommand);
  derived.logGreenBox(successMsg);
}
