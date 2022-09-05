import fs from 'fs';
import path from 'path';
import { sortSingleFile } from './sortSingleFile.js';
import { derived } from '../../common/displayMethods.js';

export const alphabetizeCssInAllFiles = (dir = process.cwd(), entityList = []) => {
  let entities = fs.readdirSync(dir);
  let filesProcessed = [];
  entities.forEach(entity => {
    if (entityShouldBeIgnored(entity)) return;
    recursivelyEvaluateEntity(entity, dir, entityList);
    filesProcessed.push(entity);
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

function entityIsADirectory(dir, entity){
  return fs.statSync(path.join(dir, entity)).isDirectory();
}

const entityShouldBeIgnored = (entity) => (isNonCssFile(entity) || entitiesToBeIgnored.includes(entity));

const isNonCssFile = (entity) => (entity.includes('.') && !isACssFile(entity));

function isACssFile(entity){
  const asArray = entity.split('.');
  const fileExtension = asArray[asArray.length - 1];
  return fileExtension === 'css';
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
