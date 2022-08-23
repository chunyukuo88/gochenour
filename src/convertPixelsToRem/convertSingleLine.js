export const convertSingleLine = (lineOfCode) => {
  if (doesNotNeedEvaluation(lineOfCode)) return lineOfCode;
  const { requiredConversion, convertedLineOfCode } = performConversion(lineOfCode);
  return (requiredConversion)
    ? addComment(convertedLineOfCode, lineOfCode)
    : convertedLineOfCode;
};

const addComment = (convertedLineOfCode, originalLineOfCode) => `${convertedLineOfCode} /* As pixels: ${originalLineOfCode.trim()} */`;

const performConversion = (lineOfCode) => {
  const asArray = lineOfCode.split(' ');
  let requiredConversion = false;
  const joined = asArray
    .map(lexicalUnit => {
      if (lexicalUnit.includes('px')) {
        requiredConversion = true;
        return convertLexicalUnit(lexicalUnit)
      }
      return lexicalUnit;
    })
    .join(' ');
  const convertedLineOfCode = accountForSemicolon(joined);
  return { requiredConversion, convertedLineOfCode };
}

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
