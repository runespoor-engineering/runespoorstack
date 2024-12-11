import { prepareBranchForChangeFileName } from '../prepareBranchForChangeFileName/prepareBranchForChangeFileName';

export const testChangeFilePathByBranchName = ({
  branchName,
  changeFilePath
}: {
  branchName: string;
  changeFilePath: string;
}) => {
  const formattedBranchName = prepareBranchForChangeFileName(branchName);
  return changeFilePath.includes(`/${formattedBranchName}_`);
};
