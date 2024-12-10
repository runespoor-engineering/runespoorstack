import { execSync } from 'node:child_process';
import fs from 'node:fs';

import { ChangelogRecord, ChangesTypes } from '../../types/common';
import { getChangelogJsonData } from '../filesData/getChangelogJsonData';
import { getChangelogTextData } from '../filesData/getChangelogTextData';
import { GIT_COMMANDS } from '../git/command';
import { getChangelogJsonFilePath } from '../paths/getChangelogJsonFilePath';
import { getChangelogTextFilePath } from '../paths/getChangelogTextFilePath';

const modifyChangelogTextFile = ({
  bumpedPackageVersion,
  date,
  changesType,
  comment,
  author
}: {
  bumpedPackageVersion: string;
  date: Date;
  changesType: ChangesTypes;
  comment: string;
  author: string;
}) => {
  const changelogFilePath = getChangelogTextFilePath();

  const changelogRecord = `
  ## ${bumpedPackageVersion}
  ${date.toString()}

  ### ${changesType.toUpperCase()}

  ${comment}

  Author: **${author}**
  `;

  const existingContent = getChangelogTextData();
  fs.writeFileSync(changelogFilePath, changelogRecord + existingContent);
};

const modifyChangelogJsonFile = ({
  bumpedPackageVersion,
  date,
  changesType,
  comment,
  author
}: {
  bumpedPackageVersion: string;
  date: Date;
  changesType: ChangesTypes;
  comment: string;
  author: string;
}) => {
  const changelogFilePath = getChangelogJsonFilePath();

  const changelogRecord: ChangelogRecord = {
    version: bumpedPackageVersion,
    type: changesType,
    comment,
    date: date.toDateString(),
    author: author
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
  comment,
  author
}: {
  bumpedPackageVersion: string;
  date: Date;
  changesType: ChangesTypes;
  comment: string;
  author: string;
}) => {
  modifyChangelogTextFile({ bumpedPackageVersion, date, changesType, comment, author });
  modifyChangelogJsonFile({ bumpedPackageVersion, date, changesType, comment, author });
};
