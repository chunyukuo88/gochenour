import { describe, test, expect, vi } from 'vitest';
import { getWeatherData } from '../weather/weather.js';
import { printAboutText } from './about.js';

vi.mock('../weather/weather.js');

describe('about.js', ()=>{
  describe('printAboutText()', ()=>{
    describe('printAboutText()', ()=>{
      test('It prints a welcome message.', async ()=>{
        getWeatherData.mockImplementationOnce(async ()=>({
          temp: 5
        }));
        const spyConsoleLog = vi.spyOn(console, 'log');

        await printAboutText();

        expect(spyConsoleLog).toBeCalledTimes(3);
      });
    });
  });
});