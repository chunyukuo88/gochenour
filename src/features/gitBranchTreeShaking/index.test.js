import { describe, expect, it, vi } from 'vitest';
import { handler, gitCommand, successMsg } from './index';
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

describe('WHEN: This function is invoked', () => {
  const spy = vi.spyOn(clipboard, 'writeSync');
  handler();

  it('THEN: It copies the git command that deletes all git branches except the "main" branch.', () => {
    expect(spy).toBeCalledWith(gitCommand);
  });
  it('THEN: it notifies the user that the command has been copied.', ()=>{
    expect(derived.logGreenBox).toBeCalledWith(successMsg);
  });
});
