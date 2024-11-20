import semverInc from 'semver/functions/inc';

import { ChangesTypes } from '../../types/common';

export const bumpSemver = (currentPackageVersion: string, changeType: ChangesTypes) => {
  if (changeType === ChangesTypes.None) {
    return currentPackageVersion;
  }
  return semverInc(currentPackageVersion, changeType);
};
