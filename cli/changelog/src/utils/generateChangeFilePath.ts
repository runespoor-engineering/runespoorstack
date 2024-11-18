import path from 'node:path';

export const generateChangeFilePath = (changesDirectoryPath: string, changeFileName: string) =>
  path.join(changesDirectoryPath, changeFileName);
