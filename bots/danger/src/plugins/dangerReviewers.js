import { danger, fail } from 'danger';

/**
 * Checks if the number of requested reviewers is greater than or equal to the required number of reviewers.
 *
 * @param {number} requiredReviewersCount - The required number of reviewers.
 *
 * @returns {void} - No return value. If the number of requested reviewers is less than the required number, the function fails the build.
 */
export const dangerReviewers = (requiredReviewersCount) => {
  const requestedReviewersCount = danger.github.requested_reviewers.length;
  if (requestedReviewersCount < requiredReviewersCount) {
    fail(`:exclamation: Please request at least ${requiredReviewersCount} reviewers.`);
  }
};
