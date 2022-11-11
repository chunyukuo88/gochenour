import { derived } from '../../common/displayMethods.js';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { getUserResponses } from './utils.js';
import { templates, queryPrompts, messages } from './static.js';

export async function createMicroservice() {
  const responses = await getNameAndHttpMethod();
  const thatNameAlreadyExists = checkIfNameAlreadyExists(responses.microserviceName);
  return (thatNameAlreadyExists)
    ? derived.logRedBox(messages.SERVICE_ALREADY_EXISTS)
    : performTasks(responses);
}

function performTasks(responses) {
  const { microserviceName, httpMethod, shouldCreatePackageJson } = responses;
  fs.mkdirSync(microserviceName);
  fs.mkdirSync(`${microserviceName}/src`, { recursive: true });
  fs.mkdirSync(`${microserviceName}/test/unit`, { recursive: true });
  fs.mkdirSync(`${microserviceName}/test/integration`, { recursive: true });
  const filePath = path.join(process.cwd(), microserviceName);
  createSourceFiles(filePath, httpMethod);
  createConfigFiles(filePath, httpMethod, microserviceName);
  createTestFiles(filePath, httpMethod);
  derived.logGreenBox(messages.SUCCESS_MESSAGE);
  if (shouldCreatePackageJson === 'Yes') {
    exec(`cd ${microserviceName} && npm init -y`);
  }
}

function createSourceFiles(filePath, httpMethod) {
  const nameOfHandler = buildHandlerName(httpMethod);
  fs.writeFileSync(`${filePath}/src/Controller.js`, templates.Controller);
  fs.writeFileSync(`${filePath}/src/${nameOfHandler}.js`, templates.handler(httpMethod));
  fs.writeFileSync(`${filePath}/src/controllerFactory.js`, templates.controllerFactory);
}

function createConfigFiles(filePath, httpMethod, microserviceName) {
  fs.writeFileSync(`${filePath}/.env`, '');
  fs.writeFileSync(`${filePath}/.babelrc`, templates.babelrc);
  fs.writeFileSync(`${filePath}/.eslintrc`, templates.eslintrc);
  fs.writeFileSync(`${filePath}/.npmignore`, templates.npmIgnore);
  fs.writeFileSync(`${filePath}/jest.config.js`, templates.jestConfig);
  fs.writeFileSync(`${filePath}/serverless.yml`, templates.serverlessYml(microserviceName, httpMethod));
  fs.writeFileSync(`${filePath}/swagger.yml`, '');
}

function createTestFiles(filePath, httpMethod) {
  const nameOfHandler = buildHandlerName(httpMethod);
  fs.writeFileSync(`${filePath}/test/unit/Controller.test.js`, templates.ControllerTest);
  fs.writeFileSync(`${filePath}/test/unit/controllerFactory.test.js`, templates.controllerFactoryTest);
  fs.writeFileSync(`${filePath}/test/unit/${nameOfHandler}.test.js`, templates.handlerTest(httpMethod));
}

function buildHandlerName(httpMethod){
  const firstLetter = httpMethod.at(0);
  const remainingLetters = httpMethod.toLowerCase().slice(1, httpMethod.length);
  return `http${firstLetter}${remainingLetters}Handler`;
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
    shouldCreatePackageJson: '',
  };
  const queries = Object.values(queryPrompts);
  for (const query of queries) {
    userResponses = await getUserResponses(query, userResponses);
  }
  return userResponses;
}

// await createMicroservice();
