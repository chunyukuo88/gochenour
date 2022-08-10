import { convertSingleFile } from './convertSingleFile.js';
import path from 'path';
import fs from 'fs';

const { readdirSync, statSync } = fs;

export const convertAllFiles = (dir = process.cwd(), entityList = []) => {
  let entities = readdirSync(dir);
  entities.forEach(entity => {
    if (entitiesToBeIgnored.includes(entity)) return;
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

const entitiesToBeIgnored = [
  '.git',
  '.gitignore',
  '.husky',
  '.idea',
  'LICENSE',
  'README.md',
  'References.md',
  'coverage',
  'node_modules',
  'package-lock.json',
  'package.json',
  'vitest.config.ts',
];