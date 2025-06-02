import fs from 'node:fs';

import { getChangelogTextFilePath } from '../paths/getChangelogTextFilePath';
import { checkFileExisting } from '../validation/checkFileExisting';

export const getChangelogTextData = (changelogFileLocation: string) => {
  const changelogFilePath = getChangelogTextFilePath(changelogFileLocation);
  checkFileExisting(changelogFilePath);
  const changelogContent = fs.readFileSync(changelogFilePath, 'utf8');
  return changelogContent;
};
