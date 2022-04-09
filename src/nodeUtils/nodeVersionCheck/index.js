export const getNodeCompatibility = (currentNodeVersion) => {
  const usersNodeVersion = getUsersNodeVersion(currentNodeVersion);
  const isCompatible = true;
  if (isBelowRequiredVersion(usersNodeVersion)) {
    const msg = buildFailureMsg(usersNodeVersion);
    console.error(msg);
    return !isCompatible;
  };
  return isCompatible;
};

const MINIMUM_VERSION = 16;

const isBelowRequiredVersion = (userVersion) => {
  return userVersion <  Math.abs(MINIMUM_VERSION);
};

export const buildFailureMsg = (currentNodeVersion) => `
    Your are using version of ${currentNodeVersion} of Node.js.
    This program requires a minimum Node.js version of ${MINIMUM_VERSION}.
    Please update your version of Node.js to run this program.
    https://nodejs.org/en/download
`;

const getUsersNodeVersion = (currentNodeVersion) => {
  const semanticVersionAsArray = currentNodeVersion.split('.');
  const usersVersionOfNode = semanticVersionAsArray[0];
  return parseInt(usersVersionOfNode);
};