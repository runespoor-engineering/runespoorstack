import fs from 'node:fs';

import { ChangelogRecord, ChangesTypes } from '../../types/common';
import { getChangelogJsonData } from '../filesData/getChangelogJsonData';
import { getChangelogTextData } from '../filesData/getChangelogTextData';
import { getChangelogJsonFilePath } from '../paths/getChangelogJsonFilePath';
import { getChangelogTextFilePath } from '../paths/getChangelogTextFilePath';

const modifyChangelogTextFile = ({
  bumpedPackageVersion,
  date,
  changesType,
  comment,
  author,
  issueLink
}: {
  bumpedPackageVersion: string;
  date: Date;
  changesType: ChangesTypes;
  comment: string;
  author: string;
  issueLink?: string;
}) => {
  const changelogFilePath = getChangelogTextFilePath();

  const changelogRecord = `
  ## ${bumpedPackageVersion}
  ${date.toString()}

  ### ${changesType.toUpperCase()}

  ${comment}

  ${issueLink ? `[Issue Link](${issueLink}) | ` : ''}Author: **${author}**
  `;

  const existingContent = getChangelogTextData();
  fs.writeFileSync(changelogFilePath, changelogRecord + existingContent);
};

const modifyChangelogJsonFile = ({
  bumpedPackageVersion,
  date,
  changesType,
  comment,
  author,
  issueLink
}: {
  bumpedPackageVersion: string;
  date: Date;
  changesType: ChangesTypes;
  comment: string;
  author: string;
  issueLink?: string;
}) => {
  const changelogFilePath = getChangelogJsonFilePath();

  const changelogRecord: ChangelogRecord = {
    version: bumpedPackageVersion,
    type: changesType,
    comment,
    date: date.toDateString(),
    author,
    issueLink
  };

  const existingContent = getChangelogJsonData();
  if (existingContent) {
    fs.writeFileSync(changelogFilePath, JSON.stringify([changelogRecord, ...existingContent]));
  } else {
    fs.writeFileSync(changelogFilePath, JSON.stringify([changelogRecord]));
  }
};

export const modifyChangelog = ({
  bumpedPackageVersion,
  date,
  changesType,
  comment,
  author,
  issueLink
}: {
  bumpedPackageVersion: string;
  date: Date;
  changesType: ChangesTypes;
  comment: string;
  author: string;
  issueLink?: string;
}) => {
  modifyChangelogTextFile({ bumpedPackageVersion, date, changesType, comment, author, issueLink });
  modifyChangelogJsonFile({ bumpedPackageVersion, date, changesType, comment, author, issueLink });
};
