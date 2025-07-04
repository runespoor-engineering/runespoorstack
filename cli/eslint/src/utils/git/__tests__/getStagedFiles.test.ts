import { execSync } from 'node:child_process';
import path from 'node:path';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getStagedFiles } from '../getStagedFiles';

vi.mock('node:child_process');
vi.mock('node:path');

describe('getStagedFiles', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return staged files as absolute paths', () => {
    expect.hasAssertions();

    const mockGitOutput = 'src/file1.ts\nsrc/file2.js\nutils/file3.tsx';
    const mockRootDir = '/project/root';

    vi.mocked(execSync).mockReturnValue(mockGitOutput);
    vi.mocked(path.resolve)
      .mockReturnValueOnce(mockRootDir)
      .mockReturnValueOnce('/project/root/src/file1.ts')
      .mockReturnValueOnce('/project/root/src/file2.js')
      .mockReturnValueOnce('/project/root/utils/file3.tsx');

    const result = getStagedFiles('./');

    expect(execSync).toHaveBeenCalledWith('git diff --cached --name-only --diff-filter=ACMR', {
      cwd: mockRootDir,
      encoding: 'utf8'
    });

    expect(result).toStrictEqual([
      '/project/root/src/file1.ts',
      '/project/root/src/file2.js',
      '/project/root/utils/file3.tsx'
    ]);
  });

  it('should use custom rootDir', () => {
    expect.hasAssertions();

    const customRootDir = '/custom/path';
    const mockGitOutput = 'file1.ts';

    vi.mocked(execSync).mockReturnValue(mockGitOutput);
    vi.mocked(path.resolve)
      .mockReturnValueOnce(customRootDir)
      .mockReturnValueOnce('/custom/path/file1.ts');

    const result = getStagedFiles(customRootDir);

    expect(execSync).toHaveBeenCalledWith('git diff --cached --name-only --diff-filter=ACMR', {
      cwd: customRootDir,
      encoding: 'utf8'
    });

    expect(result).toStrictEqual(['/custom/path/file1.ts']);
  });

  it('should return empty array when no staged files', () => {
    expect.hasAssertions();

    const mockGitOutput = '';
    const mockRootDir = '/project/root';

    vi.mocked(execSync).mockReturnValue(mockGitOutput);
    vi.mocked(path.resolve).mockReturnValue(mockRootDir);

    const result = getStagedFiles('./');

    expect(result).toStrictEqual([]);
  });

  it('should handle git output with trailing newlines', () => {
    expect.hasAssertions();

    const mockGitOutput = 'src/file1.ts\nsrc/file2.js\n\n';
    const mockRootDir = '/project/root';

    vi.mocked(execSync).mockReturnValue(mockGitOutput);
    vi.mocked(path.resolve)
      .mockReturnValueOnce(mockRootDir)
      .mockReturnValueOnce('/project/root/src/file1.ts')
      .mockReturnValueOnce('/project/root/src/file2.js');

    const result = getStagedFiles('./');

    expect(result).toStrictEqual(['/project/root/src/file1.ts', '/project/root/src/file2.js']);
  });

  it('should return empty array when git command fails', () => {
    expect.hasAssertions();

    vi.mocked(execSync).mockImplementation(() => {
      throw new Error('Not a git repository');
    });

    const result = getStagedFiles('./');

    expect(result).toStrictEqual([]);
  });

  it('should filter out empty lines from git output', () => {
    expect.hasAssertions();

    const mockGitOutput = 'src/file1.ts\n\nsrc/file2.js\n\n';
    const mockRootDir = '/project/root';

    vi.mocked(execSync).mockReturnValue(mockGitOutput);
    vi.mocked(path.resolve)
      .mockReturnValueOnce(mockRootDir)
      .mockReturnValueOnce('/project/root/src/file1.ts')
      .mockReturnValueOnce('/project/root/src/file2.js');

    const result = getStagedFiles('./');

    expect(result).toStrictEqual(['/project/root/src/file1.ts', '/project/root/src/file2.js']);
  });

  it('should handle single file output', () => {
    expect.hasAssertions();

    const mockGitOutput = 'single-file.ts';
    const mockRootDir = '/project/root';

    vi.mocked(execSync).mockReturnValue(mockGitOutput);
    vi.mocked(path.resolve)
      .mockReturnValueOnce(mockRootDir)
      .mockReturnValueOnce('/project/root/single-file.ts');

    const result = getStagedFiles('./');

    expect(result).toStrictEqual(['/project/root/single-file.ts']);
  });

  it('should use default rootDir when not provided', () => {
    expect.hasAssertions();

    const mockGitOutput = 'file1.ts';
    const mockRootDir = '/default/path';

    vi.mocked(execSync).mockReturnValue(mockGitOutput);
    vi.mocked(path.resolve)
      .mockReturnValueOnce(mockRootDir)
      .mockReturnValueOnce('/default/path/file1.ts');

    const result = getStagedFiles();

    expect(execSync).toHaveBeenCalledWith('git diff --cached --name-only --diff-filter=ACMR', {
      cwd: mockRootDir,
      encoding: 'utf8'
    });

    expect(result).toStrictEqual(['/default/path/file1.ts']);
  });

  it('should handle files with spaces in names', () => {
    expect.hasAssertions();

    const mockGitOutput = 'src/file with spaces.ts\nutils/another file.js';
    const mockRootDir = '/project/root';

    vi.mocked(execSync).mockReturnValue(mockGitOutput);
    vi.mocked(path.resolve)
      .mockReturnValueOnce(mockRootDir)
      .mockReturnValueOnce('/project/root/src/file with spaces.ts')
      .mockReturnValueOnce('/project/root/utils/another file.js');

    const result = getStagedFiles('./');

    expect(result).toStrictEqual([
      '/project/root/src/file with spaces.ts',
      '/project/root/utils/another file.js'
    ]);
  });
});
