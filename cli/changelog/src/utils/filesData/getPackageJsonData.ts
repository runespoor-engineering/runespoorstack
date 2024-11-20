import fs from 'node:fs';

import { getPackageJsonFilePath } from '../paths/getPackageJsonFilePath';
import { checkFileExisting } from '../validation/checkFileExisting';

export const getPackageJsonData = () => {
  const packageJsonFilePath = getPackageJsonFilePath();
  checkFileExisting(packageJsonFilePath);
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFilePath, 'utf8'));
  return packageJson;
};
