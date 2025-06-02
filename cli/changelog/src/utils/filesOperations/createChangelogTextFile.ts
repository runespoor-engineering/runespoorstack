import fs from 'node:fs';

import { getChangelogTextFilePath } from '../paths/getChangelogTextFilePath';

export const createChangelogTextFile = (changelogFileLocation: string) => {
  const changelogFilePath = getChangelogTextFilePath(changelogFileLocation);
  if (!fs.existsSync(changelogFilePath)) {
    fs.writeFileSync(changelogFilePath, '');
  }
};
