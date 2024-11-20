export const SUCCESS = {
  changeFilesNotRequired: () => `Success: The change files are not required.`,
  foundChangeFile: (existingChangeFilePath: string) =>
    `Success: Found change file: ${existingChangeFilePath}.`
};
