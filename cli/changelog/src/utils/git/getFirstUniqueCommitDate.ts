import { execSync } from 'node:child_process';

export const getFirstUniqueCommitDate = (defaultBranch: string, currentBranch: string) => {
  return new Date(
    execSync(
      `git log --format=%aI $(git merge-base ${defaultBranch} ${currentBranch})..${currentBranch} --reverse | head -n 1`
    )
      .toString()
      .trim()
  );
};
