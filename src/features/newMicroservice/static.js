export const templates = {
  babelrc: '{\n  "presets": ["@babel/preset-env"],\n  "plugins": ["@babel/plugin-proposal-class-properties", "@babel/transform-runtime"]\n}',
  controllerFactory: 'import { Controller } from \'./Controller\';\n\nexport const getController = (loggerFn) => {\n  //\n\n  return new Controller(loggerFn);\n};',
  Controller: 'export class Controller {\n  #member1\n  #member2\n  constructor(arg1, arg2) {\n    this.#member1 = arg1\n    this.#member2 = arg2\n  }\n\n  #privateMethod = () => {}\n}',
  handler: (httpMethod) => `import { getController } from './controllerFactory';\n\nmodule.exports.${httpMethod.toLowerCase()}Handler = async (httpRequest) => {\n  //\n};`,
}

export const messages = {
  SERVICE_ALREADY_EXISTS: ' A service of that name already exists. Please try again. ',
  SUCCESS_MESSAGE: ' Success! Service has been created. ',
};

export const queryPrompts = {
  microserviceName: [
    {
      type: 'input',
      message: 'Enter a name for the new microservice:\n>',
      name: 'microserviceName',
    },
  ],
  httpMethod: [
    {
      type: 'list',
      message: 'Please select the HTTP method that the handler of this microservice will use:',
      name: 'httpMethod',
      choices: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE' ],
    },
  ],
};
