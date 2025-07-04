import { DEFAULT_LINTED_FILE_REGEX } from '../constants/regex';
import { eslintCheckStagedFiles } from '../utils/eslint/eslintCheckStagedFiles/eslintCheckStagedFiles';

export const checkStaged = async (options: { rootDir?: string; pattern?: string[] }) => {
  try {
    const rootDir = options.rootDir || './';
    const filesRegex = options.pattern
      ? options.pattern.map((pattern) => new RegExp(pattern))
      : [DEFAULT_LINTED_FILE_REGEX];

    console.log('Checking staged files for eslint-disable comments...');

    await eslintCheckStagedFiles({
      rootDir,
      filesRegex,
      onFileProcessed: (filePath) => {
        console.log(`✓ Checked: ${filePath}`);
      }
    });

    console.log('✅ All staged files are clean - no eslint-disable comments found.');
  } catch (error) {
    console.error('❌ Eslint-disable comments found in staged files:');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
};
