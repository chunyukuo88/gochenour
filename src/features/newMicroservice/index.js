import { derived } from '../../common/displayMethods.js';
import fs from 'fs';
import path from 'path';
import { getUserResponses } from './utils.js';

export const messages = {
  SERVICE_ALREADY_EXISTS: ' A service of that name already exists. Please try again. ',
  SUCCESS_MESSAGE: ' Success! Service has been created. ',
};

export async function createMicroservice() {
  const microserviceName = await getMicroserviceName();
  const thatNameAlreadyExists = checkIfNameAlreadyExists(microserviceName);
  return (thatNameAlreadyExists)
    ? derived.logRedBox(messages.SERVICE_ALREADY_EXISTS)
    : createFiles(microserviceName);
}

function createFiles(microserviceName){
  fs.mkdirSync(microserviceName);
  const filePath = path.join(process.cwd(), microserviceName);
  fs.writeFileSync(`${filePath}/Controller.js`, 'moist!');
  derived.logGreenBox(messages.SUCCESS_MESSAGE)
}

function checkIfNameAlreadyExists(microserviceName) {
  const entitiesInCurrentDirectory = fs.readdirSync(process.cwd());
  let nameAlreadyExists = false;
  for (let index in entitiesInCurrentDirectory) {
    const entityName = entitiesInCurrentDirectory[index];
    if (entityName === microserviceName) {
      nameAlreadyExists = true;
      break;
    }
  }
  return nameAlreadyExists;
}

async function getMicroserviceName() {
  let userResponses = {
    nameOfNewService: '',
  };
  const queries = Object.values(queryPrompts);
  for (const query of queries) {
    userResponses = await getUserResponses(query, userResponses);
  }
  return userResponses.nameOfNewService;
}

const queryPrompts = {
  microserviceName: [
    {
      type: 'input',
      message: 'Enter a name for the new microservice:\n>',
      name: 'nameOfNewService',
    },
  ],
};

createMicroservice();