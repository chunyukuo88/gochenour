import chalk from 'chalk';
import { readFileSync } from 'fs';
import { derived } from '../../../common/displayMethods.js';

export const printWelcome = () => {
  derived.logYellowInverse(`
    ${pkg.description} using the ${pkg.name} CLI. Version ${pkg.version}
  `);
  printSelfIntro();
};

const pkg = JSON.parse(
  readFileSync(
    new URL('../../../../package.json', import.meta.url)
  )
);

const printSelfIntro = () => {
  const asterisk = chalk.red('*');
  derived.logCyanBox(`
    THE
     _____         __
    |     |       |  |
    |  .__|___ ___|  |_ __ ___ ___ _ _ ___
    |  |  | . | __|    | =|   | . | | | __|
    |___|_|___|___|__|_|__|_|_|___|___|_|
    
    CLI
  
    I'm Alex Gochenour, and I am an award-winning${asterisk} JavaScript engineer and founder of Woobler's House. 
    I love baking, running, and all things Chinese.
  
    🔗 Linkedin: https://www.linkedin.com/in/alex-gochenour
    🐈 Github: https://github.com/chunyukuo88
  
    ${asterisk} I was named 'Person of the Year' by Time Magazine in 2006.
  `);
};