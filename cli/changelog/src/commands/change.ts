import { execSync } from 'node:child_process';
import fs from 'node:fs';

import confirm from '@inquirer/confirm';
import input from '@inquirer/input';
import select from '@inquirer/select';

import { DEFAULT_CHANGE_FILES_LOCATION, DEFAULT_GIT_REMOTE_NAME } from '../constants/common';
import { ERRORS } from '../constants/errorMessages';
import { INFO } from '../constants/infoMessages';
import { ChangeData, ChangesTypes, ChangesTypesDescriptions } from '../types/common';
import { generateChangeFileName } from '../utils/changeFileMeta/generateChangeFileName';
import { getIssueLinksFromIds } from '../utils/changeFileMeta/getIssueLinksFromIds/getIssueLinksFromIds';
import { createChangeFile } from '../utils/filesOperations/createChangeFile';
import { GIT_COMMANDS } from '../utils/git/command';
import { getCommitsCount } from '../utils/git/getCommitsCount';
import { getExistingChangeFilePath } from '../utils/paths/getExistingChangeFilePath';

export const change = async (options?: {
  targetBranch?: string;
  issueLinkPattern?: string;
  remoteName?: string;
  location?: string;
}) => {
  const changeFilesLocation = options?.location || DEFAULT_CHANGE_FILES_LOCATION;
  const remote = options?.remoteName || DEFAULT_GIT_REMOTE_NAME;
  const sourceBranch = execSync(GIT_COMMANDS.currentBranchName()).toString().trim();
  const targetBranch =
    options?.targetBranch || execSync(GIT_COMMANDS.defaultBranchName(remote)).toString().trim();

  execSync(GIT_COMMANDS.fetch(remote, targetBranch));

  try {
    const commitsCount = getCommitsCount(`${remote}/${targetBranch}`, sourceBranch);
    if (commitsCount === 0) {
      console.error(INFO.noNewCommits(`${remote}/${targetBranch}`));
      process.exit(0);
    }
  } catch (error) {
    console.error(ERRORS.failedBranchCommitsVerification(error));
    process.exit(1);
  }

  const existingChangeFilePath = getExistingChangeFilePath({
    targetBranch,
    sourceBranch,
    changeFilesLocation
  });
  let shouldRewriteChangeFile = false;
  if (existingChangeFilePath) {
    shouldRewriteChangeFile = await confirm({
      message: 'Change file already exists. Do you want to rewrite it?'
    });
    if (!shouldRewriteChangeFile) {
      process.exit(0);
    }
  }

  const changesComment = await input({ message: 'Describe the changes:' });
  const changesType = await select({
    message: 'Choose the changes type:',
    choices: [
      {
        name: ChangesTypes.Major,
        value: ChangesTypes.Major,
        description: ChangesTypesDescriptions.Major
      },
      {
        name: ChangesTypes.Minor,
        value: ChangesTypes.Minor,
        description: ChangesTypesDescriptions.Minor
      },
      {
        name: ChangesTypes.Patch,
        value: ChangesTypes.Patch,
        description: ChangesTypesDescriptions.Patch
      },
      {
        name: ChangesTypes.None,
        value: ChangesTypes.None,
        description: ChangesTypesDescriptions.None
      }
    ]
  });

  let issueLinks: string[] = [];
  if (options?.issueLinkPattern) {
    const issueIds = await input({
      message: `Enter comma separated issue ids (it will be used with the following link ${options?.issueLinkPattern}):`
    });
    issueLinks = getIssueLinksFromIds(issueIds, options?.issueLinkPattern);
  }

  const author = execSync(GIT_COMMANDS.configUserName()).toString().trim();
  const changeData: ChangeData = {
    comment: changesComment,
    type: changesType,
    author,
    issueLinks
  };

  const changeFileName = generateChangeFileName();
  createChangeFile(changeFileName, changeData, changeFilesLocation);
  if (shouldRewriteChangeFile) {
    fs.unlinkSync(existingChangeFilePath!);
  }
};
