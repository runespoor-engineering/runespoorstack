import fs from 'node:fs';

import { getChangelogFilePath } from '../paths/getChangelogFilePath';

export const createChangelogFile = () => {
  const changelogFilePath = getChangelogFilePath();
  if (!fs.existsSync(changelogFilePath)) {
    fs.writeFileSync(changelogFilePath, '');
  }
};
