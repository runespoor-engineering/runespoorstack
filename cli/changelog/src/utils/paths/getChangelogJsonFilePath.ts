import path from 'node:path';

import { CHANGELOG_JSON_FILE } from '../../types/common';

export const getChangelogJsonFilePath = () => {
  return path.join(process.cwd(), CHANGELOG_JSON_FILE);
};
