import path from 'path';

export const generateChangeFilePath = (changesDirectoryPath: string, changeFileName: string) =>
  path.join(changesDirectoryPath, changeFileName);
