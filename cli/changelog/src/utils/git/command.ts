export const GIT_COMMANDS = {
  fetch: (remote: string, branch: string) => `git fetch ${remote} ${branch}`,
  commitsCountBetweenBranches: (from: string, to: string) => `git rev-list --count ${from}..${to}`,
  currentBranchName: () => 'git rev-parse --abbrev-ref HEAD',
  defaultBranchName: (remote: string) =>
    `git remote show ${remote} | grep "HEAD branch" | cut -d" " -f5`,
  add: (path: string = '.') => `git add ${path}`,
  commit: (message: string) => `git commit -m "${message}"`,
  push: (origin: string, branch: string) => `git push --set-upstream ${origin} ${branch}`,
  configUserName: () => 'git config user.name'
};
