import path from 'node:path';

import { CHANGE_FILES_FOLDER } from '../types/common';

export const getChangesDirectoryPath = () => {
  return path.join(process.cwd(), CHANGE_FILES_FOLDER);
};
