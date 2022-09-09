import { getMemoryUsage } from '../nodeUtils/processFunctions.js';
import fs from "fs";
import path from "path";

export const displayMemoryUsed = () => {
  const heapUsed = getMemoryUsage() / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(heapUsed * 100) / 100} MB`);
};

export const entitiesToBeIgnored = [
  '.git',
  '.gitignore',
  '.husky',
  '.idea',
  'coverage',
  'Dockerfile',
  'LICENSE',
  'node_modules',
  'package-lock.json',
  'package.json',
  'README.md',
  'References.md',
  'vitest.config.ts',
];

export const isNonCssFile = (entity) => (entity.includes('.') && !isACssFile(entity));

export const isACssFile = (entity) => entity.slice(-4) === '.css';

export const entityIsADirectory = (dir, entity) => fs.statSync(path.join(dir, entity)).isDirectory();

export const entityShouldBeIgnored = (entity) => (isNonCssFile(entity) || entitiesToBeIgnored.includes(entity));
