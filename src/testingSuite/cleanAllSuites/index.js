import path from 'path';
import fs from 'fs';
import { getMemoryUsage } from '../../nodeUtils/getProcessData.js';
import { cleanSingleTestSuite } from '../cleanSingleSuite/index.js';
import { derived } from '../../common/displayMethods.js';

const { readdirSync, statSync } = fs;
const { logCyanBox } = derived;

export function cleanAllTestSuites(dir = process.cwd(), entityList = []){
  let entities = readdirSync(dir);

  entities.forEach(entity => {
    if (entityIsADirectory(dir, entity)) {
      entityList = cleanAllTestSuites(path.join(dir, entity), entityList);
    }
    else {
      if(theFileIsATestSuite(entity)) {
        entityList.push(entity);
        cleanSingleTestSuite(entity);
        console.log('entity: ', entity);
      }
    }
  });

  displayExaminedSuites(entityList);
  // displayMemoryUsed();
  return entityList;
}

function entityIsADirectory(dir, entity){
  return statSync(path.join(dir, entity)).isDirectory();
}

function displayExaminedSuites(arrayOfTestSuites){
  let examinedSuites = '';
  arrayOfTestSuites.forEach(suite => examinedSuites += `\n    ${suite}`);
  logCyanBox(`
  The following test suites were checked for extraneous test block methods and render methods:  
    ${examinedSuites}.
  `);
}

function theFileIsATestSuite(entity){
  const testSuitePattern = /\.spec\.js/;
  return testSuitePattern.test(entity);
}

const displayMemoryUsed = () => {
  const memoryUsed = getMemoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(memoryUsed * 100) / 100} MB`);
};

cleanAllTestSuites();