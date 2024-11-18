import { GIT_COMMANDS } from '@runespoorstack/git-utils';
import { execSync } from 'child_process';

export const verifyCommitsCount = () => {
  try {
    execSync(GIT_COMMANDS.fetchOrigin());
    const currentBranch = execSync(GIT_COMMANDS.currentBranchName()).toString().trim();
    const defaultBranch = execSync(GIT_COMMANDS.defaultBranchName()).toString().trim();
    const commitsCount = parseInt(
      execSync(GIT_COMMANDS.commitsCountBetweenBranches(`origin/${defaultBranch}`, currentBranch))
        .toString()
        .trim(),
      10
    );

    console.log(currentBranch, defaultBranch, commitsCount);

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
