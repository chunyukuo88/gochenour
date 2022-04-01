#!/usr/bin/env node
import 'dotenv/config';
import { processFunctions } from './src/nodeUtils/processFunctions.js';
import { getNodeCompatibility } from './src/nodeUtils/nodeVersionCheck/index.js';
import { evaluateArgs } from './src/nodeUtils/evaluateArgs/index.js';

const userArgs = process.argv.slice(2);

export async function main(){
  console.clear();
  const currentNodeVersion = await processFunctions();
  const isCompatible = getNodeCompatibility(currentNodeVersion);
  isCompatible && await evaluateArgs(userArgs);
}

await main();
export {displayMemoryUsed} from "./src/common/utils";