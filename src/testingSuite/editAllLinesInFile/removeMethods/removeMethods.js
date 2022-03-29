export function removeMethods(lineOfCode, target){
  if (!target) return evaluateLineOnly(lineOfCode);
  if (!validTargets.includes(target)) return lineOfCode;
  if (lineOfCodeAndTargetAreValid(lineOfCode, target)) return lineOfCode.replace(target, '');
  return lineOfCode;
}

function evaluateLineOnly(lineOfCode){
  const pattern = /(describe|test|it)\.(skip|only)/;
  const lineOfCodeMatchesPattern = pattern.test(lineOfCode);
  return (lineOfCodeMatchesPattern)
    ? lineOfCode.replace('.only', '').replace('.skip', '')
    : lineOfCode;
}

function lineOfCodeAndTargetAreValid(lineOfCode, target){
  const pattern = /(describe|test|it)\.(skip|only)/;
  const lineOfCodeMatchesPattern = pattern.test(lineOfCode);
  const lineOfCodeContainsValidTarget = lineOfCode.includes(target);
  return lineOfCodeMatchesPattern && lineOfCodeContainsValidTarget;
}

const validTargets = ['.skip', '.only'];