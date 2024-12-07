import { execSync } from 'child_process';
import { Mock } from 'vitest';

import { getModifiedFiles } from '../getModifiedFiles';

vi.mock('child_process', () => ({
  execSync: vi.fn()
}));

describe('getModifiedFiles', () => {
  it('should return an array of modified files', () => {
    expect.hasAssertions();
    const mockResult = 'file1.ts\nfile2.ts\nfile3.ts\n';
    (execSync as Mock).mockReturnValueOnce(mockResult);

    const result = getModifiedFiles();

    expect(execSync).toHaveBeenCalledWith('git diff --name-only');
    expect(result).toStrictEqual(['file1.ts', 'file2.ts', 'file3.ts']);
  });

  it('should return an empty array if no files are modified', () => {
    expect.hasAssertions();
    const mockResult = '';
    (execSync as Mock).mockReturnValueOnce(mockResult);

    const result = getModifiedFiles();

    expect(execSync).toHaveBeenCalledWith('git diff --name-only');
    expect(result).toStrictEqual([]);
  });

  it('should handle errors and return an empty array', () => {
    expect.hasAssertions();
    const mockError = new Error('Command failed');
    (execSync as Mock).mockImplementationOnce(() => {
      throw mockError;
    });

    const consoleErrorMock = vi.spyOn(console, 'error');
    consoleErrorMock.mockImplementation(() => {});

    const result = getModifiedFiles();

    expect(execSync).toHaveBeenCalledWith('git diff --name-only');
    expect(consoleErrorMock).toHaveBeenCalledWith('Error getting modified files:', mockError);
    expect(result).toStrictEqual([]);
  });
});
