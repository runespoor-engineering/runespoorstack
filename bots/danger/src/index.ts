// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from 'danger/distribution/dsl/DangerDSL';

declare let danger: DangerDSLType;
export declare function info(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;
export declare function markdown(message: string): void;

/**
 * Checks if the pull request has an assignee.
 * If not, it warns or fails the pull request depending on whether the title includes 'WIP'.
 *
 * @returns {void}
 */
export const dangerAssignee = () => {
  if (!danger.github.pr.assignee) {
    const method = danger.github.pr.title.includes('WIP') ? warn : fail;
    method('This pull request needs an assignee, and optionally include any reviewers.');
  }
};

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'rush';

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
 * @returns {void} - No return value. If the conditions are met, it will execute info or warn methods.
 */
export const dangerLockfileUpdate = (type: PackageManager) => {
  const packageLockFileName = TYPE_TO_LOCKFILE_NAME[type];
  const isPackageChanged = danger.git.modified_files.some((file) => file.includes('package.json'));
  const isLockfileChanged = danger.git.modified_files.includes(packageLockFileName);
  if (isPackageChanged && !isLockfileChanged) {
    info(
      `Changes were made to package.json, but not to ${packageLockFileName}. - <i>Perhaps you need to install/update dependencies?</i>`
    );
  }
  if (isLockfileChanged && !isPackageChanged) {
    warn(
      `Changes were made to ${packageLockFileName}, but not to package.json. - <i>Perhaps you use not strict package versions and it may break your app</i>`
    );
  }
};

/**
 * Checks the time taken for a pull request to be merged.
 *
 * @param {number} [maxMergingTime=24] - The maximum allowed hours for a pull request to be merged.
 *
 * @returns {void} - If the pull request has been open for more than `maxMergingTime` hours, it warns on the pull request.
 */
export const dangerPrMergingTime = (maxMergingTime = 24) => {
  const isMerged = danger.github.pr.merged;
  const startDate = new Date(danger.github.pr.created_at).getTime();
  const endDate = isMerged ? new Date(danger.github.pr.merged_at!).getTime() : new Date().getTime();
  const hoursDiff = (endDate - startDate) / 3_600_000;
  const timeExceeded = hoursDiff > maxMergingTime;
  const method = timeExceeded ? warn : info;
  const warnMessage = `This pull request has been opened for ${Math.round(hoursDiff)} hours. It is too long, try to review and merge the PRs quickly`;
  const infoMessage = `This pull request has been opened for ${Math.round(hoursDiff)} hours. Great job!`;
  if (isMerged) {
    const message = timeExceeded ? warnMessage : infoMessage;
    method(message);
    return;
  }
  if (timeExceeded) {
    warn(warnMessage);
  }
};

/**
 * Checks if the Pull Request size is within the specified threshold.
 *
 * @param {number} [maxPrThreshold=600] - The maximum allowed PR size in terms
 * of additions and deletions.
 *
 * @returns {void} - No return value. If the PR size exceeds the threshold, a warning message is
 * logged.
 */
export const dangerPrSize = (maxPrThreshold = 600) => {
  if (danger.github.pr.additions + danger.github.pr.deletions > maxPrThreshold) {
    warn(
      ':exclamation: Big PR size. Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR. It will improve the CI process.'
    );
  }
};

/**
 * Checks if the title of the current Pull Request matches the provided pattern.
 *
 * @param {RegExp} titleRegex - The regular expression pattern to match the title against.
 *
 * @returns {void} - No return value. If the PR title does not match the pattern,
 * a warning message is logged.
 */
export const dangerPrTitle = (titleRegex: RegExp) => {
  const { title } = danger.github.pr;
  const titleIsValid = titleRegex.test(title);
  if (!titleIsValid) {
    warn(`:exclamation: PR title does not match the pattern: ${titleRegex}`);
  }
};

/**
 * Checks if the number of requested reviewers is greater than or equal to the required number of reviewers.
 *
 * @param {number} requiredReviewersCount - The required number of reviewers.
 *
 * @returns {void} - No return value. If the number of requested reviewers is less than the required number, the function fails the build.
 */
export const dangerReviewers = (requiredReviewersCount: number) => {
  const requestedReviewersCount = danger.github.requested_reviewers.users.length;
  if (requestedReviewersCount < requiredReviewersCount) {
    fail(`:exclamation: Please request at least ${requiredReviewersCount} reviewers.`);
  }
};
