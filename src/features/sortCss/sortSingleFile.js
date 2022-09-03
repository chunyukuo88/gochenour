import path from 'path';
import fs from 'fs';

const testFilepath = '__test__';

export const sortSingleFile = (filePath = testFilepath, fileName) => {
  const joined = path.join(filePath, fileName);
  const asArrayOfLines = fs.readFileSync(joined, 'utf-8').split('\n');
  const alphabetized = sortEntireFile(asArrayOfLines);
  const result = alphabetized.join('');
  fs.writeFileSync(joined, result);
};

const sortEntireFile = (fileAsArrayofLines) => {
  const finalRuleIndex = fileAsArrayofLines.length - 1;
  const partInsideBraces = fileAsArrayofLines.slice(1, finalRuleIndex);
  const sorted = partInsideBraces.sort().join('\n');
  return [...fileAsArrayofLines[0] + '\n', sorted + '\n', fileAsArrayofLines[fileAsArrayofLines.length - 1]];
};