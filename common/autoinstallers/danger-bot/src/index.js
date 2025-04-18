const {
  dangerAssignee,
  dangerLockfileUpdate,
  dangerPrMergingTime,
  dangerPrSize,
  dangerPrTitle,
  dangerReviewers
} = require('./danger/index.js');

dangerAssignee();
dangerLockfileUpdate('rush');
dangerPrMergingTime(24);
dangerPrSize();
dangerPrTitle(
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test){1}(\([\w\-\.]+\))?(!)?: ([\w ])+([\s\S]*)/
);
dangerReviewers(1);

console.log('Danger bot plugins executed successfully.');
