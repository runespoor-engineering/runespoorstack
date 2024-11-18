import { getDeepFilesFromDir } from '@runespoorstack/files-system-utils';

import { getChangesDirectoryPath } from './getChangesDirectoryPath';
import { getDateFromChangeFileName } from './getDateFromChangeFileName';
import { getFirstUniqueCommitDate } from './getFirstUniqueCommitDate';

export const getExistingChangeFile = (
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
