import { convertSingleFile } from './convertSingleFile.js';
import path from 'path';
import fs from 'fs';

export const convertPixelsInAllFiles = (dir = process.cwd(), entityList = []) => {
  let entities = fs.readdirSync(dir);
  entities.forEach(entity => {
    if (entityShouldBeIgnored(entity)) return;
    recursivelyEvaluateEntity(entity, dir, entityList);
  });
};

const entityShouldBeIgnored = (entity) => (entitiesToBeIgnored.includes(entity) || isNonCssFile(entity));

const isNonCssFile = (entity) => (entity.includes('.') && !isACssFile(entity));

function isACssFile(entity){
  const asArray = entity.split('.');
  const fileExtension = asArray[asArray.length - 1];
  return fileExtension === 'css';
}

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
  return fs.statSync(path.join(dir, entity)).isDirectory();
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
