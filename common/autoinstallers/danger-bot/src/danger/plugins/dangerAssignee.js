const { fail, warn } = require('danger');

/**
 * Checks if the pull request has an assignee.
 * If not, it warns or fails the pull request depending on whether the title includes 'WIP'.
 *
 * @returns {void}
 */
const dangerAssignee = () => {
  if (!danger.github.pr.assignee) {
    const method = danger.github.pr.title.includes('WIP') ? warn : fail;
    method('This pull request needs an assignee, and optionally include any reviewers.');
  }
};

module.exports = {
  dangerAssignee
};
