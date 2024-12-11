import { prepareBranchForChangeFileName } from '../prepareBranchForChangeFileName/prepareBranchForChangeFileName';

export const testChangeFilePathByBranchName = ({
  branchName,
  changeFilePath,
  remoteName
}: {
  branchName: string;
  changeFilePath: string;
  remoteName?: string;
}) => {
  const formattedBranchName = prepareBranchForChangeFileName({ branchName, remoteName });
  return changeFilePath.includes(`/${formattedBranchName}_`);
};
