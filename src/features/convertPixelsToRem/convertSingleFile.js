import fs from 'fs';
import path from 'path';
import { convertSingleLine } from './convertSingleLine.js';
import { derived } from '../../common/displayMethods.js';

const testFilepath = '__test__';

export const convertSingleFile = (filePath = testFilepath, fileName) => {
  const joined = path.join(filePath, fileName);
  let asArrayOfLines = fs.readFileSync(joined, 'utf-8').split('\n');
  const updatedArrayOfLines = convertEachLine(asArrayOfLines);
  if (asArrayOfLines.join('\n') !== updatedArrayOfLines.join('\n'))
    derived.logYellowInverse(`Pixel-to-rem conversion has been performed on file: ${joined}`);
  const result = updatedArrayOfLines.join('\n');
  fs.writeFileSync(joined, result);
};

const convertEachLine = (arrayOfLines) => {
  return arrayOfLines.map(lineOfCode => {
    return convertSingleLine(lineOfCode);
  });
};
