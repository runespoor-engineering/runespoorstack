import { getDeepFilesFromDir } from '@runespoorstack/files-system-utils';

import { getDateFromChangeFileName } from '../changeFileMeta/getDateFromChangeFileName';
import { getFirstUniqueCommitDate } from '../git/getFirstUniqueCommitDate';
import { getChangesDirectoryPath } from './getChangesDirectoryPath';

export const getExistingChangeFilePath = (
  defaultBranch: string,
  currentBranch: string
): string | undefined => {
  const firstUniqueCommitDate = getFirstUniqueCommitDate(`origin/${defaultBranch}`, currentBranch);
  const changeFiles = getDeepFilesFromDir(getChangesDirectoryPath(), /\.json$/);

  const existingChangeFile = changeFiles.find((filePath) => {
    const fileDate = getDateFromChangeFileName(filePath);
    return fileDate && fileDate > firstUniqueCommitDate;
  });

  return existingChangeFile;
};
