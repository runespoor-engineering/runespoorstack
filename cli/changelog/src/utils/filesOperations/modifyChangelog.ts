import fs from 'node:fs';

import { ChangesTypes } from '../../types/common';
import { getChangelogJsonData } from '../filesData/getChangelogJsonData';
import { getChangelogTextData } from '../filesData/getChangelogTextData';
import { getChangelogJsonFilePath } from '../paths/getChangelogJsonFilePath';
import { getChangelogTextFilePath } from '../paths/getChangelogTextFilePath';

const modifyChangelogTextFile = ({
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
  const changelogFilePath = getChangelogTextFilePath();
  const changelogRecord = `
  ## ${bumpedPackageVersion}
  ${date.toString()}

  ### ${changesType.toUpperCase()}

  ${comment}

  `;

  const existingContent = getChangelogTextData();
  fs.writeFileSync(changelogFilePath, changelogRecord + existingContent);
};

const modifyChangelogJsonFile = ({
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
  const changelogFilePath = getChangelogJsonFilePath();
  const changelogRecord = {
    version: bumpedPackageVersion,
    type: changesType,
    comment,
    date: date.toDateString()
  };

  const existingContent = getChangelogJsonData();
  if (existingContent) {
    fs.writeFileSync(changelogFilePath, JSON.stringify(existingContent?.unshift(changelogRecord)));
  } else {
    fs.writeFileSync(changelogFilePath, JSON.stringify([changelogRecord]));
  }
};

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
  modifyChangelogTextFile({ bumpedPackageVersion, date, changesType, comment });
  modifyChangelogJsonFile({ bumpedPackageVersion, date, changesType, comment });
};
