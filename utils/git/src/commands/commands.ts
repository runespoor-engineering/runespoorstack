export const GIT_COMMANDS = {
  fetchOrigin: () => 'git fetch origin',
  commitsCountBetweenBranches: (from: string, to: string) => `git rev-list --count ${from}..${to}`,
  currentBranchName: () => 'git rev-parse --abbrev-ref HEAD',
  defaultBranchName: () => 'git remote show origin | grep "HEAD branch" | cut -d" " -f5'
};
