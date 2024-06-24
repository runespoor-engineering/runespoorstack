import { execSync } from 'child_process';

export const getModifiedFiles = () => {
  try {
    const result = execSync('git diff --name-only').toString();
    return result.split('\n').filter((file) => file !== '');
  } catch (error) {
    console.error('Error getting modified files:', error);
    return [];
  }
};
