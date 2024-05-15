import { dangerReviewers } from '../index.ts';

declare const global: any;

describe('dangerReviewers', () => {
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

  it('should not execute any message if pr `requested_reviewers` count is grater than or equal to provided `requiredReviewersCount`', () => {
    global.danger = {
      github: { requested_reviewers: { users: [{ id: '777' }] } }
    };
    dangerReviewers(1);
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute `fail` message if pr `requested_reviewers` count is less than provided `requiredReviewersCount`', () => {
    global.danger = {
      github: { requested_reviewers: { users: [{ id: '777' }] } }
    };
    dangerReviewers(2);
    expect(global.fail).toHaveBeenCalledTimes(1);
    expect(global.fail).toHaveBeenCalledWith(`:exclamation: Please request at least 2 reviewers.`);
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });
});
