export const ERRORS = {
  bumpVersion: () => 'Error: Failed to bump package version.',
  noNewCommits: (branchName: string) =>
    `Error: No new commits found in the current branch. Please make sure you have committed your changes and your branch is ahead of ${branchName}.`,
  failedBranchCommitsVerification: (error: unknown) =>
    `Error: Failed to verify branch commits. ${error instanceof Error ? error.message : String(error)}`,
  invalidChangeFileName: () => `Error: Invalid change file name.`,
  noChangeFiles: () => `Error: No change files found.`,
  fileNotFound: (filePath: string) => `${filePath} file not found`
};
