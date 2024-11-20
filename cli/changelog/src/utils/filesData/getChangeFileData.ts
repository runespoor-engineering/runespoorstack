import fs from 'node:fs';

import { checkFileExisting } from '../validation/checkFileExisting';

export const getChangeFileData = (changeFilePath: string) => {
  checkFileExisting(changeFilePath);
  const changeFileData = JSON.parse(fs.readFileSync(changeFilePath, 'utf8'));
  return changeFileData;
};
