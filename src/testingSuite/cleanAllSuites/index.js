import path from 'path';
import fs from 'fs';
import { cleanSingleTestSuite } from '../cleanSingleSuite/index.js';

export function cleanAllTestSuites(){
  let files = fs.readdirSync(process.cwd());
  files.forEach(file => console.log(file));
}

