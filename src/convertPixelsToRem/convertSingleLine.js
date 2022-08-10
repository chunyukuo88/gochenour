export const convertSingleLine = (lineOfCode) => {
  if (doesNotNeedEvaluation(lineOfCode)) return lineOfCode;
  const asArray = lineOfCode.split(' ');
  const joined = asArray
    .map(lexicalUnit => {
      return (lexicalUnit.includes('px'))
        ? convertLexicalUnit(lexicalUnit)
        : lexicalUnit;
    })
    .join(' ');
  return accountForSemicolon(joined);
};

const accountForSemicolon = (lineOfCode) => {
  const lastTwoChars = lineOfCode.substring(lineOfCode.length - 2, lineOfCode.length);
  if (lastTwoChars === ';;') return lineOfCode.substring(0, lineOfCode.length - 1);
  const finalCharacter = lineOfCode.split('')[lineOfCode.length - 1];
  if (finalCharacter === ';') return lineOfCode;
  return `${lineOfCode};`;
};

const convertLexicalUnit = (lexicalUnit) => {
  const numberOnly = parseInt(lexicalUnit.split('px')[0]);
  return `${numberOnly/16}rem`;
};

const doesNotNeedEvaluation = (lineOfCode) => {
  if (!lineOfCode.includes(';')) return true;
  const nameOfRule = lineOfCode.trim().split(':')[0];
  return rulesThatDoNotRequireConversion.includes(nameOfRule);
};

const rulesThatDoNotRequireConversion = [
  'border',
  'border-width',
  'borderWidth',
  'box-shadow',
  'transform',
];
