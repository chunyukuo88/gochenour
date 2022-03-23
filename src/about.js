import chalk from "chalk";
import boxen from "boxen";
import { readFileSync } from 'fs';
import { getWeatherData } from './weather.js';

export async function printAboutText(){
  printWelcome();
  // await printWeather();
}

const { cyan, red, yellow } = chalk;

const pkg = JSON.parse(
  readFileSync(
    new URL('../package.json', import.meta.url)
  )
);

const printWelcome = () => {
  console.log(
    yellow.inverse(
 `${pkg.description} using the ${pkg.name} CLI. Version ${pkg.version}`
    )
  );
  printSelfIntro();
};

const printSelfIntro = () => {
  const asterisk = red('*');
  console.log(
    cyan(
      boxen(
        `
  Howzit howzit

  I'm Alex Gochenour, and I am an award-winning${asterisk} JavaScript engineer and founder of Woobler's House. 
  I love baking, running, and all things Chinese.

  🔗 Linkedin: https://www.linkedin.com/in/alex-gochenour
  🐈 Github: https://github.com/chunyukuo88

  ${asterisk} I was named "Person of the Year" by Time Magazine in 2006.
        `
      )
    )
  );
};

const printWeather = async  () => {
  const { temp, humidity } = await getWeatherData();
  const tempInFahrenheit = convertToFahrenheit(temp);
  console.log(
    yellow(`It's ${tempInFahrenheit} degrees and ${humidity}% humidity in Westerville now.`)
  );
};

const convertToFahrenheit = (degreesKelvin) => {
  const degreesFahrenheit = (degreesKelvin - 273.15) * 9/5 + 32;
  return Math.round(degreesFahrenheit);
};