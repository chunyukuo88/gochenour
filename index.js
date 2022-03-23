import 'dotenv/config'
import { getNodeCompatibility } from './src/nodeVersionCheck.js';
import { evaluateArgs } from './src/evaluateArgs.js';

const currentNodeVersion = process.versions.node;

export async function main(){
  console.clear();
  console.log(currentNodeVersion);
  const isCompatible = getNodeCompatibility(currentNodeVersion);
  isCompatible && await evaluateArgs(process.argv);
}

await main();