const NOT_ALLOWED_FILE_SYMBOLS_REGEX = /\//g;
export const prepareBranchForChangeFileName = (branchName: string) => {
  return branchName.replaceAll(NOT_ALLOWED_FILE_SYMBOLS_REGEX, '-');
};
