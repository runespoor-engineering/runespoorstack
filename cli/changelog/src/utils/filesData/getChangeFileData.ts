import fs from 'node:fs';

import { ChangeData } from '../../types/common';
import { checkFileExisting } from '../validation/checkFileExisting';

export const getChangeFileData = (changeFilePath: string): ChangeData => {
  checkFileExisting(changeFilePath);
  const changeFileData = JSON.parse(fs.readFileSync(changeFilePath, 'utf8'));
  return changeFileData as ChangeData;
};
