import { execSync } from 'child_process';

import { DEFAULT_CHANGE_FILES_LOCATION, DEFAULT_GIT_REMOTE_NAME } from '../constants/common';
import { ERRORS } from '../constants/errorMessages';
import { CHANGE_FILE_NAME_REGEXP } from '../constants/regexp';
import { SUCCESS } from '../constants/successMessages';
import { GIT_COMMANDS } from '../utils/git/command';
import { getCommitsCount } from '../utils/git/getCommitsCount';
import { getExistingChangeFilePath } from '../utils/paths/getExistingChangeFilePath';

export const verify = async (options?: {
  sourceBranch?: string;
  targetBranch?: string;
  remoteName?: string;
  location?: string;
}) => {
  const changeFilesLocation = options?.location || DEFAULT_CHANGE_FILES_LOCATION;
  const remote = options?.remoteName || DEFAULT_GIT_REMOTE_NAME;
  const sourceBranch =
    options?.sourceBranch || execSync(GIT_COMMANDS.currentBranchName()).toString().trim();
  const targetBranch =
    options?.targetBranch || execSync(GIT_COMMANDS.defaultBranchName(remote)).toString().trim();

  execSync(GIT_COMMANDS.fetchRemote(remote));

  try {
    const commitsCount = getCommitsCount(`${remote}/${targetBranch}`, sourceBranch);
    if (commitsCount === 0) {
      console.info(SUCCESS.changeFilesNotRequired());
      process.exit(0);
    }
  } catch (error) {
    console.error(ERRORS.failedBranchCommitsVerification(error));
    process.exit(1);
  }

  const existingChangeFilePath = getExistingChangeFilePath({
    targetBranch,
    sourceBranch,
    remoteName: options?.remoteName,
    changeFilesLocation
  });
  if (!existingChangeFilePath) {
    console.error(ERRORS.noChangeFiles(sourceBranch));
    process.exit(1);
  }
  if (!CHANGE_FILE_NAME_REGEXP.test(existingChangeFilePath)) {
    console.error(ERRORS.invalidChangeFileName());
    process.exit(1);
  }

  console.info(SUCCESS.foundChangeFile(existingChangeFilePath));
  return existingChangeFilePath;
};
