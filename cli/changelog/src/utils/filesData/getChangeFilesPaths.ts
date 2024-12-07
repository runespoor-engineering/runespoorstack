import { getDeepFilesFromDir } from '@runespoorstack/files-system-utils';

import { getDateFromChangeFileName } from '../changeFileMeta/getDateFromChangeFileName';
import { getChangesDirectoryPath } from '../paths/getChangesDirectoryPath';

export const getChangeFilesPaths = () => {
  const changeFilesPaths = getDeepFilesFromDir(getChangesDirectoryPath(), /\.json$/);
  const sortedChangeFilesPaths = changeFilesPaths.sort((file1, file2) => {
    const date1 = getDateFromChangeFileName(file1);
    const date2 = getDateFromChangeFileName(file2);
    return date1!.getTime() - date2!.getTime();
  });
  return sortedChangeFilesPaths;
};
