import { execSync } from 'node:child_process';

import { GIT_COMMANDS } from '@runespoorstack/git-utils';

export const getCommitsCount = (defaultBranch: string, currentBranch: string) => {
  return parseInt(
    execSync(GIT_COMMANDS.commitsCountBetweenBranches(defaultBranch, currentBranch))
      .toString()
      .trim(),
    10
  );
};
