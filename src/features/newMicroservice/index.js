import { derived } from '../../common/displayMethods.js';
import fs from 'fs';
import path from 'path';
import { getUserResponses } from './utils.js';
import { templates, queryPrompts, messages } from './static.js';

export async function createMicroservice() {
  const responses = await getNameAndHttpMethod();
  const thatNameAlreadyExists = checkIfNameAlreadyExists(responses.microserviceName);
  return (thatNameAlreadyExists)
    ? derived.logRedBox(messages.SERVICE_ALREADY_EXISTS)
    : createFiles(responses);
}

function createFiles(responses) {
  const { microserviceName, httpMethod } = responses;
  fs.mkdirSync(microserviceName);
  const filePath = path.join(process.cwd(), microserviceName);
  const nameOfHandler = buildHandlerName(httpMethod);
  fs.writeFileSync(`${filePath}/Controller.js`, templates.Controller);
  fs.writeFileSync(`${filePath}/${nameOfHandler}`, templates.handler(httpMethod));
  fs.writeFileSync(`${filePath}/controllerFactory.js`, templates.controllerFactory);
  derived.logGreenBox(messages.SUCCESS_MESSAGE)
}

function buildHandlerName(httpMethod){
  const firstLetter = httpMethod.at(0);
  const remainingLetters = httpMethod.toLowerCase().slice(1, httpMethod.length);
  return `http${firstLetter}${remainingLetters}Handler.js`;
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

async function getNameAndHttpMethod() {
  let userResponses = {
    microserviceName: '',
    httpMethod: '',
  };
  const queries = Object.values(queryPrompts);
  for (const query of queries) {
    userResponses = await getUserResponses(query, userResponses);
  }
  return userResponses;
}

createMicroservice();
