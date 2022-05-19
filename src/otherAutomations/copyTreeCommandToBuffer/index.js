import clipboard from 'clipboardy';

export const copyTreeCommandToBuffer = () => {
  const expectedBufferContent = 'tree -I "node_modules|coverage|.serverless|dist" ';
  clipboard.writeSync(expectedBufferContent);
};