import { DEFAULT_LINTED_FILE_REGEX } from '../constants/regex';
import { eslintCheckFiles } from '../utils/eslint/eslintCheckFiles/eslintCheckFiles';

export const check = async (options: { rootDir?: string; pattern?: string[] }) => {
  try {
    const rootDir = options.rootDir || './';
    const filesRegex = options.pattern
      ? options.pattern.map((pattern) => new RegExp(pattern))
      : [DEFAULT_LINTED_FILE_REGEX];

    console.log(`Checking files in ${rootDir} for eslint-disable comments...`);

    await eslintCheckFiles({
      rootDir,
      filesRegex
    });

    console.log('✅ All files are clean - no eslint-disable comments found.');
  } catch (error) {
    console.error('❌ Eslint-disable comments found:');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
};
