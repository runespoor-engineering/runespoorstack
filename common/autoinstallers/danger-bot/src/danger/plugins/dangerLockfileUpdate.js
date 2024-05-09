const TYPE_TO_LOCKFILE_NAME = {
  npm: 'package-lock.json',
  yarn: 'yarn.lock',
  pnpm: 'pnpm-lock.yaml',
  rush: 'pnpm-lock.yaml'
};

/**
 * Checks if package.json has been modified and if the corresponding lockfile has not been updated.
 *
 * @param {string} type - The type of package manager used (e.g., 'npm', 'yarn', 'pnpm', 'rush').
 *
 * @returns {void} - No return value. If the conditions are met, it will fail the build
 * with a message.
 */
const dangerLockfileUpdate = ({ type }) => {
  const packageLockFileName = TYPE_TO_LOCKFILE_NAME[type];
  const isPackageChanged = danger.git.modified_files.includes('package.json');
  const isLockfileChanged = danger.git.modified_files.includes(packageLockFileName);
  if (isPackageChanged && !isLockfileChanged) {
    fail(
      `Changes were made to package.json, but not to ${packageLockFileName}. - <i>Perhaps you need to install/update dependencies?</i>`
    );
  }
};

module.exports = {
  dangerLockfileUpdate
};
