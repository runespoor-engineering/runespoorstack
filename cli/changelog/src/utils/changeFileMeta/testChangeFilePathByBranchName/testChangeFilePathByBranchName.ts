import { prepareBranchForChangeFileName } from '../prepareBranchForChangeFileName/prepareBranchForChangeFileName';

export const testChangeFilePathByBranchName = ({
  branchName,
  changeFileName
}: {
  branchName: string;
  changeFileName: string;
}) => {
  const formattedBranchName = prepareBranchForChangeFileName(branchName);
  const changeFileNameRegex = new RegExp(
    `/${formattedBranchName}_\\d{4}-\\d{2}-\\d{2}-\\d{2}-\\d{2}-\\d{2}-\\d{2}\\.json$`
  );
  return changeFileNameRegex.test(changeFileName);
};
