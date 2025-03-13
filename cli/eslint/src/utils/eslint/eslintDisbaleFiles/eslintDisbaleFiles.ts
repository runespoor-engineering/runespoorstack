import fs from 'node:fs';
import path from 'node:path';

import { ERRORS } from '../../../constants/errorMessages';
import { ESLINT_DISABLE_FILES } from '../../../constants/eslint';
import { DEFAULT_LINTED_FILE_REGEX } from '../../../constants/regex';
import { getDeepFilesFromDir } from '../../fs/getDeepFilesFromDir/getDeepFilesFromDir';
import { readFileStream } from '../../fs/readFileStream/readFileStream';

export const eslintDisableFiles = async (
  {
    rootDir = './',
    filesRegex = [DEFAULT_LINTED_FILE_REGEX],
    onFileProcessed = () => {}
  }: { rootDir?: string; filesRegex?: RegExp[]; onFileProcessed?: (filePath: string) => void } = {
    rootDir: './',
    filesRegex: [DEFAULT_LINTED_FILE_REGEX],
    onFileProcessed: () => {}
  }
) => {
  const files = getDeepFilesFromDir(rootDir, filesRegex);

  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(process.cwd(), file);

      readFileStream(filePath, (err, data) => {
        if (err) {
          console.error(ERRORS.readFileError(filePath), err.message);
          return;
        }
        const content = data!.toString();
        if (!content.trim().startsWith(ESLINT_DISABLE_FILES)) {
          const updatedContents = `${ESLINT_DISABLE_FILES}\n\n${content}`;
          fs.writeFile(filePath, updatedContents, 'utf8', (writeErr) => {
            if (writeErr) {
              console.error(ERRORS.writeFileError(filePath));
              return;
            }
            onFileProcessed(filePath);
          });
        }
      });
    })
  );
};
