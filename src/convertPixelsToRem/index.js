import { convertSingleFile } from './convertSingleFile.js';
import path from 'path';
import fs from 'fs';

export const convertAllFiles = (dir = process.cwd(), entityList = []) => {
  let entities = fs.readdirSync(dir);
  entities.forEach(entity => {
    recursivelyEvaluateEntity(entity, dir, entityList);
  });
};

function recursivelyEvaluateEntity(entity, dir, entityList){
  (entityIsADirectory(dir, entity))
    ? convertAllCssFilesInDirectory(entity, dir, entityList)
    : convertSingleFile(entity);
}

function convertAllCssFilesInDirectory(entity, dir, entityList) {
  const extendedPath = path.join(dir, entity);
  convertAllFiles(extendedPath, entityList);
}

function entityIsADirectory(dir, entity){
  return statSync(path.join(dir, entity)).isDirectory();
}