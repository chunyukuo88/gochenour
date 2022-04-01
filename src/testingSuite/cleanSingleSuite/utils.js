import { removeAllDebug } from './removeDebug/index.js';
import { removeMethods } from './removeMethods/index.js';

export const buildUpdatedArrayOfLines = (fileDataArray) => {
  const updatedArrayOfLines = [];
  fileDataArray.forEach(lineOfCode => {
    const debugRemoved = removeAllDebug(lineOfCode);
    const methodsRemoved = removeMethods(debugRemoved);
    updatedArrayOfLines.push(methodsRemoved);
  });
  return updatedArrayOfLines;
};