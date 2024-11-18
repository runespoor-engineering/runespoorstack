import { getDeepFilesFromDir } from '@runespoorstack/files-system-utils';

import { getChangesDirectoryPath } from '../../utils/getChangesDirectoryPath';
import { getDateFromChangeFileName } from '../../utils/getDateFromChangeFileName';
import { getFirstUniqueCommitDate } from '../../utils/getFirstUniqueCommitDate';

export const verifyExistingChangeFile = (
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
