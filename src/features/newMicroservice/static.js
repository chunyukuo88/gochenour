export const templates = {
  Controller: 'export class Controller {\n\t#member1\n\t#member2\n\tconstructor(arg1, arg2) {\n\t\tthis.#member1 = arg1\n\t\tthis.#member2 = arg2\n\t}\n\n\t#privateMethod = () => {}\n}',
  handler: 'asdf',
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
