import fs from 'fs';
import { removeAllDebug } from './removeDebug/removeDebug.js';
import { removeMethods } from "./removeMethods/removeMethods.js";

const testFile = 'src/testingSuite/editAllLinesInFile/__test__.js';
export async function removeDebugFromGivenFile(givenFile = testFile) {
  try {
    removeDebugsAndUpdateFile(givenFile);
    displayMemoryUsed();
  } catch (err) {
    console.error(err);
  }
}

const removeDebugsAndUpdateFile = (givenFile) => {
  let fileDataArray = fs.readFileSync(givenFile, 'utf8').split('\n');
  const updatedArrayOfLines = buildUpdatedArrayOfLines(fileDataArray);
  fs.writeFileSync(givenFile, updatedArrayOfLines.join('\n'));
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
  const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(memoryUsed * 100) / 100} MB`);
};

removeDebugFromGivenFile();