import inquirer from 'inquirer';

export async function getUserResponses(query, responses) {
  await inquirer.prompt(query).then((responseObject) => {
    const queryName = query[0].name;
    responses[queryName] = responseObject[queryName];
  });
  return responses;
}
