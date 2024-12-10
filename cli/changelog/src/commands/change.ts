import { execSync } from 'node:child_process';
import fs from 'node:fs';

import confirm from '@inquirer/confirm';
import input from '@inquirer/input';
import select from '@inquirer/select';

import { ERRORS } from '../constants/errorMessages';
import { ChangesTypes, ChangesTypesDescriptions } from '../types/common';
import { generateChangeFileName } from '../utils/changeFileMeta/generateChangeFileName';
import { createChangeFile } from '../utils/filesOperations/createChangeFile';
import { GIT_COMMANDS } from '../utils/git/command';
import { getCommitsCount } from '../utils/git/getCommitsCount';
import { getExistingChangeFilePath } from '../utils/paths/getExistingChangeFilePath';

export const change = async () => {
  execSync(GIT_COMMANDS.fetchOrigin());
  const currentBranch = execSync(GIT_COMMANDS.currentBranchName()).toString().trim();
  const defaultBranch = execSync(GIT_COMMANDS.defaultBranchName()).toString().trim();

  try {
    const commitsCount = getCommitsCount(`origin/${defaultBranch}`, currentBranch);
    if (commitsCount === 0) {
      console.error(ERRORS.noNewCommits(`origin/${defaultBranch}`));
      process.exit(1);
    }
  } catch (error) {
    console.error(ERRORS.failedBranchCommitsVerification(error));
    process.exit(1);
  }

  const existingChangeFilePath = getExistingChangeFilePath(defaultBranch, currentBranch);
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
  const author = execSync(GIT_COMMANDS.configUserName()).toString().trim();
  const changeData = {
    comment: changesComment,
    type: changesType,
    author
  };

  const changeFileName = generateChangeFileName();
  createChangeFile(changeFileName, changeData);
  if (shouldRewriteChangeFile) {
    fs.unlinkSync(existingChangeFilePath!);
  }
};
