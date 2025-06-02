import path from 'node:path';

export const getChangesDirectoryPath = (changeFilesLocation: string) => {
  return path.join(process.cwd(), changeFilesLocation);
};
