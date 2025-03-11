#! /usr/bin/env node

import { program } from 'commander';

import { disable } from './commands/disable';

const cliVersion = '0.0.0';

program
  .name('lintspoor')
  .description('CLI for smooth eslint integration and management.')
  .version(cliVersion);

program
  .command('disable')
  .description(
    'Adds "/* eslint-disable */" line to the top of all files in the project that match the provided regex pattern.'
  )
  .option('-r, --rootDir <path>', 'path to directory to disable eslint in')
  .option(
    '-p, --pattern <regex...>',
    'regex pattern to match files against (e.g. \\.[cm]?[jt]sx?$ \\.test\\.[cm]?[jt]sx?$)'
  )
  .action(disable);

program.parse();
