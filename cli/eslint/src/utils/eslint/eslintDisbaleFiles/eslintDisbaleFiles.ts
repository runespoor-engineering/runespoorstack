import fs from 'node:fs';
import path from 'node:path';

import { ERRORS } from '../../../constants/errorMessages';
import { ESLINT_DISABLE_FILES } from '../../../constants/eslint';
import { DEFAULT_LINTED_FILE_REGEX } from '../../../constants/regex';
import { getDeepFilesFromDir } from '../../fs/getDeepFilesFromDir/getDeepFilesFromDir';

export const eslintDisableFiles = async (
  rootDir = './',
  filesRegex: RegExp[] = [DEFAULT_LINTED_FILE_REGEX]
) => {
  const files = getDeepFilesFromDir(rootDir, filesRegex);

  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(rootDir, file);

      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(ERRORS.readFileError(filePath));
          return;
        }
        const content = data.toString();
        if (!content.trim().startsWith(ESLINT_DISABLE_FILES)) {
          const updatedContents = `${ESLINT_DISABLE_FILES}\n\n${content}`;
          fs.writeFile(filePath, updatedContents, 'utf8', () => {
            console.error(ERRORS.writeFileError(filePath));
          });
        }
      });
    })
  );
};
