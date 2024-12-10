import { execSync } from 'child_process';

import { ERRORS } from '../constants/errorMessages';
import { CHANGE_FILE_NAME_REGEXP } from '../constants/regexp';
import { SUCCESS } from '../constants/successMessages';
import { GIT_COMMANDS } from '../utils/git/command';
import { getCommitsCount } from '../utils/git/getCommitsCount';
import { getExistingChangeFilePath } from '../utils/paths/getExistingChangeFilePath';

export const verify = async () => {
  execSync(GIT_COMMANDS.fetchOrigin());
  const currentBranch = execSync(GIT_COMMANDS.currentBranchName()).toString().trim();
  const defaultBranch = execSync(GIT_COMMANDS.defaultBranchName()).toString().trim();

  try {
    const commitsCount = getCommitsCount(`origin/${defaultBranch}`, currentBranch);
    if (commitsCount === 0) {
      console.info(SUCCESS.changeFilesNotRequired());
      process.exit(0);
    }
  } catch (error) {
    console.error(ERRORS.failedBranchCommitsVerification(error));
    process.exit(1);
  }

  const existingChangeFilePath = getExistingChangeFilePath(defaultBranch, currentBranch);
  if (!existingChangeFilePath) {
    console.error(ERRORS.noChangeFiles(currentBranch));
    process.exit(1);
  }
  if (!CHANGE_FILE_NAME_REGEXP.test(existingChangeFilePath)) {
    console.error(ERRORS.invalidChangeFileName());
    process.exit(1);
  }

  console.info(SUCCESS.foundChangeFile(existingChangeFilePath));
  return existingChangeFilePath;
};
