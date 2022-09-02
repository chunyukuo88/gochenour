export const mocks = {
  DEBUG_NOT_DELETABLE: 'const debugThatShouldNotBeDeleted = "";',
  DEBUG_INVOCATION: 'debug()',
  EMPTY_STRING: '',
  DEBUG_SINGLE_DESTRUCTURED: 'const { debug } = render(',
  DOUBLE_DESTRUCTURE_1: 'const { debug, component } = render(',
  DOUBLE_DESTRUCTURE_2: 'const { component, debug } = render(',
  DEBUG_SINGLE_DESTRUCTURED_INDENT: '  const { debug } = render(',
  MULTIPLE_DESTRUCTURE: 'const { component, debug, getByRole } = render(',
};