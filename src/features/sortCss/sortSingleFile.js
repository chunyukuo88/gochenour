import path from 'path';
import fs from 'fs';

const testFilepath = '__test__';

export const sortSingleFile = (filePath = testFilepath, fileName) => {
  const joined = path.join(filePath, fileName);
  const asArrayOfLines = fs.readFileSync(joined, 'utf-8').split('\n');
  const alphabetized = sortEntireFile(asArrayOfLines);
  const result = alphabetized.join('\n');
  fs.writeFileSync(joined, result);
};

const sortEntireFile = (fileAsArrayofLines) => {
  const copy = [...fileAsArrayofLines];
  const ruleSets = [];
  let ruleSetsIndex = 0;
  while (copy.length > 0) {
    for (const line of fileAsArrayofLines) {
      const finalCharacter = line[line.length - 1];
      if (finalCharacter === '{') {
        const ruleSet = [];
        ruleSet.push(line);
        ruleSets.push(ruleSet);
      }
      if (line.trim() === '}') {
        ruleSets[ruleSetsIndex].push(line);
        ruleSetsIndex++;
      }
      if (finalCharacter !== '{') {
        ruleSets[ruleSetsIndex] && ruleSets[ruleSetsIndex].push(line);
      }
      copy.shift();
    }
  };
  const result = [];
  ruleSets.forEach((ruleSet) => {
    const firstLine = ruleSet[0];
    const middlePart = ruleSet.slice(1, ruleSet.length);
    const indentsUnified = ensureUnifiedIntends(middlePart);
    result.push(firstLine, indentsUnified.sort());
  });
  return result.flat();
};

const ensureUnifiedIntends = (middlePart) => middlePart.map((line) => (line.trim() === '}') ? line : `  ${line.trim()}`);
