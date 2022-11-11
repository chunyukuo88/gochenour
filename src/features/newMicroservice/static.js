export const templates = {
  babelrc: '{\n  "presets": ["@babel/preset-env"],\n  "plugins": ["@babel/plugin-proposal-class-properties", "@babel/transform-runtime"]\n}',
  Controller: 'export class Controller {\n  #member1\n  #member2\n  constructor(arg1, arg2) {\n    this.#member1 = arg1\n    this.#member2 = arg2\n  }\n\n  #privateMethod = () => {}\n}',
  ControllerTest: 'import { Controller } from \'../../src/Controller\';\n\ndescribe(\'Controller.js\', () => {\n\n});\n',
  controllerFactory: 'import { Controller } from \'./Controller\';\n\nexport const getController = (loggerFn) => {\n  //\n\n  return new Controller(loggerFn);\n};',
  controllerFactoryTest: 'import { getController } from \'../../src/controllerFactory\';\n\ndescribe(\'controllerFactory.js\', () => {\n\  //\n});\n',
  eslintrc: '{\n  "extends": "airbnb",\n  "parser": "@babel/eslint-parser",\n  "rules": {\n    "no-use-before-define": ["error", { "variables": false }],\n    "import/prefer-default-export": "off",\n    "lines-between-class-members": 0,\n    "max-len": [1, { "code": 120 }]\n  },\n  "env": {\n    "jest": true\n  }\n}',
  handler: (httpMethod) => `import { getController } from './controllerFactory';\n\nmodule.exports.${httpMethod.toLowerCase()}Handler = async (httpRequest) => {\n  //\n};`,
  handlerTest: (httpMethod) => '',
  jestConfig: 'module.exports = {\n  verbose: true,\n  testPathIgnorePatterns: [\'/node_modules/\'],\n};',
  npmIgnore: '# package directories\nnode_modules\njspm_packages\n\n# Serverless directories\n.serverless',
  serverlessYml: (microserviceName, httpMethod) => `service: ${microserviceName}\nframeworkVersion: '2 || 3'\n\ncustom:\n  cognito-pool-id:\n    dev: #\n    prod: #\n\nprovider:\n  name: aws\n  runtime: nodejs16.x\n  profile: \${opt:stage}\n  iamRoleStatements:\n      - Effect: "Allow"\n        Action:\n          - secretsmanager:GetSecretValue\n        Resource: #\n  environment:\n    NODE_ENV: \${opt:stage}\n  httpApi:\n    authorizers:\n      cognitoAuthorizer:\n        type: jwt\n        identitySource: $request.header.Authorization\n        issuerUrl: https://cognito-idp.us-east-1.amazonaws.com/\${self:custom.cognito-pool-id.\${opt:stage}}\n        audience:\n          - \${self:custom.offices-app-id.\${opt:stage}}\n    cors: true\n\nfunctions:\n  ${microserviceName}:\n    handler: dist/awsFunctionHandler.${microserviceName}\n    timeout: 10\n    events:\n      - httpApi:\n          path: #\n          method: ${httpMethod}\n          integration: lambda-proxy\n          authorizer:\n            name: cognitoAuthorizer`,
};

export const messages = {
  SERVICE_ALREADY_EXISTS: ' A service of that name already exists. Please try again. ',
  SUCCESS_MESSAGE: ' Success! Service has been created. ',
  PACKAGE_JSON_CREATION: ' The package.json file has been generated, too. ',
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
  shouldCreatePackageJson: [
    {
      type: 'list',
      message: 'Generate a package.json file?',
      name: 'shouldCreatePackageJson',
      choices: ['Yes', 'No'],
    },
  ],
};
