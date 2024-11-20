import path from 'node:path';

import { CHANGELOG_FILE } from '../../types/common';

export const getChangelogFilePath = () => {
  return path.join(process.cwd(), CHANGELOG_FILE);
};
