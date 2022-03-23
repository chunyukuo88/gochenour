export const removeAllDebug = (lineOfCode) => (lineOfCode.includes('debug'))
  ? removeDebugFromLine(lineOfCode)
  : '';

const removeDebugFromLine = (lineOfCode) => (patterns.invokedDebug.test(lineOfCode))
  ? ''
  : removeDestructuredDebug(lineOfCode);

const removeDestructuredDebug = (lineOfCode) => {
  if (!patterns.withOthersDestructured.test(lineOfCode)) return lineOfCode;
  return (patterns.asSoleDestructured.test(lineOfCode))
    ? lineOfCode.trim().slice(17)
    : removeFromDestructuredGroup(lineOfCode);
};

const removeFromDestructuredGroup = (lineOfCode) => {
  const debugRemoved = lineOfCode.replace('debug', '');
  if (hasExtraCommaAtTheStart(debugRemoved)) return fixLeadingComma(debugRemoved);
  if (hasDoubledComma(debugRemoved)) return fixDoubledComma(debugRemoved);
  if (hasExtraCommaAtTheEnd(debugRemoved)) return fixTrailingComma(debugRemoved);
};

const hasExtraCommaAtTheStart = (lineOfCode) => patterns.commaLeading.test(lineOfCode);

const hasDoubledComma = (lineOfCode) => patterns.commaDoubled.test(lineOfCode);

const hasExtraCommaAtTheEnd = (lineOfCode) => patterns.commaTrailing.test(lineOfCode);

const fixDoubledComma = (lineOfCode) => {
  const commaRemoved = lineOfCode.replace(', , ', ', ');
  return commaRemoved;
};

const fixLeadingComma = (lineOfCode) => {
  const commaRemoved = lineOfCode.replace('{ , ', '{ ');
  return commaRemoved;
};

const fixTrailingComma = (lineOfCode) => {
  const commaRemoved = lineOfCode.replace(',  }', ' }');
  return commaRemoved;
};

const patterns = {
  invokedDebug: /debug\(/,
  asSoleDestructured: /const \{ debug } = render\(/,
  withOthersDestructured: /const \{.+debug.+} = render\(/,
  commaDoubled: /, ,/,
  commaLeading: /\{ , /,
  commaTrailing: /,.+}/
};
