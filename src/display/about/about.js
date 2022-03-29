import ora from 'ora';
import { getWeatherData } from '../weather/weather.js';
import { printWelcome } from '../printWelcome.js';
import { derived } from '../../common/displayMethods.js';

const spinner = ora();

export async function printAboutText(){
  printWelcome();
  await printWeather();
}

const printWeather = async () => {
  spinner.start();
  const { temp, humidity } = await getWeatherData();
  const tempInFahrenheit = convertToFahrenheit(temp);
  spinner.succeed('Fetching weather data...');
  derived.logYellow(`It's ${tempInFahrenheit} degrees and ${humidity}% humidity in Westerville now.`);
};

const convertToFahrenheit = (degreesKelvin) => {
  const degreesFahrenheit = (degreesKelvin - 273.15) * 9/5 + 32;
  return Math.round(degreesFahrenheit);
};
