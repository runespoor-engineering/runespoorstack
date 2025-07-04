import { DEFAULT_LINTED_FILE_REGEX } from '../../../constants/regex';
import { getStagedFiles } from '../../git/getStagedFiles';
import { eslintCheckFilePaths } from '../eslintCheckFilePaths/eslintCheckFilePaths';

/**
 * Checks if staged files contain the eslint-disable comment and throws an error if they do
 * @param {Object} options - Configuration options
 * @param {string} [options.rootDir='./'] - Root directory to execute git command from
 * @param {RegExp[]} [options.filesRegex=[DEFAULT_LINTED_FILE_REGEX]] - Array of RegExp patterns to filter files
 * @param {function} [options.onFileProcessed] - Callback function called after each file is processed with the file path
 * @returns {Promise<void>} Promise that resolves when all staged files have been checked, or rejects if any file contains eslint-disable
 */
export const eslintCheckStagedFiles = async (
  {
    rootDir = './',
    filesRegex = [DEFAULT_LINTED_FILE_REGEX],
    onFileProcessed
  }: {
    rootDir?: string;
    filesRegex?: RegExp[];
    onFileProcessed?: (filePath: string) => void;
  } = {
    rootDir: './',
    filesRegex: [DEFAULT_LINTED_FILE_REGEX]
  }
) => {
  // Get all staged files
  const stagedFiles = getStagedFiles(rootDir);

  // Filter staged files based on the provided regex patterns
  const filteredFiles = stagedFiles.filter((filePath) =>
    filesRegex.some((regex) => regex.test(filePath))
  );

  // Check the filtered files for eslint-disable comments
  const result = await eslintCheckFilePaths({ filePathsToCheck: filteredFiles });

  // Call onFileProcessed for each file if provided
  if (onFileProcessed) {
    filteredFiles.forEach((filePath) => onFileProcessed(filePath));
  }

  return result;
};
