import { describe, expect, test, vi } from 'vitest';
import { copyVitestBoilerplate, successMsg, vitestBoilerplateString } from './index.js';
import { derived } from '../../common/displayMethods.js';
import clipboard from 'clipboardy';

vi.mock('clipboardy');
vi.mock('../../common/displayMethods.js', ()=>({
  derived: {
    logRedBox: vi.fn(),
    logCyanBox: vi.fn(),
    logGreenBox: vi.fn(),
  }
}));

describe('WHEN: copyVitestBoilerplate() is invoked,', ()=>{
  const spy = vi.spyOn(clipboard, 'writeSync');
  copyVitestBoilerplate();

  test('THEN: it copies Vitest boilerplate to the user\'s clipboard.', ()=>{
    expect(spy).toBeCalledWith(vitestBoilerplateString);
  });
  test('THEN: it notifies the user that the boilerplate has been copied.', ()=>{
    expect(derived.logGreenBox).toBeCalledWith(successMsg);
  });
});
