#!/usr/bin/env node
import 'dotenv/config';
import { getNodeCompatibility } from './src/nodeUtils/nodeVersionCheck/nodeVersionCheck.js';
import { evaluateArgs } from './src/nodeUtils/evaluateArgs/evaluateArgs.js';
import { getProcessData } from './src/nodeUtils/getProcessData.js';

const userArgs = process.argv.slice(2);

export async function main(){
  console.clear();
  const currentNodeVersion = await getProcessData();
  const isCompatible = getNodeCompatibility(currentNodeVersion);
  isCompatible && await evaluateArgs(userArgs);
}

await main();
