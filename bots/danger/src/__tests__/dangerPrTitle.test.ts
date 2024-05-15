import { dangerPrTitle } from '../index.ts';

declare const global: any;

describe('dangerPrTitle', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.info = jest.fn();
    global.fail = jest.fn();
    global.markdown = jest.fn();
  });

  afterEach(() => {
    global.warn = undefined;
    global.info = undefined;
    global.fail = undefined;
    global.markdown = undefined;
  });

  it('should not execute any message if pr `title` matches the provided `titleRegex`', () => {
    global.danger = {
      github: { pr: { title: '[RUNESPOOR-777] Implement Danger' } }
    };
    dangerPrTitle(/\[RUNESPOOR-[0-9]+\]./);
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute `warn` message if pr `title` does not match the provided `titleRegex`', () => {
    global.danger = {
      github: { pr: { title: '[OOPS-777] Implement Danger' } }
    };
    dangerPrTitle(/\[RUNESPOOR-[0-9]+\]./);
    expect(global.warn).toHaveBeenCalledTimes(1);
    expect(global.warn).toHaveBeenCalledWith(
      `:exclamation: PR title does not match the pattern: ${/\[RUNESPOOR-[0-9]+\]./}`
    );
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });
});
