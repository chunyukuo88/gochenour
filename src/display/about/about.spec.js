import { afterEach, describe, expect, test, vi } from 'vitest';
import '../weather/weather.js';
import { printWelcome } from '../printWelcome.js';
import { printAboutText } from './about.js';
import { derived } from '../../common/displayMethods.js';

vi.mock('../printWelcome');
vi.mock('../weather/weather.js', ()=>({
  getWeatherData: ()=>({
    temp: 272,
    humidity: 50,
  })
}));
vi.mock('../../common/displayMethods.js', ()=>({
  derived: {
    logYellow: vi.fn(),
  },
}));

afterEach(()=> vi.clearAllMocks());

describe('about.js', ()=>{
  describe('printAboutText()', ()=>{
    test('First it prints a welcome message.', async ()=>{
      printWelcome.mockImplementationOnce(vi.fn());

      await printAboutText();

      expect(printWelcome).toBeCalled();
    });
    test('Then it prints the weather.', async ()=>{
      const expectedWeather = "It's 30 degrees and 50% humidity in Westerville now.";

      await printAboutText();

      expect(derived.logYellow).toBeCalledWith(expectedWeather);
    });
  });
});