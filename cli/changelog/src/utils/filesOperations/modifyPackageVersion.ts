import fs from 'node:fs';

import { getPackageJsonData } from '../filesData/getPackageJsonData';
import { getPackageJsonFilePath } from '../paths/getPackageJsonFilePath';

export const modifyPackageVersion = (bumpedPackageVersion: string) => {
  const packageJsonFilePath = getPackageJsonFilePath();
  const packageJsonData = getPackageJsonData();
  packageJsonData.version = bumpedPackageVersion;
  fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJsonData, null, 2));
};
