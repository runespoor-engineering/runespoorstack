import fs from 'node:fs';

import { ChangeData } from '../../types/common';
import { getChangeFilePath } from '../paths/getChangeFilePath';
import { getChangesDirectoryPath } from '../paths/getChangesDirectoryPath';

export const createChangeFile = (
  changeFileName: string,
  changeData: ChangeData,
  changeFilesLocation: string
) => {
  const changeDirectoryPath = getChangesDirectoryPath(changeFilesLocation);
  if (!fs.existsSync(changeDirectoryPath)) {
    fs.mkdirSync(changeDirectoryPath);
  }
  const changeFilePath = getChangeFilePath(changeDirectoryPath, changeFileName);
  if (!fs.existsSync(changeDirectoryPath)) {
    fs.mkdirSync(changeDirectoryPath);
  }
  fs.writeFileSync(changeFilePath, JSON.stringify(changeData, null, 2));
};
