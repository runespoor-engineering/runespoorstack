import fs from 'node:fs';
import path from 'node:path';

export const getDeepFilesFromDir = (dir: string, pattern: RegExp, filesList: string[] = []) => {
  const files = fs.readdirSync(dir) as string[];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getDeepFilesFromDir(filePath, pattern, filesList);
    } else if (pattern && pattern.test(file)) {
      filesList.push(filePath);
    }
  });

  return filesList;
};
