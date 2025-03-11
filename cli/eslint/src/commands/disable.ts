import { SUCCESS } from '../constants/successMessages';
import { eslintDisableFiles } from '../utils/eslint/eslintDisbaleFiles/eslintDisbaleFiles';

export const disable = async (options?: { rootDir?: string; pattern?: string[] }) => {
  const processedPatterns = options?.pattern?.map((pattern) => new RegExp(pattern));
  await eslintDisableFiles({
    rootDir: options?.rootDir,
    filesRegex: processedPatterns,
    onFileProcessed: (filePath) => {
      console.info(SUCCESS.eslintDisableFile(filePath));
    }
  });
};
