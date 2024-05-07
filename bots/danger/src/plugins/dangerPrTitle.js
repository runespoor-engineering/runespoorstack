import { danger, warn } from 'danger';

/**
 * Checks if the title of the current Pull Request matches the provided pattern.
 *
 * @param {RegExp} pattern - The regular expression pattern to match the title against.
 *
 * @returns {void} - No return value. If the PR title does not match the pattern,
 * a warning message is logged.
 */
export const dangerPrTitle = (pattern) => {
  const { title } = danger.github.pr;
  const titleIsValid = pattern.test(title);
  if (!titleIsValid) {
    warn(`:exclamation: PR title does not match the pattern: ${pattern}`);
  }
};
