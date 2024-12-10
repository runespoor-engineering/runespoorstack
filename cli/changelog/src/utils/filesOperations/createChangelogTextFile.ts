import fs from 'node:fs';

import { getChangelogTextFilePath } from '../paths/getChangelogTextFilePath';

export const createChangelogTextFile = () => {
  const changelogFilePath = getChangelogTextFilePath();
  if (!fs.existsSync(changelogFilePath)) {
    fs.writeFileSync(changelogFilePath, '');
  }
};
