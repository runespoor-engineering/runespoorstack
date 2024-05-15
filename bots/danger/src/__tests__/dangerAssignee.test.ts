import { dangerAssignee } from '../index.ts';

declare const global: any;

describe('dangerAssignee', () => {
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

  it('should not execute any message if `assignee` is provided', () => {
    global.danger = {
      github: { pr: { title: 'My Test Title', assignee: { id: '777' } } }
    };
    dangerAssignee();
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute `warn` message if `assignee` is not provided and title does not include `WIP`', () => {
    global.danger = {
      github: { pr: { title: 'WIP: My Test Title' } }
    };
    dangerAssignee();
    expect(global.warn).toHaveBeenCalledTimes(1);
    expect(global.warn).toHaveBeenCalledWith(
      'This pull request needs an assignee, and optionally include any reviewers.'
    );
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute `fail` message if `assignee` is not provided and title includes `WIP`', () => {
    global.danger = {
      github: { pr: { title: 'My Test Title' } }
    };
    dangerAssignee();
    expect(global.fail).toHaveBeenCalledTimes(1);
    expect(global.fail).toHaveBeenCalledWith(
      'This pull request needs an assignee, and optionally include any reviewers.'
    );
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });
});
