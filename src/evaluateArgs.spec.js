it('', ()=>{})

// import { evaluateArgs, flagsAndAliases } from './evaluateArgs.mjs';
// import * as about from "./about.mjs";
//
// const { ABOUT, ABOUT_ALIAS } = flagsAndAliases;
//
// // TODO: Figure out how to get Jest to work with imports, refactor as test matrix
// // TODO: The problem is that evaluateArgs.mjs imports from other files. This fact alone causes Jest to fail despite
// // TODO: the use of .mjs file extensions and the declaration of `"type": "module"` in package.json.
// describe(`${evaluateArgs}()`, ()=>{
//   describe(`WHEN: Invoked with a flag of "${ABOUT}"`, ()=>{
//     it('THEN: It runs the about.js script', ()=>{
//       const spy = jest.spyOn(about, "printAboutText");
//       const argsArray = [
//         'node arg 1',
//         'node arg 2',
//         ABOUT
//       ];
//
//       evaluateArgs(argsArray);
//
//       expect(spy).toHaveBeenCalledTimes(1);
//     });
//   });
//   describe(`WHEN: Given a flag of "${ABOUT_ALIAS}"`, ()=>{
//     it('THEN: It runs the about.js script', ()=>{
//       const spy = jest.spyOn(about, "printAboutText");
//       const argsArray = [
//         'node arg 1',
//         'node arg 2',
//         ABOUT_ALIAS
//       ];
//
//       evaluateArgs(argsArray);
//
//       expect(spy).toHaveBeenCalledTimes(1);
//     });
//   });
// });
