import fs from 'node:fs';
import path from 'node:path';

/**
 * Recursively gets all files from a directory that match any of the provided regex patterns
 * @param dir - Directory path to start searching from
 * @param filesRegex - Array of RegExp patterns to match files against
 * @param filesList - Accumulator array for recursive calls (default: [])
 * @returns Array of file paths that match the provided regex patterns
 */
export const getDeepFilesFromDir = (
  dir: string,
  filesRegex: RegExp[],
  filesList: string[] = []
): string[] => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getDeepFilesFromDir(filePath, filesRegex, filesList);
    } else {
      const matchesPattern = filesRegex.some((regex) => regex.test(filePath));
      if (matchesPattern) {
        filesList.push(filePath);
      }
    }
  });

  return filesList;
};
