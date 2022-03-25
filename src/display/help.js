import { derived } from '../common/displayMethods.js';

const { logYellowBox, underline } = derived;

export const printHelpText = () =>  logYellowBox(`
  Gochenour Man Pages
  
  This CLI can be run with the following flags:   
        
  $${underline('gochenour')} --about|-a      
    This provides a brief bio of the author.            
`);
