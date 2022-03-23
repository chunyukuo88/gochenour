import chalk from "chalk";

export function printHelpText(){
  console.log(`
    Gochenour Man Pages
    
    This CLI can be run with the following flags:
    
    ${chalk.underline('gochenour')} --about|-a
      This provides a brief bio of the author.
  `);
}