import fs from 'node:fs';
import path from 'node:path';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ERRORS } from '../../../../constants/errorMessages';
import * as getDeepFilesFromDirModule from '../../../fs/getDeepFilesFromDir/getDeepFilesFromDir';
import { eslintDisableFiles } from '../eslintDisbaleFiles';

vi.mock('node:fs');
vi.mock('node:path');
vi.mock('../../../fs/getDeepFilesFromDir/getDeepFilesFromDir');

describe('eslintDisableFiles', () => {
  const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should add eslint-disable to files that do not have it', async () => {
    expect.hasAssertions();
    const mockFiles = ['file1.ts', 'file2.ts'];
    const mockContent = 'export const test = true;';
    const expectedContent = `/* eslint-disable */\n\n${mockContent}`;

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.mocked(path.join).mockReturnValue('./file1.ts');
    vi.mocked(fs.readFile).mockImplementation((_, callback: any) => {
      callback(null, Buffer.from(mockContent));
    });

    await eslintDisableFiles('./', [/\.ts$/]);

    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('file'),
      expectedContent,
      'utf8',
      expect.any(Function)
    );
    expect(fs.writeFile).toHaveBeenCalledTimes(2);
  });

  it('should skip files that already have eslint-disable', async () => {
    expect.hasAssertions();
    const mockFiles = ['file1.ts'];
    const mockContent = `/* eslint-disable */\nexport const test = true;`;

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.mocked(path.join).mockReturnValue('./file1.ts');
    vi.mocked(fs.readFile).mockImplementation((_, callback: any) => {
      callback(null, Buffer.from(mockContent));
    });

    await eslintDisableFiles('./', [/\.ts$/]);

    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('should handle read file errors', async () => {
    expect.hasAssertions();
    const mockFiles = ['file1.ts'];
    const mockError = new Error('Read error');

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.mocked(path.join).mockReturnValue('./file1.ts');
    vi.mocked(fs.readFile).mockImplementation((_, callback: any) => {
      callback(mockError, null);
    });

    await eslintDisableFiles('./', [/\.ts$/]);

    expect(mockConsoleError).toHaveBeenCalledWith(ERRORS.readFileError('./file1.ts'));
  });

  it('should handle write file errors', async () => {
    expect.hasAssertions();
    const mockFiles = ['file1.ts'];
    const mockContent = 'export const test = true;';
    const mockError = new Error('Write error');

    vi.spyOn(getDeepFilesFromDirModule, 'getDeepFilesFromDir').mockReturnValue(mockFiles);
    vi.mocked(path.join).mockReturnValue('./file1.ts');
    vi.mocked(fs.readFile).mockImplementation((_, callback: any) => {
      callback(null, Buffer.from(mockContent));
    });
    // @ts-expect-error - types are not needed here
    vi.mocked(fs.writeFile).mockImplementation((_, __, ___, callback) => {
      callback(mockError);
    });

    await eslintDisableFiles('./', [/\.ts$/]);

    expect(mockConsoleError).toHaveBeenCalledWith(ERRORS.writeFileError('./file1.ts'));
  });
});
