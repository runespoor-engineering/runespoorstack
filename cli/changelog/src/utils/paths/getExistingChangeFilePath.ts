import fs from 'node:fs';

import { DEFAULT_GIT_REMOTE_NAME } from '../../constants/common';
import { getDateFromChangeFileName } from '../changeFileMeta/getDateFromChangeFileName/getDateFromChangeFileName';
import { testChangeFilePathByBranchName } from '../changeFileMeta/testChangeFilePathByBranchName/testChangeFilePathByBranchName';
import { getDeepFilesFromDir } from '../filesData/getDeepFilesFromDir';
import { getFirstUniqueCommitDate } from '../git/getFirstUniqueCommitDate';
import { getChangesDirectoryPath } from './getChangesDirectoryPath';

export const getExistingChangeFilePath = ({
  sourceBranch,
  targetBranch,
  remoteName
}: {
  sourceBranch: string;
  targetBranch: string;
  remoteName?: string;
}): string | undefined => {
  const firstUniqueCommitDate = getFirstUniqueCommitDate(
    `${remoteName || DEFAULT_GIT_REMOTE_NAME}/${targetBranch}`,
    sourceBranch
  );
  const changeDirectoryPath = getChangesDirectoryPath();
  if (!fs.existsSync(changeDirectoryPath)) return undefined;

  const changeFiles = getDeepFilesFromDir(changeDirectoryPath, /\.json$/);
  const filteredChangeFilesByBranchName = changeFiles.filter((filePath) =>
    testChangeFilePathByBranchName({
      branchName: sourceBranch,
      changeFilePath: filePath,
      remoteName
    })
  );

  const existingChangeFile = filteredChangeFilesByBranchName.find((filePath) => {
    const fileDate = getDateFromChangeFileName(filePath);
    return fileDate && fileDate > firstUniqueCommitDate;
  });

  return existingChangeFile;
};
