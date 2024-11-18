import fs from 'node:fs';

import { ChangeData } from '../types/common';
import { generateChangeFilePath } from './generateChangeFilePath';
import { getChangesDirectoryPath } from './getChangesDirectoryPath';

export const createChangeFile = (changeFileName: string, changeData: ChangeData) => {
  const changeDirectoryPath = getChangesDirectoryPath();
  const changeFilePath = generateChangeFilePath(changeDirectoryPath, changeFileName);
  if (!fs.existsSync(changeDirectoryPath)) {
    fs.mkdirSync(changeDirectoryPath);
  }
  fs.writeFileSync(changeFilePath, JSON.stringify(changeData, null, 2));
};
