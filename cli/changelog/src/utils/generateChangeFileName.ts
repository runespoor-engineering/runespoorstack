import { execSync } from 'child_process';

export const generateChangeFileName = () => {
  const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  const timestamp = new Date().toISOString().replace(/[:.T]/g, '-').slice(0, -2);
  const changeFileName = `${branchName}_${timestamp}.json`;
  return changeFileName;
};
