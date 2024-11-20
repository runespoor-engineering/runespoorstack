import fs from 'node:fs';

import { ChangesTypes } from '../../types/common';
import { getChangelogData } from '../filesData/getChanelogData';
import { getChangelogFilePath } from '../paths/getChangelogFilePath';

export const modifyChangelog = ({
  bumpedPackageVersion,
  date,
  changesType,
  comment
}: {
  bumpedPackageVersion: string;
  date: Date;
  changesType: ChangesTypes;
  comment: string;
}) => {
  const changelogFilePath = getChangelogFilePath();
  const changelogRecord = `
  ## ${bumpedPackageVersion}
  ${date.toString()}

  ### ${changesType.toUpperCase()}

  ${comment}

  `;

  const existingContent = getChangelogData();
  fs.writeFileSync(changelogFilePath, changelogRecord + existingContent);
};
