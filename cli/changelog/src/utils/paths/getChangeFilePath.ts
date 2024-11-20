import path from 'node:path';

export const getChangeFilePath = (changesDirectoryPath: string, changeFileName: string) =>
  path.join(changesDirectoryPath, changeFileName);
