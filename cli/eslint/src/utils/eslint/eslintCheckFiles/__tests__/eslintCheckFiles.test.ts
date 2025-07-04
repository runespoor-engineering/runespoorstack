import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DEFAULT_LINTED_FILE_REGEX } from '../../../../constants/regex';
import * as getDeepFilesFromDirModule from '../../../fs/getDeepFilesFromDir/getDeepFilesFromDir';
import * as eslintCheckFilePathsModule from '../../eslintCheckFilePaths/eslintCheckFilePaths';
import { eslintCheckFiles } from '../eslintCheckFiles';

vi.mock('../../../fs/getDeepFilesFromDir/getDeepFilesFromDir');
vi.mock('../../eslintCheckFilePaths/eslintCheckFilePaths');

describe('eslintCheckFiles', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should resolve when no files found', async () => {
    expect.hasAssertions();

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue([]);
    vi.spyOn(eslintCheckFilePathsModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckFiles()).resolves.toBeUndefined();

    expect(getDeepFilesFromDirModule.getDeepFilesFromDir).toHaveBeenCalledWith('./', [
      DEFAULT_LINTED_FILE_REGEX
    ]);
    expect(eslintCheckFilePathsModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: []
    });
  });

  it('should find files and check them', async () => {
    expect.hasAssertions();

    const mockFiles = ['/path/to/file1.ts', '/path/to/file2.js'];

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.spyOn(eslintCheckFilePathsModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckFiles()).resolves.toBeUndefined();

    expect(getDeepFilesFromDirModule.getDeepFilesFromDir).toHaveBeenCalledWith('./', [
      DEFAULT_LINTED_FILE_REGEX
    ]);
    expect(eslintCheckFilePathsModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: mockFiles
    });
  });

  it('should use custom rootDir', async () => {
    expect.hasAssertions();

    const customRootDir = '/custom/path';
    const mockFiles = ['/custom/path/file1.ts'];

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.spyOn(eslintCheckFilePathsModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckFiles({ rootDir: customRootDir })).resolves.toBeUndefined();

    expect(getDeepFilesFromDirModule.getDeepFilesFromDir).toHaveBeenCalledWith(customRootDir, [
      DEFAULT_LINTED_FILE_REGEX
    ]);
    expect(eslintCheckFilePathsModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: mockFiles
    });
  });

  it('should use custom filesRegex', async () => {
    expect.hasAssertions();

    const customRegex = [/\.test\.ts$/];
    const mockFiles = ['/path/to/file1.test.ts'];

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.spyOn(eslintCheckFilePathsModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckFiles({ filesRegex: customRegex })).resolves.toBeUndefined();

    expect(getDeepFilesFromDirModule.getDeepFilesFromDir).toHaveBeenCalledWith('./', customRegex);
    expect(eslintCheckFilePathsModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: mockFiles
    });
  });

  it('should use both custom rootDir and filesRegex', async () => {
    expect.hasAssertions();

    const customRootDir = '/custom/path';
    const customRegex = [/\.ts$/, /\.js$/];
    const mockFiles = ['/custom/path/file1.ts', '/custom/path/file2.js'];

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.spyOn(eslintCheckFilePathsModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(
      eslintCheckFiles({ rootDir: customRootDir, filesRegex: customRegex })
    ).resolves.toBeUndefined();

    expect(getDeepFilesFromDirModule.getDeepFilesFromDir).toHaveBeenCalledWith(
      customRootDir,
      customRegex
    );
    expect(eslintCheckFilePathsModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: mockFiles
    });
  });

  it('should propagate errors from eslintCheckFilePaths', async () => {
    expect.hasAssertions();

    const mockError = new Error('Eslint disable found');
    const mockFiles = ['/path/to/file1.ts'];

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.spyOn(eslintCheckFilePathsModule, 'eslintCheckFilePaths').mockRejectedValue(mockError);

    await expect(eslintCheckFiles()).rejects.toThrow(mockError);
  });

  it('should handle multiple regex patterns', async () => {
    expect.hasAssertions();

    const multipleRegex = [/\.ts$/, /\.py$/];
    const mockFiles = ['/path/to/file1.ts', '/path/to/file2.py'];

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.spyOn(eslintCheckFilePathsModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckFiles({ filesRegex: multipleRegex })).resolves.toBeUndefined();

    expect(getDeepFilesFromDirModule.getDeepFilesFromDir).toHaveBeenCalledWith('./', multipleRegex);
    expect(eslintCheckFilePathsModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: mockFiles
    });
  });

  it('should use DEFAULT_LINTED_FILE_REGEX when no filesRegex provided', async () => {
    expect.hasAssertions();

    const mockFiles = ['/path/to/file1.ts'];

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.spyOn(eslintCheckFilePathsModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckFiles()).resolves.toBeUndefined();

    expect(getDeepFilesFromDirModule.getDeepFilesFromDir).toHaveBeenCalledWith('./', [
      DEFAULT_LINTED_FILE_REGEX
    ]);
  });

  it('should handle empty results from getDeepFilesFromDir', async () => {
    expect.hasAssertions();

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue([]);
    vi.spyOn(eslintCheckFilePathsModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckFiles({ rootDir: '/empty/dir' })).resolves.toBeUndefined();

    expect(eslintCheckFilePathsModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: []
    });
  });
});
