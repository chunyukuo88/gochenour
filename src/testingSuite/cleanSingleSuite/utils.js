import { removeAllDebug } from './removeDebug/index.js';
import { removeMethods } from './removeMethods/index.js';
import { removeComments } from './removeComments/index.js';

export const processArrayOfLines = (fileDataArray) => {
  const updatedArrayOfLines = [];
  fileDataArray.forEach(lineOfCode => {
    const debugRemoved = removeAllDebug(lineOfCode);
    const methodsRemoved = removeMethods(debugRemoved);
    const contentsRemoved = removeComments(methodsRemoved);
    updatedArrayOfLines.push(contentsRemoved);
  });
  return updatedArrayOfLines;
};
