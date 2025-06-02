import path from 'node:path';

export const getChangelogTextFilePath = (changelogFileLocation: string) => {
  return path.join(process.cwd(), `${changelogFileLocation}.md`);
};
