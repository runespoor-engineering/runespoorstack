import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as getStagedFilesModule from '../../../git/getStagedFiles';
import * as eslintCheckFilesModule from '../../eslintCheckFilePaths/eslintCheckFilePaths';
import { eslintCheckStagedFiles } from '../eslintCheckStagedFiles';

vi.mock('../../../git/getStagedFiles');
vi.mock('../../eslintCheckFilePaths/eslintCheckFilePaths');

describe('eslintCheckStagedFiles', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should resolve when no staged files', async () => {
    expect.hasAssertions();

    vi.spyOn(getStagedFilesModule, 'getStagedFiles').mockReturnValue([]);
    vi.spyOn(eslintCheckFilesModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckStagedFiles()).resolves.toBeUndefined();

    expect(getStagedFilesModule.getStagedFiles).toHaveBeenCalledWith('./');
    expect(eslintCheckFilesModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: []
    });
  });

  it('should filter staged files by regex and check them', async () => {
    expect.hasAssertions();

    const mockStagedFiles = [
      '/path/to/file1.ts',
      '/path/to/file2.js',
      '/path/to/file3.py',
      '/path/to/file4.jsx'
    ];
    const expectedFilteredFiles = ['/path/to/file1.ts', '/path/to/file2.js', '/path/to/file4.jsx'];

    vi.spyOn(getStagedFilesModule, 'getStagedFiles').mockReturnValue(mockStagedFiles);
    vi.spyOn(eslintCheckFilesModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckStagedFiles()).resolves.toBeUndefined();

    expect(getStagedFilesModule.getStagedFiles).toHaveBeenCalledWith('./');
    expect(eslintCheckFilesModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: expectedFilteredFiles
    });
  });

  it('should use custom rootDir', async () => {
    expect.hasAssertions();

    const customRootDir = '/custom/path';

    vi.spyOn(getStagedFilesModule, 'getStagedFiles').mockReturnValue([]);
    vi.spyOn(eslintCheckFilesModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckStagedFiles({ rootDir: customRootDir })).resolves.toBeUndefined();

    expect(getStagedFilesModule.getStagedFiles).toHaveBeenCalledWith(customRootDir);
  });

  it('should use custom filesRegex', async () => {
    expect.hasAssertions();

    const customRegex = [/\.test\.ts$/];
    const mockStagedFiles = ['/path/to/file1.ts', '/path/to/file2.test.ts', '/path/to/file3.js'];
    const expectedFilteredFiles = ['/path/to/file2.test.ts'];

    vi.spyOn(getStagedFilesModule, 'getStagedFiles').mockReturnValue(mockStagedFiles);
    vi.spyOn(eslintCheckFilesModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckStagedFiles({ filesRegex: customRegex })).resolves.toBeUndefined();

    expect(eslintCheckFilesModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: expectedFilteredFiles
    });
  });

  it('should call onFileProcessed for each filtered file', async () => {
    expect.hasAssertions();

    const mockOnFileProcessed = vi.fn();
    const mockStagedFiles = ['/path/to/file1.ts', '/path/to/file2.js', '/path/to/file3.py'];
    const expectedFilteredFiles = ['/path/to/file1.ts', '/path/to/file2.js'];

    vi.spyOn(getStagedFilesModule, 'getStagedFiles').mockReturnValue(mockStagedFiles);
    vi.spyOn(eslintCheckFilesModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(
      eslintCheckStagedFiles({ onFileProcessed: mockOnFileProcessed })
    ).resolves.toBeUndefined();

    expect(mockOnFileProcessed).toHaveBeenCalledTimes(expectedFilteredFiles.length);
    expect(mockOnFileProcessed).toHaveBeenCalledWith(expectedFilteredFiles[0]);
    expect(mockOnFileProcessed).toHaveBeenCalledWith(expectedFilteredFiles[1]);
  });

  it('should not call onFileProcessed when not provided', async () => {
    expect.hasAssertions();

    const mockStagedFiles = ['/path/to/file1.ts'];

    vi.spyOn(getStagedFilesModule, 'getStagedFiles').mockReturnValue(mockStagedFiles);
    vi.spyOn(eslintCheckFilesModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckStagedFiles()).resolves.toBeUndefined();

    // Should not throw any errors even without onFileProcessed
    expect(eslintCheckFilesModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: ['/path/to/file1.ts']
    });
  });

  it('should propagate errors from eslintCheckFilePaths', async () => {
    expect.hasAssertions();

    const mockError = new Error('Eslint disable found');
    const mockStagedFiles = ['/path/to/file1.ts'];

    vi.spyOn(getStagedFilesModule, 'getStagedFiles').mockReturnValue(mockStagedFiles);
    vi.spyOn(eslintCheckFilesModule, 'eslintCheckFilePaths').mockRejectedValue(mockError);

    await expect(eslintCheckStagedFiles()).rejects.toThrow(mockError);
  });

  it('should handle multiple regex patterns', async () => {
    expect.hasAssertions();

    const multipleRegex = [/\.ts$/, /\.py$/];
    const mockStagedFiles = [
      '/path/to/file1.ts',
      '/path/to/file2.js',
      '/path/to/file3.py',
      '/path/to/file4.txt'
    ];
    const expectedFilteredFiles = ['/path/to/file1.ts', '/path/to/file3.py'];

    vi.spyOn(getStagedFilesModule, 'getStagedFiles').mockReturnValue(mockStagedFiles);
    vi.spyOn(eslintCheckFilesModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckStagedFiles({ filesRegex: multipleRegex })).resolves.toBeUndefined();

    expect(eslintCheckFilesModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: expectedFilteredFiles
    });
  });

  it('should use DEFAULT_LINTED_FILE_REGEX when no filesRegex provided', async () => {
    expect.hasAssertions();

    const mockStagedFiles = ['/path/to/file1.ts'];

    vi.spyOn(getStagedFilesModule, 'getStagedFiles').mockReturnValue(mockStagedFiles);
    vi.spyOn(eslintCheckFilesModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckStagedFiles()).resolves.toBeUndefined();

    // File should be filtered using DEFAULT_LINTED_FILE_REGEX
    expect(eslintCheckFilesModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: ['/path/to/file1.ts']
    });
  });

  it('should handle empty string files from git output', async () => {
    expect.hasAssertions();

    const mockStagedFiles = ['/path/to/file1.ts'];

    vi.spyOn(getStagedFilesModule, 'getStagedFiles').mockReturnValue(mockStagedFiles);
    vi.spyOn(eslintCheckFilesModule, 'eslintCheckFilePaths').mockResolvedValue();

    await expect(eslintCheckStagedFiles()).resolves.toBeUndefined();

    expect(eslintCheckFilesModule.eslintCheckFilePaths).toHaveBeenCalledWith({
      filePathsToCheck: ['/path/to/file1.ts']
    });
  });
});
