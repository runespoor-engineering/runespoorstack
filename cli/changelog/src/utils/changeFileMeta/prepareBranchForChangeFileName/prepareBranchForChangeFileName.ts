const NOT_ALLOWED_FILE_SYMBOLS_REGEX = /\//g;
export const prepareBranchForChangeFileName = ({
  branchName,
  remoteName
}: {
  branchName: string;
  remoteName?: string;
}) => {
  const branchNameWithoutRemote =
    remoteName && branchName.startsWith(`${remoteName}/`)
      ? branchName.slice(remoteName.length + 1)
      : branchName;
  return branchNameWithoutRemote.replaceAll(NOT_ALLOWED_FILE_SYMBOLS_REGEX, '-');
};
