import { GIT_COMMANDS } from '@runespoorstack/git-utils';
import { execSync } from 'child_process';

export const generateChangeFileName = () => {
  const branchName = execSync(GIT_COMMANDS.currentBranchName()).toString().trim();
  const timestamp = new Date().toISOString().replace(/[:.T]/g, '-').slice(0, -2);
  const changeFileName = `${branchName}_${timestamp}.json`;
  return changeFileName;
};
