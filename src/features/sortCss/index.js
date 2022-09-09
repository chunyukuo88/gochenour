import fs from 'fs';
import path from 'path';
import { sortSingleFile } from './sortSingleFile.js';
import { derived } from '../../common/displayMethods.js';
import {
  entityIsADirectory,
  entityShouldBeIgnored,
  isACssFile,
} from '../../common/utils.js';

export const alphabetizeCssInAllFiles = (dir = process.cwd(), entityList = []) => {
  let entities = fs.readdirSync(dir);
  let filesProcessed = [];
  entities.forEach(entity => {
    if (entityShouldBeIgnored(entity)) return;
    recursivelyEvaluateEntity(entity, dir, entityList);
    isACssFile(entity) && filesProcessed.push(entity);
  });
  filesProcessed.forEach(entity => derived.logYellowInverse(`Sorting completed for file: ${entity}`));
};

function recursivelyEvaluateEntity(entity, dir, entityList){
  (entityIsADirectory(dir, entity))
    ? sortAllCssFilesInDirectory(entity, dir, entityList)
    : sortSingleFile(dir, entity);
}

function sortAllCssFilesInDirectory(entity, dir, entityList) {
  const extendedPath = path.join(dir, entity);
  alphabetizeCssInAllFiles(extendedPath, entityList);
}
