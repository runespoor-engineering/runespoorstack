export const ERRORS = {
  writeFileError: (filePath: string) => `Error: Failed to write to ${filePath} file.`,
  readFileError: (filePath: string) => `Error: Failed to read ${filePath} file.`,
  eslintDisableFoundError: (filePath: string) =>
    `Error: File ${filePath} contains eslint-disable comment. Please remove it.`
};
