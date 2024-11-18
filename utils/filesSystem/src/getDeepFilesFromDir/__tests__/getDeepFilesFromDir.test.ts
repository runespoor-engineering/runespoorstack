import fs from 'node:fs';

import { getDeepFilesFromDir } from '../getDeepFilesFromDir';

describe('getDeepFilesFromDir', () => {
  const mockReaddirSync = vi.spyOn(fs, 'readdirSync');
  const mockStatSync = vi.spyOn(fs, 'statSync');

  beforeEach(() => {
    mockReaddirSync.mockClear();
    mockStatSync.mockClear();
  });

  it('should return an empty array if the provided `dir` is empty', () => {
    expect.hasAssertions();
    mockReaddirSync.mockReturnValueOnce([]);

    const result = getDeepFilesFromDir('/path/to/empty/dir', /test\.js$/);

    expect(result).toStrictEqual([]);
    expect(mockReaddirSync).toHaveBeenCalledWith('/path/to/empty/dir');
  });

  it('should return an array of file paths that match the provided `pattern`', () => {
    expect.hasAssertions();
    mockReaddirSync.mockReturnValueOnce([
      'file1.js',
      'file2.txt',
      'file3.test.js'
    ] as unknown as fs.Dirent[]);
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false } as fs.Stats);
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false } as fs.Stats);
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false } as fs.Stats);

    const result = getDeepFilesFromDir('/path/to/dir', /\.test\.js$/, []);

    expect(result).toStrictEqual(['/path/to/dir/file3.test.js']);
    expect(mockReaddirSync).toHaveBeenCalledWith('/path/to/dir');
    expect(mockStatSync).toHaveBeenCalledTimes(3);
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/dir/file1.js');
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/dir/file2.txt');
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/dir/file3.test.js');
  });

  it('should recursively search directories and return an array of file paths that match the provided `pattern`', () => {
    expect.hasAssertions();
    mockReaddirSync.mockReturnValueOnce(['dir1', 'file1.js'] as unknown as fs.Dirent[]);
    mockReaddirSync.mockReturnValueOnce(['file2.txt', 'file3.test.js'] as unknown as fs.Dirent[]);
    mockStatSync.mockReturnValueOnce({ isDirectory: () => true } as fs.Stats);
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false } as fs.Stats);
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false } as fs.Stats);
    mockStatSync.mockReturnValueOnce({ isDirectory: () => false } as fs.Stats);

    const result = getDeepFilesFromDir('/path/to/root', /\.test\.js$/, []);

    expect(result).toStrictEqual(['/path/to/root/dir1/file3.test.js']);
    expect(mockReaddirSync).toHaveBeenCalledTimes(2);
    expect(mockReaddirSync).toHaveBeenCalledWith('/path/to/root');
    expect(mockReaddirSync).toHaveBeenCalledWith('/path/to/root/dir1');
    expect(mockStatSync).toHaveBeenCalledTimes(4);
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/root/file1.js');
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/root/dir1');
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/root/dir1/file2.txt');
    expect(mockStatSync).toHaveBeenCalledWith('/path/to/root/dir1/file3.test.js');
  });
});
