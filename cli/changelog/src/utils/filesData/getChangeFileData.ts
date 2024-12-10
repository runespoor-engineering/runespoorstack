import fs from 'node:fs';

import { checkFileExisting } from '../validation/checkFileExisting';
import { ChangeData } from '../../types/common';

export const getChangeFileData = (changeFilePath: string): ChangeData => {
  checkFileExisting(changeFilePath);
  const changeFileData = JSON.parse(fs.readFileSync(changeFilePath, 'utf8'));
  return changeFileData as ChangeData;
};
