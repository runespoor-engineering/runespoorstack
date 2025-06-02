import fs from 'node:fs';

import { getChangelogJsonFilePath } from '../paths/getChangelogJsonFilePath';

export const createChangelogJsonFile = (changelogFileLocation: string) => {
  const changelogFilePath = getChangelogJsonFilePath(changelogFileLocation);
  if (!fs.existsSync(changelogFilePath)) {
    fs.writeFileSync(changelogFilePath, '');
  }
};
