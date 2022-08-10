import fs from 'fs';
import path from 'path';
import { convertSingleLine } from './convertSingleLine.js';

const testFilepath = '__test__';

export const convertSingleFile = (filePath = testFilepath, fileName) => {
  const joined = path.join(filePath, fileName);
  let asArrayOfLines = fs.readFileSync(joined, 'utf-8').split('\n');
  const updatedArrayOfLines = convertEachLine(asArrayOfLines);
  fs.writeFileSync(joined, updatedArrayOfLines.join('\n'));
};

const convertEachLine = (arrayOfLines) => {
  return arrayOfLines.map(lineOfCode => {
    const pixelsConvertedToRem = convertSingleLine(lineOfCode);
    return pixelsConvertedToRem;
  });
};
