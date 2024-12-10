import path from 'node:path';

import { CHANGELOG_TEXT_FILE } from '../../types/common';

export const getChangelogTextFilePath = () => {
  return path.join(process.cwd(), CHANGELOG_TEXT_FILE);
};
