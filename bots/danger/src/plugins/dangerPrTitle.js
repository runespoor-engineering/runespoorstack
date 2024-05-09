import { danger, warn } from 'danger';

/**
 * Checks if the title of the current Pull Request matches the provided pattern.
 *
 * @param {RegExp} titleRegex - The regular expression pattern to match the title against.
 *
 * @returns {void} - No return value. If the PR title does not match the pattern,
 * a warning message is logged.
 */
export const dangerPrTitle = (titleRegex) => {
  const { title } = danger.github.pr;
  const titleIsValid = titleRegex.test(title);
  if (!titleIsValid) {
    warn(`:exclamation: PR title does not match the pattern: ${titleRegex}`);
  }
};
