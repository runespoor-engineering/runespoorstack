import fs from 'node:fs';

export const checkFileExisting = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${filePath} file not found`);
  }
};
