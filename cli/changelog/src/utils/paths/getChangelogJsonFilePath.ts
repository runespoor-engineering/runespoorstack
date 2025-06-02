import path from 'node:path';

export const getChangelogJsonFilePath = (changelogFileLocation: string) => {
  return path.join(process.cwd(), `${changelogFileLocation}.json`);
};
