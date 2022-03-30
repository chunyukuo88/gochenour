import fs from 'fs';
import { getHeapUsed } from '../../nodeUtils/getProcessData.js';
import { removeAllDebug } from './removeDebug/removeDebug.js';
import { removeMethods } from "./removeMethods/removeMethods.js";

const testFile = './__test__.js';

export async function removeDebugFromGivenFile(filePath = testFile) {
  try {
    removeDebugsAndUpdateFile(filePath);
    displayMemoryUsed();
  } catch (err) {
    console.error(err);
  }
}

const removeDebugsAndUpdateFile = (filePath) => {
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

const displayMemoryUsed = () => {
  const memoryUsed = getHeapUsed().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(memoryUsed * 100) / 100} MB`);
};

removeDebugFromGivenFile();