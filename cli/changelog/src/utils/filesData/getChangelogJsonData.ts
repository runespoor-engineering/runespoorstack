import fs from 'node:fs';

import { ChangelogRecord } from '../../types/common';
import { getChangelogJsonFilePath } from '../paths/getChangelogJsonFilePath';
import { checkFileExisting } from '../validation/checkFileExisting';

export const getChangelogJsonData = (changelogFileLocation: string): null | ChangelogRecord[] => {
  const changelogFilePath = getChangelogJsonFilePath(changelogFileLocation);
  checkFileExisting(changelogFilePath);
  const changelogContent = fs.readFileSync(changelogFilePath, 'utf8');
  return changelogContent ? (JSON.parse(changelogContent) as ChangelogRecord[]) : null;
};
