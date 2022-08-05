export const convertSingleLine = (lineOfCode) => {
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