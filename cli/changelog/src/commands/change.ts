import { execSync } from 'node:child_process';
import fs from 'node:fs';

import confirm from '@inquirer/confirm';
import input from '@inquirer/input';
import select from '@inquirer/select';

import { ERRORS } from '../constants/errorMessages';
import { INFO } from '../constants/infoMessages';
import { ChangeData, ChangesTypes, ChangesTypesDescriptions } from '../types/common';
import { generateChangeFileName } from '../utils/changeFileMeta/generateChangeFileName';
import { generateIssueLink } from '../utils/changeFileMeta/generateIssueLink/generateIssueLink';
import { createChangeFile } from '../utils/filesOperations/createChangeFile';
import { GIT_COMMANDS } from '../utils/git/command';
import { getCommitsCount } from '../utils/git/getCommitsCount';
import { getExistingChangeFilePath } from '../utils/paths/getExistingChangeFilePath';

export const change = async (options?: { targetBranch?: string; issueLinkPattern?: string }) => {
  execSync(GIT_COMMANDS.fetchOrigin());
  const sourceBranch = execSync(GIT_COMMANDS.currentBranchName()).toString().trim();
  const targetBranch =
    options?.targetBranch || execSync(GIT_COMMANDS.defaultBranchName()).toString().trim();

  try {
    const commitsCount = getCommitsCount(`origin/${targetBranch}`, sourceBranch);
    if (commitsCount === 0) {
      console.error(INFO.noNewCommits(`origin/${targetBranch}`));
      process.exit(0);
    }
  } catch (error) {
    console.error(ERRORS.failedBranchCommitsVerification(error));
    process.exit(1);
  }

  const existingChangeFilePath = getExistingChangeFilePath({ targetBranch, sourceBranch });
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

  let issueLink;
  if (options?.issueLinkPattern) {
    const issueId = await input({
      message: `Enter the issue id (it will be used in the following link ${options?.issueLinkPattern}):`
    });
    issueLink = generateIssueLink({ issueId, issueLinkPattern: options?.issueLinkPattern });
  }

  const author = execSync(GIT_COMMANDS.configUserName()).toString().trim();
  const changeData: ChangeData = {
    comment: changesComment,
    type: changesType,
    author,
    issueLink
  };

  const changeFileName = generateChangeFileName();
  createChangeFile(changeFileName, changeData);
  if (shouldRewriteChangeFile) {
    fs.unlinkSync(existingChangeFilePath!);
  }
};
