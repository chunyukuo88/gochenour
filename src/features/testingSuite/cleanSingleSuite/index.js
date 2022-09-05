import fs from 'fs';
import { processArrayOfLines } from './utils.js';

const testFile = './allCleanables.spec.js';

export function cleanSingleTestSuite(filePath = testFile) {
  try {
    cleanAndUpdate(filePath);
  } catch (err) {
    console.error(err);
  }
}

const cleanAndUpdate = (filePath) => {
  let fileDataArray = fs.readFileSync(filePath, 'utf8').split('\n');
  const updatedArrayOfLines = processArrayOfLines(fileDataArray);
  fs.writeFileSync(filePath, updatedArrayOfLines.join('\n'));
};
