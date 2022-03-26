export const getNodeCompatibility = (currentNodeVersion) => {
  const usersNodeVersion = getUsersNodeVersion(currentNodeVersion);
  const minimumNodeVersion = 16;
  const isCompatible = true;
  if (usersNodeVersion <  Math.abs(minimumNodeVersion)) {
    const msg = buildFailureMsg(usersNodeVersion, minimumNodeVersion);
    console.error(msg);
    return !isCompatible;
  };
  return isCompatible;
};

export const buildFailureMsg = (currentNodeVersion, minimumNodeVersion) => `
    Your are using version of ${currentNodeVersion} of Node.js.
    This program requires a minimum Node.js version of ${minimumNodeVersion}.
    Please update your version of Node.js to run this program.
    https://nodejs.org/en/download
`;

const getUsersNodeVersion = (currentNodeVersion) => {
  const semanticVersionAsArray = currentNodeVersion.split('.');
  const usersVersionOfNode = semanticVersionAsArray[0];
  return parseInt(usersVersionOfNode);
};