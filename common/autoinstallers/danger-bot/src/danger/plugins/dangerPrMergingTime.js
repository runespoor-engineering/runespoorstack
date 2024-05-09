const { warn, info } = require('danger');

/**
 * Checks the time taken for a pull request to be merged.
 *
 * @param {number} [maxMergingTime=24] - The maximum allowed hours for a pull request to be merged.
 *
 * @returns {void} - If the pull request has been open for more than `maxMergingTime` hours, it warns on the pull request.
 */
const dangerPrMergingTime = (maxMergingTime = 24) => {
  const startDate = new Date(danger.github.pr.created_at).getTime();
  const endDate = danger.github.pr.merged
    ? new Date(danger.github.pr.merged_at).getTime()
    : new Date().getTime();
  const hoursDiff = (endDate - startDate) / 3_600_000;
  const timeExceeded = hoursDiff > maxMergingTime;
  const method = timeExceeded ? warn : info;
  const warnMessage = `This pull request has been opened for ${Math.round(hoursDiff)} hours. It is too long, try to review and merge the PRs quickly`;
  const infoMessage = `This pull request has been opened for ${Math.round(hoursDiff)} hours. Great job!`;
  if (danger.github.pr.merged) {
    const message = timeExceeded ? warnMessage : infoMessage;
    method(message);
    return;
  }
  if (timeExceeded) {
    warn(warnMessage);
  }
};

module.exports = { dangerPrMergingTime };
