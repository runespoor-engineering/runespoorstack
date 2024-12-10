export const INFO = {
  noNewCommits: (branchName: string) =>
    `Info: No new commits found in the current branch. Please make sure you have committed your changes and your branch is ahead of ${branchName}.`
};
