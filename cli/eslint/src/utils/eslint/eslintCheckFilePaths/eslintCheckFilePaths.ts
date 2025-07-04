import path from 'node:path';

import { ERRORS } from '../../../constants/errorMessages';
import { ESLINT_DISABLE_FILES } from '../../../constants/eslint';
import { readFileStream } from '../../fs/readFileStream/readFileStream';

/**
 * Checks if files contain the eslint-disable comment and throws an error if they do
 * @param {Object} options - Configuration options
 * @param {string[]} [options.filePathsToCheck=[]] - Array of file paths to check
 * @returns {Promise<void>} Promise that resolves when all files have been checked, or rejects if any file contains eslint-disable
 */
export const eslintCheckFilePaths = async ({
  filePathsToCheck = []
}: { filePathsToCheck?: string[] } = {}) => {
  const errors: string[] = [];

  return new Promise<void>((resolve, reject) => {
    if (filePathsToCheck.length === 0) {
      resolve();
      return;
    }

    let completedChecks = 0;
    const totalChecks = filePathsToCheck.length;

    filePathsToCheck.forEach((file) => {
      const filePath = path.resolve(file);

      readFileStream(filePath, (err, data) => {
        if (err) {
          errors.push(ERRORS.readFileError(filePath));
        } else if (data) {
          const content = data.toString();
          if (content.trim().startsWith(ESLINT_DISABLE_FILES)) {
            errors.push(ERRORS.eslintDisableFoundError(filePath));
          }
        }

        completedChecks += 1;

        if (completedChecks === totalChecks) {
          if (errors.length > 0) {
            reject(new Error(errors.join('\n')));
          } else {
            resolve();
          }
        }
      });
    });
  });
};
