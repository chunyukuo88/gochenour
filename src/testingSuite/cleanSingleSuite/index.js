import fs from 'fs';
import { removeAllDebug } from './removeDebug/index.js';
import { removeMethods } from './removeMethods/index.js';

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

const buildUpdatedArrayOfLines = (fileDataArray) => {
  const updatedArrayOfLines = [];
  fileDataArray.forEach(lineOfCode => {
    const debugRemoved = removeAllDebug(lineOfCode);
    const methodsRemoved = removeMethods(debugRemoved);
    updatedArrayOfLines.push(methodsRemoved);
  });
  return updatedArrayOfLines;
};

cleanSingleTestSuite();