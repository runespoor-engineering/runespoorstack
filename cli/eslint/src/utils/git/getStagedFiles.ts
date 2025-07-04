import { execSync } from 'node:child_process';
import path from 'node:path';

/**
 * Gets the list of staged files from git
 * @param {string} [rootDir='./'] - Root directory to execute git command from
 * @returns {string[]} Array of staged file paths relative to the root directory
 */
export const getStagedFiles = (rootDir = './'): string[] => {
  try {
    const result = execSync('git diff --cached --name-only --diff-filter=ACMR', {
      cwd: path.resolve(rootDir),
      encoding: 'utf8'
    });

    return result
      .trim()
      .split('\n')
      .filter((file) => file.length > 0)
      .map((file) => path.resolve(rootDir, file));
  } catch (error) {
    // If git command fails (e.g., not a git repo, no staged files), return empty array
    return [];
  }
};
