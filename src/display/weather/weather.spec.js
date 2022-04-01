import fetch from 'node-fetch';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { getWeatherData } from './weather.js';

vi.mock('node-fetch');

describe('getWeatherData()', ()=>{
  afterEach(()=>vi.clearAllMocks());
  describe('GIVEN: This function is invoked', ()=>{
    describe('WHEN: And there is weather data', ()=>{
      it('THEN: It returns a weather data object.', async ()=>{
        fetch.mockImplementationOnce(()=>({
          json: ()=>({
            main: {
              temp: 10,
              humidity: 50,
            },
          })
        }))
        const expectedResult = {
          temp: 10,
          humidity: 50,
        };

        const result = await getWeatherData();

        expect(result).toEqual(expectedResult);
      });
    });
    describe('WHEN: And the fetch fails', ()=>{
      it('THEN: It throws an error.', async ()=>{
        const mockError = new Error('Failed to fetch the weather data.');
        const spy = vi.spyOn(console, 'error');
        fetch.mockImplementationOnce(() => {
            throw mockError;
        });

        await getWeatherData();

        expect(spy).toBeCalledWith(mockError);
      });
    });
  });
});