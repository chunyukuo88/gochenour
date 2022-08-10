export const convertSingleLine = (lineOfCode) => {
  if (doesNotNeedConversion(lineOfCode)) return lineOfCode;
  const asArray = lineOfCode.split(' ');
  return asArray
    .map(lexicalUnit => {
      return (lexicalUnit.includes('px'))
        ? convertLexicalUnit(lexicalUnit)
        : lexicalUnit;
    })
    .join(' ') + ';';
};

const convertLexicalUnit = (lexicalUnit) => {
  const numberOnly = parseInt(lexicalUnit.split('px')[0]);
  return `${numberOnly/16}rem`;
};

const doesNotNeedConversion = (lineOfCode) => {
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
