import { convertSingleFile } from './convertSingleFile.js';
import path from 'path';
import fs from 'fs';

export const convertPixelsInAllFiles = (dir = process.cwd(), entityList = []) => {
  let entities = fs.readdirSync(dir);
  entities.forEach(entity => {
    if (entitiesToBeIgnored.includes(entity)) return;
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

function entityIsADirectory(dir, entity){
  const isADirectory = fs.statSync(path.join(dir, entity)).isDirectory();
  return isADirectory;
}

const entitiesToBeIgnored = [
  '.git',
  '.gitignore',
  '.husky',
  '.idea',
  'coverage',
  'LICENSE',
  'node_modules',
  'package-lock.json',
  'package.json',
  'README.md',
  'References.md',
  'vitest.config.ts',
];