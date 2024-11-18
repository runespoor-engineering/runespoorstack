#! /usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';

import confirm from '@inquirer/confirm';
import input from '@inquirer/input';
import select from '@inquirer/select';
import { GIT_COMMANDS } from '@runespoorstack/git-utils';
import { program } from 'commander';

import { ChangesTypes, ChangesTypesDescriptions } from './types/common';
import { createChangeFile } from './utils/createChangeFile';
import { generateChangeFileName } from './utils/generateChangeFileName';
import { getCommitsCount } from './utils/getCommitsCount';
import { getExistingChangeFile } from './utils/getExistingChangeFile';

const packageVersion = '0.0.0';

program
  .name('rune')
  .description('CLI for changelog management and semantic versioning.')
  .version(packageVersion);

program
  .command('change')
  .description(
    "Asks a series of questions and then generates a `<branchname>-<timestamp>.json` file in the common folder.\nThe `publish` command will consume these files and perform the proper version bumps. Note these changes will eventually be published in a `CHANGELOG.md` file in the root of the repository.\nThe possible types of changes are:\nMAJOR - these are breaking changes that are not backward compatible. Examples are: renaming a public class, adding/removing a non-optional parameter from a public API, or renaming a variable or function that is exported.\nMINOR - these are changes that are backward compatible (but not forward compatible). Examples are: adding a new public API or adding an optional parameter to a public API\nPATCH - these are changes that are backward and forward-compatible. Examples are: Modifying a private API or fixing a bug in the logic of how an existing API works.\nNONE - these are changes that are backward and forwards compatible and don't require an immediate release. Examples are Modifying dev tooling configurations like eslint."
  )
  .action(async () => {
    execSync(GIT_COMMANDS.fetchOrigin());
    const currentBranch = execSync(GIT_COMMANDS.currentBranchName()).toString().trim();
    const defaultBranch = execSync(GIT_COMMANDS.defaultBranchName()).toString().trim();

    try {
      const commitsCount = getCommitsCount(`origin/${defaultBranch}`, currentBranch);
      if (commitsCount === 0) {
        console.error(
          `Error: No new commits found in the current branch. Please make sure you have committed your changes and your branch is ahead of ${defaultBranch}.`
        );
        process.exit(1);
      }
    } catch (error) {
      console.error(
        `Error: Failed to verify branch commits. ${error instanceof Error ? error.message : String(error)}`
      );
      process.exit(1);
    }

    const existingChangeFile = getExistingChangeFile(defaultBranch, currentBranch);
    let shouldRewriteChangeFile = false;
    if (existingChangeFile) {
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
    const changeData = {
      comment: changesComment,
      type: changesType
    };

    const changeFileName = generateChangeFileName();
    createChangeFile(changeFileName, changeData);
    if (shouldRewriteChangeFile) {
      fs.unlinkSync(existingChangeFile!);
    }
  });

program.parse();
