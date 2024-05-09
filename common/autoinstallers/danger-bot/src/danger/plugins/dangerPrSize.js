const { warn } = require('danger');

/**
 * Checks if the Pull Request size is within the specified threshold.
 *
 * @param {number} [maxPrThreshold=600] - The maximum allowed PR size in terms
 * of additions and deletions.
 *
 * @returns {void} - No return value. If the PR size exceeds the threshold, a warning message is
 * logged.
 */
const dangerPrSize = (maxPrThreshold = 600) => {
  if (danger.github.pr.additions + danger.github.pr.deletions > maxPrThreshold) {
    warn(
      ':exclamation: Big PR size. Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR. It will improve the CI process.'
    );
  }
};

module.exports = { dangerPrSize };
