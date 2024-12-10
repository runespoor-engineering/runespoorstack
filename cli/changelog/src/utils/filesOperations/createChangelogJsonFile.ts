import fs from 'node:fs';

import { getChangelogJsonFilePath } from '../paths/getChangelogJsonFilePath';

export const createChangelogJsonFile = () => {
  const changelogFilePath = getChangelogJsonFilePath();
  if (!fs.existsSync(changelogFilePath)) {
    fs.writeFileSync(changelogFilePath, '');
  }
};
