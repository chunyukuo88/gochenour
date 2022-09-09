import { convertSingleFile } from './convertSingleFile.js';
import {
  entityIsADirectory,
  entityShouldBeIgnored,
} from '../../common/utils.js';
import path from 'path';
import fs from 'fs';

export const convertPixelsInAllFiles = (dir = process.cwd(), entityList = []) => {
  let entities = fs.readdirSync(dir);
  entities.forEach(entity => {
    if (entityShouldBeIgnored(entity)) return;
    recursivelyEvaluateEntity(entity, dir, entityList);
  });
};

function recursivelyEvaluateEntity(entity, dir, entityList){
  (entityIsADirectory(dir, entity))
    ? convertAllCssFilesInDirectory(entity, dir, entityList)
    : convertSingleFile(dir, entity);
}

function convertAllCssFilesInDirectory(entity, dir, entityList) {
  const extendedPath = path.join(dir, entity);
  convertPixelsInAllFiles(extendedPath, entityList);
}
