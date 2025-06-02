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
  issueLinks,
  changelogFileLocation
}: {
  bumpedPackageVersion: string;
  date: Date;
  changesType: ChangesTypes;
  comment: string;
  author: string;
  issueLinks?: string[];
  changelogFileLocation: string;
}) => {
  const changelogFilePath = getChangelogTextFilePath(changelogFileLocation);

  const changelogRecord = `
## ${bumpedPackageVersion}
${date.toString()}

### ${changesType.toUpperCase()}

${comment}

Author: **${author}**<br/>
${issueLinks?.length ? `Issue Links: <br/>- ${issueLinks?.join('<br/>- ')}` : ''}
  `;

  const existingContent = getChangelogTextData(changelogFileLocation);
  fs.writeFileSync(changelogFilePath, changelogRecord + existingContent);
};

const modifyChangelogJsonFile = ({
  bumpedPackageVersion,
  date,
  changesType,
  comment,
  author,
  issueLinks,
  changelogFileLocation
}: {
  bumpedPackageVersion: string;
  date: Date;
  changesType: ChangesTypes;
  comment: string;
  author: string;
  issueLinks?: string[];
  changelogFileLocation: string;
}) => {
  const changelogFilePath = getChangelogJsonFilePath(changelogFileLocation);

  const changelogRecord: ChangelogRecord = {
    version: bumpedPackageVersion,
    type: changesType,
    comment,
    date: date.toDateString(),
    author,
    issueLinks
  };

  const existingContent = getChangelogJsonData(changelogFileLocation);
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
  issueLinks,
  changelogFileLocation
}: {
  bumpedPackageVersion: string;
  date: Date;
  changesType: ChangesTypes;
  comment: string;
  author: string;
  issueLinks?: string[];
  changelogFileLocation: string;
}) => {
  modifyChangelogTextFile({
    bumpedPackageVersion,
    date,
    changesType,
    comment,
    author,
    issueLinks,
    changelogFileLocation
  });
  modifyChangelogJsonFile({
    bumpedPackageVersion,
    date,
    changesType,
    comment,
    author,
    issueLinks,
    changelogFileLocation
  });
};
