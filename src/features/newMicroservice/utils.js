import inquirer from 'inquirer';
import { execSync } from 'child_process';
import { derived } from '../../common/displayMethods.js';
import { messages, templates } from './static.js';

export async function getUserResponses(query, responses) {
  await inquirer.prompt(query).then((responseObject) => {
    const queryName = query[0].name;
    responses[queryName] = responseObject[queryName];
   });
  return responses;
 }

export function installPackages(res) {
  if (res.shouldCreatePackageJson === 'Yes') {
    execSync('npm init -y', {  cwd: `${ res.microserviceName }` });
    derived.logGreenBox(messages.PACKAGE_JSON_CREATION);
    execSync(`cd ${ res.microserviceName } && npm i --save-dev ${ templates.packageJsonDevDependencies }`);
    execSync(`cd ${ res.microserviceName } && npm i ${ templates.packageJsonDependencies }`);
    derived.logGreenBox(messages.DEPENDENCIES_DONE);
   }
 }
