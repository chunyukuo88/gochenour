import fs from 'fs';
import { convertSingleLine } from './convertSingleLine.js';

const testFile = './toHavePixelsConverted.css';

export const convertSingleFile = (filePath = testFile) => {
  let asArrayOfLines = fs.readFileSync(filePath, 'utf-8').split('\n');
  const updatedArrayOfLines = convertEachLine(asArrayOfLines);
  fs.writeFileSync(filePath, updatedArrayOfLines.join('\n'));
};

const convertEachLine = (arrayOfLines) => {
  return arrayOfLines.map(lineOfCode => {
    const pixelsConvertedToRem = convertSingleLine(lineOfCode);
    return pixelsConvertedToRem;
  });
};