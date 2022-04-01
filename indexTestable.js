/** The contents of this module are identical to index.js, with the notable exception of the shebang, which is removed from here for sake of testing. */
import 'dotenv/config';
import { getNodeCompatibility } from './src/nodeUtils/nodeVersionCheck/index.js';
import { evaluateArgs } from './src/nodeUtils/evaluateArgs/index.js';
import { getNodeVersion } from './src/nodeUtils/processFunctions.js';

const userArgs = process.argv.slice(2);

export async function main(){
  console.clear();
  const currentNodeVersion = await getNodeVersion();
  const isCompatible = getNodeCompatibility(currentNodeVersion);
  isCompatible && await evaluateArgs(userArgs);
}

await main();
