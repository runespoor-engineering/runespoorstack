import fs from 'fs';
import path from 'path';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getDeepFilesFromDir } from '../getDeepFilesFromDir';

vi.mock('fs', () => ({
  default: {
    readdirSync: vi.fn(),
    statSync: vi.fn()
  }
}));

vi.mock('path', () => ({
  default: {
    join: vi.fn()
  }
}));

describe('getDeepFilesFromDir', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return matching files from a directory', () => {
    expect.hasAssertions();
    const mockFiles = ['file1.txt', 'file2.js', 'file3.ts'];
    const mockStats = { isDirectory: () => false };

    vi.mocked(fs.readdirSync).mockReturnValue(mockFiles as any);
    vi.mocked(fs.statSync).mockReturnValue(mockStats as any);
    vi.mocked(path.join).mockImplementation((dir, file) => `${dir}/${file}`);

    const dir = '/test/dir';
    const filesRegex = [/\.ts$/];

    const result = getDeepFilesFromDir(dir, filesRegex);

    expect(result).toStrictEqual(['/test/dir/file3.ts']);
    expect(fs.readdirSync).toHaveBeenCalledWith(dir);
  });

  it('should recursively search in subdirectories', () => {
    expect.hasAssertions();
    const mockFiles = ['file1.txt', 'subdir'];
    const mockSubdirFiles = ['file2.ts'];

    const mockDirStats = { isDirectory: () => true };
    const mockFileStats = { isDirectory: () => false };

    vi.mocked(fs.readdirSync)
      .mockReturnValueOnce(mockFiles as any)
      .mockReturnValueOnce(mockSubdirFiles as any);

    vi.mocked(fs.statSync)
      .mockReturnValueOnce(mockFileStats as any)
      .mockReturnValueOnce(mockDirStats as any)
      .mockReturnValueOnce(mockFileStats as any);

    vi.mocked(path.join).mockImplementation((dir, file) => `${dir}/${file}`);

    const dir = '/test/dir';
    const filesRegex = [/\.ts$/];

    const result = getDeepFilesFromDir(dir, filesRegex);

    expect(result).toStrictEqual(['/test/dir/subdir/file2.ts']);
    expect(fs.readdirSync).toHaveBeenCalledTimes(2);
  });

  it('should match files against multiple regex patterns', () => {
    expect.hasAssertions();
    const mockFiles = ['file1.js', 'file2.ts', 'file3.jsx'];
    const mockStats = { isDirectory: () => false };

    vi.mocked(fs.readdirSync).mockReturnValue(mockFiles as any);
    vi.mocked(fs.statSync).mockReturnValue(mockStats as any);
    vi.mocked(path.join).mockImplementation((dir, file) => `${dir}/${file}`);

    const dir = '/test/dir';
    const filesRegex = [/\.ts$/, /\.jsx$/];

    const result = getDeepFilesFromDir(dir, filesRegex);

    expect(result).toStrictEqual(['/test/dir/file2.ts', '/test/dir/file3.jsx']);
  });
});
