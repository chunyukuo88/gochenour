export function removeComments(lineOfCode){
  if (lineHasNoComments(lineOfCode)) return lineOfCode;
  if (lineStartsWithComment(lineOfCode)) return '';
  const uncommentedPartOnly = lineOfCode.split('//')[0];
  return uncommentedPartOnly;
}

const lineHasNoComments = (lineOfCode) => !lineOfCode.includes('//');

const lineStartsWithComment = (lineOfCode) => lineOfCode.trimStart().slice(0, 2) === '//';