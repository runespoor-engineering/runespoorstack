import path from 'node:path';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ERRORS } from '../../../../constants/errorMessages';
import { ESLINT_DISABLE_FILES } from '../../../../constants/eslint';
import * as readFileStreamModule from '../../../fs/readFileStream/readFileStream';
import { eslintCheckFilePaths } from '../eslintCheckFilePaths';

vi.mock('node:path');
vi.mock('../../../fs/readFileStream/readFileStream');

describe('eslintCheckFilePaths', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should resolve when no files to check', async () => {
    expect.hasAssertions();

    await expect(eslintCheckFilePaths()).resolves.toBeUndefined();
    await expect(eslintCheckFilePaths({ filePathsToCheck: [] })).resolves.toBeUndefined();
  });

  it('should resolve when files do not contain eslint-disable comment', async () => {
    expect.hasAssertions();

    const mockFiles = ['file1.ts', 'file2.ts'];
    const mockContent = 'export const test = true;';

    vi.mocked(path.resolve).mockReturnValue('./file1.ts');
    vi.spyOn(readFileStreamModule, 'readFileStream').mockImplementation((_, callback) => {
      callback(null, mockContent);
    });

    await expect(eslintCheckFilePaths({ filePathsToCheck: mockFiles })).resolves.toBeUndefined();
  });

  it('should reject when files contain eslint-disable comment', async () => {
    expect.hasAssertions();

    const mockFiles = ['file1.ts'];
    const mockContent = `${ESLINT_DISABLE_FILES}\nexport const test = true;`;

    vi.mocked(path.resolve).mockReturnValue('/absolute/path/file1.ts');
    vi.spyOn(readFileStreamModule, 'readFileStream').mockImplementation((_, callback) => {
      callback(null, mockContent);
    });

    await expect(eslintCheckFilePaths({ filePathsToCheck: mockFiles })).rejects.toThrow(
      ERRORS.eslintDisableFoundError('/absolute/path/file1.ts')
    );
  });

  it('should handle files with only eslint-disable comment and whitespace', async () => {
    expect.hasAssertions();

    const mockFiles = ['file1.ts'];
    const mockContent = `  ${ESLINT_DISABLE_FILES}  \n\nexport const test = true;`;

    vi.mocked(path.resolve).mockReturnValue('/absolute/path/file1.ts');
    vi.spyOn(readFileStreamModule, 'readFileStream').mockImplementation((_, callback) => {
      callback(null, mockContent);
    });

    await expect(eslintCheckFilePaths({ filePathsToCheck: mockFiles })).rejects.toThrow(
      ERRORS.eslintDisableFoundError('/absolute/path/file1.ts')
    );
  });

  it('should handle read file errors', async () => {
    expect.hasAssertions();

    const mockFiles = ['file1.ts'];
    const mockError = new Error('Read error');

    vi.mocked(path.resolve).mockReturnValue('/absolute/path/file1.ts');
    vi.spyOn(readFileStreamModule, 'readFileStream').mockImplementation((_, callback) => {
      callback(mockError, null);
    });

    await expect(eslintCheckFilePaths({ filePathsToCheck: mockFiles })).rejects.toThrow(
      ERRORS.readFileError('/absolute/path/file1.ts')
    );
  });

  it('should handle multiple files with mixed results', async () => {
    expect.hasAssertions();

    const mockFiles = ['file1.ts', 'file2.ts', 'file3.ts'];
    const cleanContent = 'export const test = true;';
    const eslintDisableContent = `${ESLINT_DISABLE_FILES}\nexport const test = true;`;

    vi.mocked(path.resolve)
      .mockReturnValueOnce('/absolute/path/file1.ts')
      .mockReturnValueOnce('/absolute/path/file2.ts')
      .mockReturnValueOnce('/absolute/path/file3.ts');

    vi.spyOn(readFileStreamModule, 'readFileStream').mockImplementation((filePath, callback) => {
      if (filePath === '/absolute/path/file1.ts') {
        callback(null, cleanContent);
      } else if (filePath === '/absolute/path/file2.ts') {
        callback(null, eslintDisableContent);
      } else {
        callback(null, eslintDisableContent);
      }
    });

    const expectedError = [
      ERRORS.eslintDisableFoundError('/absolute/path/file2.ts'),
      ERRORS.eslintDisableFoundError('/absolute/path/file3.ts')
    ].join('\n');

    await expect(eslintCheckFilePaths({ filePathsToCheck: mockFiles })).rejects.toThrow(
      expectedError
    );
  });

  it('should handle multiple files with mixed errors (read errors and eslint-disable)', async () => {
    expect.hasAssertions();

    const mockFiles = ['file1.ts', 'file2.ts'];
    const mockError = new Error('Read error');
    const eslintDisableContent = `${ESLINT_DISABLE_FILES}\nexport const test = true;`;

    vi.mocked(path.resolve)
      .mockReturnValueOnce('/absolute/path/file1.ts')
      .mockReturnValueOnce('/absolute/path/file2.ts');

    vi.spyOn(readFileStreamModule, 'readFileStream').mockImplementation((filePath, callback) => {
      if (filePath === '/absolute/path/file1.ts') {
        callback(mockError, null);
      } else {
        callback(null, eslintDisableContent);
      }
    });

    const expectedError = [
      ERRORS.readFileError('/absolute/path/file1.ts'),
      ERRORS.eslintDisableFoundError('/absolute/path/file2.ts')
    ].join('\n');

    await expect(eslintCheckFilePaths({ filePathsToCheck: mockFiles })).rejects.toThrow(
      expectedError
    );
  });

  it('should handle empty file content', async () => {
    expect.hasAssertions();

    const mockFiles = ['file1.ts'];

    vi.mocked(path.resolve).mockReturnValue('/absolute/path/file1.ts');
    vi.spyOn(readFileStreamModule, 'readFileStream').mockImplementation((_, callback) => {
      callback(null, '');
    });

    await expect(eslintCheckFilePaths({ filePathsToCheck: mockFiles })).resolves.toBeUndefined();
  });

  it('should handle null file content', async () => {
    expect.hasAssertions();

    const mockFiles = ['file1.ts'];

    vi.mocked(path.resolve).mockReturnValue('/absolute/path/file1.ts');
    vi.spyOn(readFileStreamModule, 'readFileStream').mockImplementation((_, callback) => {
      callback(null, null);
    });

    await expect(eslintCheckFilePaths({ filePathsToCheck: mockFiles })).resolves.toBeUndefined();
  });

  it('should resolve absolute paths for files', async () => {
    expect.hasAssertions();

    const mockFiles = ['./relative/file1.ts', '../parent/file2.ts'];
    const mockContent = 'export const test = true;';

    vi.mocked(path.resolve)
      .mockReturnValueOnce('/absolute/path/relative/file1.ts')
      .mockReturnValueOnce('/absolute/path/parent/file2.ts');

    vi.spyOn(readFileStreamModule, 'readFileStream').mockImplementation((_, callback) => {
      callback(null, mockContent);
    });

    await expect(eslintCheckFilePaths({ filePathsToCheck: mockFiles })).resolves.toBeUndefined();

    expect(path.resolve).toHaveBeenCalledWith('./relative/file1.ts');
    expect(path.resolve).toHaveBeenCalledWith('../parent/file2.ts');
  });
});
