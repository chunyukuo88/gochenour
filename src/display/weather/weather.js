import fetch from 'node-fetch';

export const getWeatherData = async () => {
  try {
    const data = await fetchJsonData(openWeatherUrl);
    return data.main;
  } catch (e) {
    console.error('fetchWeather() failed:', e.message);
  }
};

const fetchJsonData = async (urlString) => {
  try {
    const response = await fetch(urlString)
    return response.json();
  } catch(e) {
    console.error(e)
  }
};

const openWeatherUrl = `
  https://api.openweathermap.org/data/2.5/weather?q=Westerville,Ohio&appid=${process.env.WEATHER_API_KEY}
`;