import { derived } from "../../common/displayMethods.js";

const { logYellowBox, underline } = derived;

export const printHelpText = () =>
  logYellowBox(`
  Gochenour Man Pages
  
  This CLI can be run with the following flags:   
        
  $${underline("gochenour")} --about|-a      
    This provides a brief bio of the author.
  $${underline("gochenour")} test|t  ddt|ddi|d<integer>
    This command, followed by any of its ensuing options, 
    copies a piece of test suite boilerplate to your 
    clipboard buffer.
  $${underline("gochenour")} clean|ct
    This command recursively removes comments, debug 
    statements and test-specific 'describe', 'test', and
    'it' methods from all test suites, beginning 
    at the level of the file directory in which this 
    command was invoked. For more details, consult the 
    test suites in the 'cleanAllSuites' and 
    'cleanSingleSuite' directories.
  $${underline("gochenour")} tree
    This command copies to your clipboard buffer a complex
    tree command that you can run as-is or add an addi-
    tional subdirectory to specify where to display a tree.
    NOTE: This requires installation of the tree program.
  $${underline("gochenour")} vitest|vi
    This command copies to your clipboard buffer a commonly
    used string that imports Vitest methods. Handy for 
    all Vitest suites.
`);
