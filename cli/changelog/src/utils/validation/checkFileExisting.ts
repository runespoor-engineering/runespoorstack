import fs from 'node:fs';

import { ERRORS } from '../../constants/errorMessages';

export const checkFileExisting = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(ERRORS.fileNotFound(filePath));
  }
};
