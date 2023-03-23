Welcome to the gochenour CLI!

This handy application offers a small collection of tools that are all run via command line using `gochenour <keyword>` or `goch <keyword>` for short. Features include:

## About ##
    gochenour --about
    goch -a

This provides a brief bio of the author.

## Clean up JavaScript tests ##
    gochenour clean
    goch ct

This command recursively removes comments, debug statements and test-specific 'describe', 'test', and 'it' methods from
all test suites, beginning at the level of the file directory in which this command was invoked. For more details,
consult the test suites in the 'cleanAllSuites' and 'cleanSingleSuite' directories. It then lists which files were checked for extraneous test block methods and render methods.

## New AWS Lambda (NodeJS) ##
    gochenour new-service                                       

Starting from the current directory from where this command is executed, this creates the folders and files, including
the configs, that are used by a standard AWS Lambda-based microservice in NodeJS.

## Convert `px` to `rem` in CSS files ##
    gochenour --pixel-px                                       

Beginning at the current working directory, recursively combs through the current directory and all subdirectories
to convert all rule sets that incorrectly use pixels to REM values in all CSS files. It then prints out all converted files to the console.

## Alphabetize CSS rules and rulesets ##
    gochenour sort-css                                          

Beginning at the current working directory, this recursively combs through the current directory and all subdirectories
to alphabetically sort all rule sets and all rules within each rule set in all CSS files.

## Copy testing boilerplate to clipboard ##

    gochenour test ddt
    gochenour test ddi
    gochenour test d<integer>

This command, followed by any of its ensuing options, copies a piece of test suite boilerplate to your clipboard buffer, producing the following:

    $gochenour test ddt
    ┌─────────────────────────────────────────────────┐
    │The following has been copied to your clipboard: │
    │                                                 │
    │describe('GIVEN: ', () => {                      │
    │  describe('WHEN: ', () => {                     │
    │    test('THEN: ', () => {                       │
    │      //                                         │
    │    });                                          │
    │  });                                            │
    │});                                              │
    │                                                 │
    │                                                 │
    └─────────────────────────────────────────────────┘

## Copy tree command with JavaScript-specific flags to clipboard ##

    gochenour tree   
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │ The following has been copied to your clipboard buffer: │
    │                                                         │
    │   tree -I "node_modules|coverage|.serverless|dist"      │
    │                                                         │
    │Press COMMAND+V to paste it into the terminal.           │
    │                                                         │
    └─────────────────────────────────────────────────────────┘

This command copies to your clipboard buffer a complex tree command that you can run as-is or add an additional
subdirectory to specify where to display a tree. NOTE: This requires installation of the tree program, which may not work on Windows systems.

## Copy the git command that deletes all local branches except `main` ##

    gochenour shake

    ┌─────────────────────────────────────────────────────────────────────────────┐
    │The following has been copied to your clipboard:                             │
    │                                                                             │
    │git branch | grep -v "main" | xargs git branch -D                            │
    │                                                                             │
    │Executing this command will delete all git branches on your computer's hard  │
    │drive except the "main" branch.                                              │
    └─────────────────────────────────────────────────────────────────────────────┘

This is very handy after merging a branch to `main` and when you are certain that all other local branches can be deleted. Particularly useful when prototyping.

## Copy Vitest boilerplate to clipboard ##
    gochenour vitest                                         
    goch vi
    ┌────────────────────────────────────────────────────────────────────────────┐
    │The following Vitest boilerplate has been copied to your system's clipboard:│
    │                                                                            │
    │import { describe, expect, test, vi } from 'vitest';                        │
    │import {} from '';                                                          │
    │                                                                            │
    │describe('GIVEN: ', ()=>{                                                   │
    │  describe('WHEN: ', ()=>{                                                  │
    │    test('THEN: ', ()=>{                                                    │
    │      //                                                                    │
    │    });                                                                     │
    │  });                                                                       │
    │});                                                                         │
    │                                                                            │
    └────────────────────────────────────────────────────────────────────────────┘

This command copies to your clipboard buffer a commonly used string that imports Vitest methods. Handy for all Vitest suites.
