import path from 'path';
import fs from 'fs';
import {cleanSingleTestSuite} from '../cleanSingleSuite/index.js';
import { derived } from '../../common/displayMethods.js';

const { readdirSync, statSync } = fs;
const { logCyanBox } = derived;

export function cleanAllTestSuites(dir = process.cwd(), entityList = []){
  let entities = readdirSync(dir);

  entities.forEach(entity => {
    if (entityIsADirectory(dir, entity)) {
      const extendedPath = path.join(dir, entity);
      entityList = cleanAllTestSuites(extendedPath, entityList);
    }
    else {
      if(entityIsATestSuite(entity)) {
        cleanSingleTestSuite(path.join(dir, entity));
        entityList.push(entity);
      }
    }
  });

  displayExaminedSuites(entityList);
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

function entityIsATestSuite(entity){
  const testSuitePattern = /\.spec\.js/;
  return testSuitePattern.test(entity);
}