import fs from 'node:fs';

import { getChangelogFilePath } from '../paths/getChangelogFilePath';
import { checkFileExisting } from '../validation/checkFileExisting';

export const getChangelogData = () => {
  const changelogFilePath = getChangelogFilePath();
  checkFileExisting(changelogFilePath);
  const changelogContent = fs.readFileSync(changelogFilePath, 'utf8');
  return changelogContent;
};
