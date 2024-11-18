import { execSync } from 'child_process';

import { getModifiedFiles } from '../getModifiedFiles';
import { Mock } from 'vitest';

vi.mock('child_process', () => ({
  execSync: vi.fn()
}));

describe('getModifiedFiles', () => {
  it('should return an array of modified files', () => {
    const mockResult = 'file1.ts\nfile2.ts\nfile3.ts\n';
    (execSync as Mock).mockReturnValueOnce(mockResult);

    const result = getModifiedFiles();

    expect(execSync).toHaveBeenCalledWith('git diff --name-only');
    expect(result).toEqual(['file1.ts', 'file2.ts', 'file3.ts']);
  });

  it('should return an empty array if no files are modified', () => {
    const mockResult = '';
    (execSync as Mock).mockReturnValueOnce(mockResult);

    const result = getModifiedFiles();

    expect(execSync).toHaveBeenCalledWith('git diff --name-only');
    expect(result).toEqual([]);
  });

  it('should handle errors and return an empty array', () => {
    const mockError = new Error('Command failed');
    (execSync as Mock).mockImplementationOnce(() => {
      throw mockError;
    });

    const consoleErrorMock = vi.spyOn(console, 'error');
    consoleErrorMock.mockImplementation(() => {});

    const result = getModifiedFiles();

    expect(execSync).toHaveBeenCalledWith('git diff --name-only');
    expect(consoleErrorMock).toHaveBeenCalledWith('Error getting modified files:', mockError);
    expect(result).toEqual([]);
  });
});
