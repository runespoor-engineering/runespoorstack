export const GIT_COMMANDS = {
  fetchOrigin: () => 'git fetch origin',
  commitsCountBetweenBranches: (from: string, to: string) => `git rev-list --count ${from}..${to}`,
  currentBranchName: () => 'git rev-parse --abbrev-ref HEAD',
  defaultBranchName: () => 'git remote show origin | grep "HEAD branch" | cut -d" " -f5',
  add: (path: string = '.') => `git add ${path}`,
  commit: (message: string) => `git commit -m "${message}"`,
  push: (branch: string) => `git push --set-upstream origin ${branch}`,
  configUserName: () => 'git config user.name'
};
