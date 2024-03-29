import { derived } from "../../../common/displayMethods.js";

const { logYellowBox, underline } = derived;

export const printHelpText = () =>
  logYellowBox(`
    THE
     _____         __
    |     |       |  |
    |  .__|___ ___|  |_ __ ___ ___ _ _ ___
    |  |  | . | __|    | =|   | . | | | __|
    |___|_|___|___|__|_|__|_|_|___|___|_|
    
    CLI MAN PAGES
  
  This CLI can be run with the following flags:   
        
  $${underline("gochenour")} --about|-a      
    This provides a brief bio of the author.
  $${underline("gochenour")} clean|ct
    This command recursively removes comments, debug 
    statements and test-specific 'describe', 'test', and
    'it' methods from all test suites, beginning 
    at the level of the file directory in which this 
    command was invoked. For more details, consult the 
    test suites in the 'cleanAllSuites' and 
    'cleanSingleSuite' directories.
  $${underline("gochenour")} new-service
    Starting from the current directory from where this command
    is executed, this creates the folders and files, including 
    the configs, that are used by a standard AWS Lambda-based 
    microservice in NodeJS.
  $${underline("gochenour")} --pixel|-px
    Beginning at the current working directory, recursively 
    combs through the current directory and all subdirectories 
    to convert all rule sets that incorrectly use pixels to REM
    values in all CSS files. It then prints out all 
    converted files to the console. 
  $${underline("gochenour")} sort-css
    Beginning at the current working directory, this 
    recursively combs through the current directory and all 
    subdirectories to alphabetically sort all rule sets and
    all rules within each rule set in all CSS files.
  $${underline("gochenour")} test|t  ddt|ddi|d<integer>
    This command, followed by any of its ensuing options, 
    copies a piece of test suite boilerplate to your 
    clipboard buffer.
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
