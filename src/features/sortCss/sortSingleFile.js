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
  const copy = [...fileAsArrayofLines];
  const rulesets = [];
  let ruleSetsIndex = 0;
  while (copy.length > 0) {
    for (const line of fileAsArrayofLines) {
      const finalCharacter = line[line.length - 1];
      if (finalCharacter === '{') {
        const ruleset = [];
        ruleset.push(line);
        rulesets.push(ruleset);
        copy.shift();
      }
      if (line.trim() === '}') {
        rulesets[ruleSetsIndex] && rulesets[ruleSetsIndex].push(line);
        ruleSetsIndex++;
        copy.shift();
        break;
      }
      if (finalCharacter !== '{') {
      rulesets[ruleSetsIndex] && rulesets[ruleSetsIndex].push(line);
      copy.shift();
    }
  }
    const firstRuleSet = rulesets[0];
    const finalRuleIndex = firstRuleSet.length - 1;
    const partInsideBraces = firstRuleSet.slice(1, finalRuleIndex);
    const sorted = partInsideBraces.sort().join('\n');
    return [...firstRuleSet[0] + '\n', sorted + '\n', firstRuleSet[firstRuleSet.length - 1]];
  };
};
