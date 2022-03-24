#!/usr/bin/env node
import 'dotenv/config';
import { getNodeCompatibility } from './src/nodeUtils/nodeVersionCheck.js';
import { evaluateArgs } from './src/nodeUtils/evaluateArgs.js';
import { getCurrentNodeVersion } from './src/nodeUtils/getCurrentNodeVersion.js';

const userArgs = process.argv.slice(2);

export async function main(){
  console.clear();
  const currentNodeVersion = await getCurrentNodeVersion();
  const isCompatible = getNodeCompatibility(currentNodeVersion);
  isCompatible && await evaluateArgs(userArgs);
}

await main();