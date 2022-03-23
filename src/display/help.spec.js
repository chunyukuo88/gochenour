import { derived } from '../common/displayMethods.js';
import { describe, expect, it, vi } from 'vitest';
import { printHelpText } from './help.js';

vi.mock('../common/displayMethods.js', ()=>({
  logYellowBox: vi.fn(),
  underline: vi.fn(),
}));

describe('printHelpText()', ()=>{
  it('This function prints a message with a yellow box and an underline.', ()=>{
    // const spyYellow = vi.spyOn(derived, 'logYellowBox');
    // const spyUnderline = vi.spyOn(derived, 'underline');

    printHelpText();

    expect(logYellowBox).toHaveBeenCalled();
    expect(underline).toHaveBeenCalled();
  });
});
