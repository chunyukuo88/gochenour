import { describe, test, expect, vi } from 'vitest';
import chalk from "chalk";
import boxen from "boxen";
import { readFileSync } from 'fs';
import { getWeatherData } from './weather.js';
import { printAboutText } from './about.js';

vi.mock('./weather.js');

describe('about.js', ()=>{
  describe('printAboutText()', ()=>{
    describe('printAboutText()', ()=>{
      test('It prints a welcome message.', async ()=>{
        const spyConsoleLog = vi.spyOn(console, "log");

        await printAboutText();

        expect(spyConsoleLog).toBeCalledTimes(2);
      });
    });
  });
});