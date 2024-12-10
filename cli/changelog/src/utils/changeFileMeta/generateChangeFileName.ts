import { execSync } from 'node:child_process';

import { GIT_COMMANDS } from '../git/command';
import { prepareBranchForChangeFileName } from './prepareBranchForChangeFileName/prepareBranchForChangeFileName';

export const generateChangeFileName = () => {
  const branchName = execSync(GIT_COMMANDS.currentBranchName()).toString().trim();
  const timestamp = new Date().toISOString().replace(/[:.T]/g, '-').slice(0, -2);
  const formattedBranchName = prepareBranchForChangeFileName(branchName);
  const changeFileName = `${formattedBranchName}_${timestamp}.json`;
  return changeFileName;
};
