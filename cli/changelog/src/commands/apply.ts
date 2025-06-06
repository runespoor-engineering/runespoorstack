import { execSync } from 'node:child_process';
import fs from 'node:fs';

import {
  DEFAULT_CHANGE_FILES_LOCATION,
  DEFAULT_CHANGELOG_FILE_LOCATION,
  DEFAULT_GIT_REMOTE_NAME
} from '../constants/common';
import { ERRORS } from '../constants/errorMessages';
import { getDateFromChangeFileName } from '../utils/changeFileMeta/getDateFromChangeFileName/getDateFromChangeFileName';
import { getChangeFileData } from '../utils/filesData/getChangeFileData';
import { getChangeFilesPaths } from '../utils/filesData/getChangeFilesPaths';
import { getPackageJsonData } from '../utils/filesData/getPackageJsonData';
import { createChangelogJsonFile } from '../utils/filesOperations/createChangelogJsonFile';
import { createChangelogTextFile } from '../utils/filesOperations/createChangelogTextFile';
import { modifyChangelog } from '../utils/filesOperations/modifyChangelog';
import { modifyPackageVersion } from '../utils/filesOperations/modifyPackageVersion';
import { GIT_COMMANDS } from '../utils/git/command';
import { getChangelogJsonFilePath } from '../utils/paths/getChangelogJsonFilePath';
import { getChangelogTextFilePath } from '../utils/paths/getChangelogTextFilePath';
import { getPackageJsonFilePath } from '../utils/paths/getPackageJsonFilePath';
import { bumpSemver } from '../utils/semver/bumpSemver';

export const apply = async (options?: {
  targetBranch?: string;
  remoteName?: string;
  location?: string;
  changelogFileLocation?: string;
}) => {
  const changeFilesLocation = options?.location || DEFAULT_CHANGE_FILES_LOCATION;
  const changelogFileLocation = options?.changelogFileLocation || DEFAULT_CHANGELOG_FILE_LOCATION;
  const remote = options?.remoteName || DEFAULT_GIT_REMOTE_NAME;
  const targetBranch =
    options?.targetBranch || execSync(GIT_COMMANDS.defaultBranchName(remote)).toString().trim();

  createChangelogTextFile(changelogFileLocation);
  createChangelogJsonFile(changelogFileLocation);

  const packageJsonData = getPackageJsonData();
  const changeFilesPaths = getChangeFilesPaths(changeFilesLocation);

  let updatedPackageVersion = packageJsonData.version;
  changeFilesPaths.forEach((changeFilePath) => {
    const changeFileDate = getDateFromChangeFileName(changeFilePath);
    const changeFileData = getChangeFileData(changeFilePath);
    const bumpedPackageVersion = bumpSemver(updatedPackageVersion, changeFileData.type);
    if (!bumpedPackageVersion) {
      console.error(ERRORS.bumpVersion());
      process.exit(1);
    }
    modifyChangelog({
      bumpedPackageVersion,
      date: changeFileDate!,
      changesType: changeFileData.type,
      comment: changeFileData.comment,
      author: changeFileData.author,
      issueLinks: changeFileData.issueLinks,
      changelogFileLocation
    });
    updatedPackageVersion = bumpedPackageVersion;
    fs.unlinkSync(changeFilePath);
    execSync(GIT_COMMANDS.add(changeFilePath));
  });

  if (changeFilesPaths.length) {
    modifyPackageVersion(updatedPackageVersion);
    execSync(GIT_COMMANDS.add(getPackageJsonFilePath()));
    execSync(GIT_COMMANDS.add(getChangelogTextFilePath(changelogFileLocation)));
    execSync(GIT_COMMANDS.add(getChangelogJsonFilePath(changelogFileLocation)));
    execSync(GIT_COMMANDS.commit(`chore(changelog): apply change file [ci skip]`));
    execSync(GIT_COMMANDS.push(remote, targetBranch));
  }
};
