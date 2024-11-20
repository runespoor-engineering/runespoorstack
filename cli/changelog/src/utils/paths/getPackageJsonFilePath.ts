import path from 'node:path';

import { PACKAGE_JSON_FILE } from '../../types/common';

export const getPackageJsonFilePath = () => {
  return path.join(process.cwd(), PACKAGE_JSON_FILE);
};
