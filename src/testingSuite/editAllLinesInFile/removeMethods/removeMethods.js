export function removeMethods(lineOfCode, target){
  if (!target) return evaluateLineOnly(lineOfCode);
  if (targetIsInvalid(target)) return lineOfCode;
  return (lineOfCodeMatchesPattern(lineOfCode))
    ? lineOfCode.replace(target, '')
    : lineOfCode;
}

function evaluateLineOnly(lineOfCode){
  const lineOfCodeMatchesPattern = pattern.test(lineOfCode);
  return (lineOfCodeMatchesPattern)
    ? lineOfCode.replace('.only', '').replace('.skip', '')
    : lineOfCode;
}

function lineOfCodeMatchesPattern(lineOfCode){
  const lineOfCodeMatchesPattern = pattern.test(lineOfCode);
  return lineOfCodeMatchesPattern;
}

function targetIsInvalid(target){
  return !validTargets.includes(target);
}

const pattern = /(describe|test|it)\.(skip|only)/;

const validTargets = ['.skip', '.only'];