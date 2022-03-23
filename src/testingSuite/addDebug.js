export const addDebugFnToRender = (lineOfCode) => {
  return (debugNeedNotBeAdded(lineOfCode))
    ? lineOfCode
    : addDebug(lineOfCode);
};

const debugNeedNotBeAdded = (lineOfCode) => doesNotContainRender(lineOfCode) || alreadyContainsDebug(lineOfCode);

const doesNotContainRender = (lineOfCode) => {
  const render = new RegExp('render');
  return !render.test(lineOfCode);
};

const alreadyContainsDebug = (lineOfCode) => {
  const debugPattern = /const \{.+debug.+} = render\(.+\)/;
  return debugPattern.test(lineOfCode);
};

const addDebug = (lineOfCode) => (lineOfCode.slice(0, 7) === 'render(')
  ? `const { debug } = ${lineOfCode}${invokedDebug}`
  : insertDebugIntoDestructuredObject(lineOfCode);

const insertDebugIntoDestructuredObject = (lineOfCode) => {
  const asArray = lineOfCode.split('');
  asArray.splice(7, 0, ' debug,')
  return asArray.join('') + invokedDebug;
};

const invokedDebug = '\ndebug();\n';
