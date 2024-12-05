import { execSync } from 'node:child_process';
import fs from 'node:fs';

import { GIT_COMMANDS } from '@runespoorstack/git-utils';

import { ERRORS } from '../constants/errorMessages';
import { getDateFromChangeFileName } from '../utils/changeFileMeta/getDateFromChangeFileName';
import { getChangeFileData } from '../utils/filesData/getChangeFileData';
import { getChangeFilesPaths } from '../utils/filesData/getChangeFilesPaths';
import { getPackageJsonData } from '../utils/filesData/getPackageJsonData';
import { createChangelogFile } from '../utils/filesOperations/createChangelogFile';
import { modifyChangelog } from '../utils/filesOperations/modifyChangelog';
import { modifyPackageVersion } from '../utils/filesOperations/modifyPackageVersion';
import { getChangelogFilePath } from '../utils/paths/getChangelogFilePath';
import { getPackageJsonFilePath } from '../utils/paths/getPackageJsonFilePath';
import { bumpSemver } from '../utils/semver/bumpSemver';
import { verify } from './verify';

export const apply = async () => {
  await verify();

  createChangelogFile();

  const packageJsonData = getPackageJsonData();
  const changeFilesPaths = getChangeFilesPaths();

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
      comment: changeFileData.comment
    });
    updatedPackageVersion = bumpedPackageVersion;
    fs.unlinkSync(changeFilePath);
  });

  modifyPackageVersion(updatedPackageVersion);
  execSync(GIT_COMMANDS.add(getPackageJsonFilePath()));
  execSync(GIT_COMMANDS.add(getChangelogFilePath()));
  execSync(GIT_COMMANDS.commit(`chore(changelog): apply change file [ci skip]`));
  execSync(GIT_COMMANDS.push());
};
