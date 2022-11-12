import inquirer from 'inquirer';
import { exec } from 'child_process';
import { templates } from './static.js';

export async function getUserResponses(query, responses) {
  await inquirer.prompt(query).then((responseObject) => {
    const queryName = query[0].name;
    responses[queryName] = responseObject[queryName];
  });
  return responses;
}

export async function installDependencies(microserviceName) {
  exec(`cd ${microserviceName} && npm i --save-dev ${templates.packageJsonDevDependencies}`, {}, () => {
    installDevDependencies(microserviceName)
  });
}

function installDevDependencies(microserviceName) {
  exec(`cd ${microserviceName} && npm i ${templates.packageJsonDependencies}`);
}
