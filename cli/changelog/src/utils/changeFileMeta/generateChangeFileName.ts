import { execSync } from 'node:child_process';

import { GIT_COMMANDS } from '../git/command';

const NOT_ALLOWED_FILE_SYMBOLS_REGEX = /\//g;

export const generateChangeFileName = () => {
  const branchName = execSync(GIT_COMMANDS.currentBranchName()).toString().trim();
  const timestamp = new Date().toISOString().replace(/[:.T]/g, '-').slice(0, -2);
  const formattedBranchName = branchName.replaceAll(NOT_ALLOWED_FILE_SYMBOLS_REGEX, '-');
  const changeFileName = `${formattedBranchName}_${timestamp}.json`;
  return changeFileName;
};
