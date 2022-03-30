import path from 'path';
import fs from 'fs';
import { cleanSingleTestSuite } from '../cleanSingleSuite/index.js';
import { derived } from '../../common/displayMethods.js';

const { readdirSync, statSync } = fs;
const { logCyanBox } = derived;

export function cleanAllTestSuites(dir = process.cwd(), fileList = []){
  let files = readdirSync(dir);

  files.forEach(file => {
    if (statSync(path.join(dir, file)).isDirectory()) {
      fileList = cleanAllTestSuites(path.join(dir, file), fileList);
    }
    else {
      if(theFileIsATestSuite(file)) {
        fileList.push(file);
        return cleanSingleTestSuite(file);
      }
    }
  });

  displayExaminedSuites(fileList);
}

function displayExaminedSuites(arrayOfTestSuites){
  let examinedSuites = '';
  arrayOfTestSuites.forEach(suite => examinedSuites += `\n    ${suite}`);
  logCyanBox(`
  The following test suites were checked for extraneous test block methods and render methods:  
    ${examinedSuites}.
  `);
}

function theFileIsATestSuite(file){
  const testSuitePattern = /\.spec\.js/;
  return testSuitePattern.test(file);
}

// const displayMemoryUsed = () => {
//   const memoryUsed = getMemoryUsage().heapUsed / 1024 / 1024;
//   console.log(`The script uses approximately ${Math.round(memoryUsed * 100) / 100} MB`);
// };

cleanAllTestSuites();