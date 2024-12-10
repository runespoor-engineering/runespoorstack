#! /usr/bin/env node

import { program } from 'commander';

import { apply } from './commands/apply';
import { change } from './commands/change';
import { verify } from './commands/verify';

const cliVersion = '0.0.0';

program
  .name('rune')
  .description('CLI for changelog management and semantic versioning.')
  .version(cliVersion);

program
  .command('change')
  .description(
    "Asks a series of questions and then generates a `<branchname>-<timestamp>.json` file in the common folder.\nThe `publish` command will consume these files and perform the proper version bumps. Note these changes will eventually be published in a `CHANGELOG.md` file in the root of the repository.\nThe possible types of changes are:\nMAJOR - these are breaking changes that are not backward compatible. Examples are: renaming a public class, adding/removing a non-optional parameter from a public API, or renaming a variable or function that is exported.\nMINOR - these are changes that are backward compatible (but not forward compatible). Examples are: adding a new public API or adding an optional parameter to a public API\nPATCH - these are changes that are backward and forward-compatible. Examples are: Modifying a private API or fixing a bug in the logic of how an existing API works.\nNONE - these are changes that are backward and forwards compatible and don't require an immediate release. Examples are Modifying dev tooling configurations like eslint."
  )
  .option('-t, --targetBranch <source-branch-name>', 'name of the target branch')
  .action(change);

program
  .command('verify')
  .description('Verifies that change files are provided and are valid.')
  .option('-t, --targetBranch <source-branch-name>', 'name of the target branch')
  .option(
    '-s, --sourceBranch <source-branch-name>',
    'name of the source branch (required in the CI)'
  )
  .action(async (options) => {
    verify(options);
  });

program
  .command('apply')
  .description('Applies the change files to the changelod.')
  .option(
    '-t, --targetBranch <source-branch-name>',
    'name of the target branch (required in the CI)'
  )
  .action(apply);

program.parse();
