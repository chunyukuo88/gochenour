// Removes the 'skip' and 'only' methods from 'describe', 'it', and 'test' blocks.
export function removeMethods(lineOfCode, targetMethod){
  if (!targetMethod) return evaluateLineOnly(lineOfCode);
  if (targetMethodIsInvalid(targetMethod)) return lineOfCode;
  return (lineOfCodeMatchesPattern(lineOfCode))
    ? lineOfCode.replace(targetMethod, '')
    : lineOfCode;
}

function evaluateLineOnly(lineOfCode){
  const lineOfCodeMatchesPattern = pattern.test(lineOfCode);
  return (lineOfCodeMatchesPattern)
    ? removeDescribeMethods(lineOfCode)
    : lineOfCode;
}

function removeDescribeMethods(lineOfCode){
  return lineOfCode.replace('.only', '').replace('.skip', '');
}

function lineOfCodeMatchesPattern(lineOfCode){
  const lineOfCodeMatchesPattern = pattern.test(lineOfCode);
  return lineOfCodeMatchesPattern;
}

function targetMethodIsInvalid(targetMethod){
  return !methodsToBeRemoved.includes(targetMethod);
}

const pattern = /(describe|test|it)\.(skip|only)/;

const methodsToBeRemoved = ['.skip', '.only'];
