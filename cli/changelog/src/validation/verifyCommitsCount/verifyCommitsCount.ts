import { execSync } from 'node:child_process';

import { GIT_COMMANDS } from '@runespoorstack/git-utils';

export const verifyCommitsCount = (defaultBranch: string, currentBranch: string) => {
  try {
    const commitsCount = parseInt(
      execSync(GIT_COMMANDS.commitsCountBetweenBranches(defaultBranch, currentBranch))
        .toString()
        .trim(),
      10
    );

    if (commitsCount === 0) {
      console.error(
        `Error: No new commits found in the current branch. Please make sure you have committed your changes and your branch is ahead of ${defaultBranch}.`
      );
      process.exit(1);
    }
  } catch (error) {
    console.error(
      `Error: Failed to verify branch commits. ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }
};
