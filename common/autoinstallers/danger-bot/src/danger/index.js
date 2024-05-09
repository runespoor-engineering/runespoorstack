const dangerAssignee = require('./plugins/dangerAssignee.js');
const dangerChangelog = require('./plugins/dangerChangelog.js');
const dangerLockfileUpdate = require('./plugins/dangerLockfileUpdate.js');
const dangerPrMergingTime = require('./plugins/dangerPrMergingTime.js');
const dangerPrSize = require('./plugins/dangerPrSize.js');
const dangerPrTitle = require('./plugins/dangerPrTitle.js');
const dangerReviewers = require('./plugins/dangerReviewers.js');

module.exports = {
  dangerAssignee,
  dangerChangelog,
  dangerLockfileUpdate,
  dangerPrMergingTime,
  dangerPrSize,
  dangerPrTitle,
  dangerReviewers
};
