import { derived } from '../../common/displayMethods.js';
import clipboard from 'clipboardy';

export const gitCommand = 'git branch | grep -v "main" | xargs git branch -D';

export const successMsg = ` The following has been copied to your clipboard:

                ${gitCommand}

 Executing this command will delete all git branches on your computer's hard drive except the "main" branch. `;


export const performGitBranchTreeShaking = () => {
  console.log('performGitBranchTreeShaking() - gitCommand: ', gitCommand);
  clipboard.writeSync(gitCommand);
  console.log('performGitBranchTreeShaking() - successMsg: ', successMsg);
  derived.logGreenBox(successMsg);
  console.log('performGitBranchTreeShaking() - DONE');
};

