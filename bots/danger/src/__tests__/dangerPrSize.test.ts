import { dangerPrSize } from '../index.ts';

declare const global: any;

describe('dangerPrSize', () => {
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

  it('should not execute any message if pr `additions` and `deletions` are less than or equal to default 600 `maxPrThreshold`', () => {
    global.danger = {
      github: { pr: { additions: 599, deletions: 1 } }
    };
    dangerPrSize();
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should not execute any message if pr `additions` and `deletions` are less or equal to provided `maxPrThreshold`', () => {
    global.danger = {
      github: { pr: { additions: 299, deletions: 1 } }
    };
    dangerPrSize(300);
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute `warn` message if pr `additions` and `deletions` are grater than default 600 `maxPrThreshold`', () => {
    global.danger = {
      github: { pr: { additions: 600, deletions: 1 } }
    };
    dangerPrSize();
    expect(global.warn).toHaveBeenCalledTimes(1);
    expect(global.warn).toHaveBeenCalledWith(
      ':exclamation: Big PR size. Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR. It will improve the CI process.'
    );
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute `warn` message if pr `additions` and `deletions` are grater than provided `maxPrThreshold`', () => {
    global.danger = {
      github: { pr: { additions: 300, deletions: 1 } }
    };
    dangerPrSize(300);
    expect(global.warn).toHaveBeenCalledTimes(1);
    expect(global.warn).toHaveBeenCalledWith(
      ':exclamation: Big PR size. Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR. It will improve the CI process.'
    );
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });
});
