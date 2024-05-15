import { dangerLockfileUpdate } from '../index.ts';

declare const global: any;

describe('dangerLockfileUpdate', () => {
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

  it('should not execute any message if `package.json` and package lock files are not updated (npm)', () => {
    global.danger = {
      git: { modified_files: ['src/index.ts'] }
    };
    dangerLockfileUpdate('npm');
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should not execute any message if `package.json` and package lock files are not updated (yarn)', () => {
    global.danger = {
      git: { modified_files: ['src/index.ts'] }
    };
    dangerLockfileUpdate('yarn');
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should not execute any message if `package.json` and package lock files are not updated (pnpm)', () => {
    global.danger = {
      git: { modified_files: ['src/index.ts'] }
    };
    dangerLockfileUpdate('pnpm');
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should not execute any message if `package.json` and package lock files are updated (rush)', () => {
    global.danger = {
      git: { modified_files: ['src/index.ts'] }
    };
    dangerLockfileUpdate('rush');
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).not.toHaveBeenCalled();
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute info message if `package.json` is updated but package lock file is not (npm)', () => {
    global.danger = {
      git: { modified_files: ['package.json', 'yarn.lock', 'pnpm-lock.yaml'] }
    };
    dangerLockfileUpdate('npm');
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).toHaveBeenCalledTimes(1);
    expect(global.info).toHaveBeenCalledWith(
      `Changes were made to package.json, but not to package-lock.json. - <i>Perhaps you need to install/update dependencies?</i>`
    );
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute info message if `package.json` is updated but package lock file is not (yarn)', () => {
    global.danger = {
      git: { modified_files: ['package.json', 'package-lock.json', 'pnpm-lock.yaml'] }
    };
    dangerLockfileUpdate('yarn');
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).toHaveBeenCalledTimes(1);
    expect(global.info).toHaveBeenCalledWith(
      `Changes were made to package.json, but not to yarn.lock. - <i>Perhaps you need to install/update dependencies?</i>`
    );
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute info message if `package.json` is updated but package lock file is not (pnpm)', () => {
    global.danger = {
      git: { modified_files: ['package.json', 'yarn.lock', 'package-lock.json'] }
    };
    dangerLockfileUpdate('pnpm');
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).toHaveBeenCalledTimes(1);
    expect(global.info).toHaveBeenCalledWith(
      `Changes were made to package.json, but not to pnpm-lock.yaml. - <i>Perhaps you need to install/update dependencies?</i>`
    );
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute info message if `package.json` is updated but package lock file is not (rush)', () => {
    global.danger = {
      git: { modified_files: ['package.json', 'yarn.lock', 'package-lock.json'] }
    };
    dangerLockfileUpdate('rush');
    expect(global.warn).not.toHaveBeenCalled();
    expect(global.info).toHaveBeenCalledTimes(1);
    expect(global.info).toHaveBeenCalledWith(
      `Changes were made to package.json, but not to pnpm-lock.yaml. - <i>Perhaps you need to install/update dependencies?</i>`
    );
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute warn message if package lock file is updated but `package.json` is not (npm)', () => {
    global.danger = {
      git: { modified_files: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'] }
    };
    dangerLockfileUpdate('npm');
    expect(global.info).not.toHaveBeenCalled();
    expect(global.warn).toHaveBeenCalledTimes(1);
    expect(global.warn).toHaveBeenCalledWith(
      `Changes were made to package-lock.json, but not to package.json. - <i>Perhaps you use not strict package versions and it may break your app</i>`
    );
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute warn message if package lock file is updated but `package.json` is not (yarn)', () => {
    global.danger = {
      git: { modified_files: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'] }
    };
    dangerLockfileUpdate('yarn');
    expect(global.info).not.toHaveBeenCalled();
    expect(global.warn).toHaveBeenCalledTimes(1);
    expect(global.warn).toHaveBeenCalledWith(
      `Changes were made to yarn.lock, but not to package.json. - <i>Perhaps you use not strict package versions and it may break your app</i>`
    );
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute warn message if package lock file is updated but `package.json` is not (pnpm)', () => {
    global.danger = {
      git: { modified_files: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'] }
    };
    dangerLockfileUpdate('pnpm');
    expect(global.info).not.toHaveBeenCalled();
    expect(global.warn).toHaveBeenCalledTimes(1);
    expect(global.warn).toHaveBeenCalledWith(
      `Changes were made to pnpm-lock.yaml, but not to package.json. - <i>Perhaps you use not strict package versions and it may break your app</i>`
    );
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });

  it('should execute warn message if package lock file is updated but `package.json` is not (rush)', () => {
    global.danger = {
      git: { modified_files: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'] }
    };
    dangerLockfileUpdate('rush');
    expect(global.info).not.toHaveBeenCalled();
    expect(global.warn).toHaveBeenCalledTimes(1);
    expect(global.warn).toHaveBeenCalledWith(
      `Changes were made to pnpm-lock.yaml, but not to package.json. - <i>Perhaps you use not strict package versions and it may break your app</i>`
    );
    expect(global.fail).not.toHaveBeenCalled();
    expect(global.markdown).not.toHaveBeenCalled();
  });
});
