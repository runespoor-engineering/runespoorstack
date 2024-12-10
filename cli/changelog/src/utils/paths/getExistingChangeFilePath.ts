import fs from 'node:fs';

import { getDateFromChangeFileName } from '../changeFileMeta/getDateFromChangeFileName';
import { testChangeFilePathByBranchName } from '../changeFileMeta/testChangeFilePathByBranchName/testChangeFilePathByBranchName';
import { getDeepFilesFromDir } from '../filesData/getDeepFilesFromDir';
import { getFirstUniqueCommitDate } from '../git/getFirstUniqueCommitDate';
import { getChangesDirectoryPath } from './getChangesDirectoryPath';

export const getExistingChangeFilePath = (
  defaultBranch: string,
  currentBranch: string
): string | undefined => {
  const firstUniqueCommitDate = getFirstUniqueCommitDate(`origin/${defaultBranch}`, currentBranch);
  const changeDirectoryPath = getChangesDirectoryPath();
  if (!fs.existsSync(changeDirectoryPath)) return undefined;

  const changeFiles = getDeepFilesFromDir(changeDirectoryPath, /\.json$/);
  const filteredChangeFilesByBranchName = changeFiles.filter((filePath) =>
    testChangeFilePathByBranchName({ branchName: defaultBranch, changeFileName: filePath })
  );

  const existingChangeFile = filteredChangeFilesByBranchName.find((filePath) => {
    const fileDate = getDateFromChangeFileName(filePath);
    return fileDate && fileDate > firstUniqueCommitDate;
  });

  return existingChangeFile;
};
