import fs from 'fs';
import { buildUpdatedArrayOfLines } from './utils.js';

const testFile = './allCleanables.spec.js';

export async function cleanSingleTestSuite(filePath = testFile) {
  try {
    cleanAndUpdate(filePath);
  } catch (err) {
    console.error(err);
  }
}

const cleanAndUpdate = (filePath) => {
  let fileDataArray = fs.readFileSync(filePath, 'utf8').split('\n');
  const updatedArrayOfLines = buildUpdatedArrayOfLines(fileDataArray);
  fs.writeFileSync(filePath, updatedArrayOfLines.join('\n'));
};