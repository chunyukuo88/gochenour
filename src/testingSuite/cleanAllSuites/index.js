import path from 'path';
import fs from 'fs';
import { cleanSingleTestSuite } from '../cleanSingleSuite/index.js';
import { derived } from '../../common/displayMethods.js';

const { readdirSync, statSync } = fs;
const { logCyanBox } = derived;

export function cleanAllTestSuites(dir = process.cwd(), entityList = []){
  let entities = readdirSync(dir);
  entities.forEach(entity => recursivelyEvaluateEntity(entity, dir, entityList));
  displayExaminedSuites(entityList);
  return entityList;
}

function recursivelyEvaluateEntity(entity, dir, entityList){
  (entityIsADirectory(dir, entity))
    ? cleanAllSuitesInDirectory(entity, dir, entityList)
    : cleanSuite(entity, dir, entityList)
}

function cleanSuite(entity, dir, entityList){
  if(entityIsATestSuite(entity)) {
    cleanSingleTestSuite(path.join(dir, entity));
    entityList.push(entity);
  }
}

function cleanAllSuitesInDirectory(entity, dir, entityList){
  const extendedPath = path.join(dir, entity);
  cleanAllTestSuites(extendedPath, entityList);
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
  const testSuitePattern = /\.(test|spec)\.js/;
  return testSuitePattern.test(entity);
}