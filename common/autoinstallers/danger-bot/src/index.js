import {
  dangerAssignee,
  dangerLockfileUpdate,
  dangerPrMergingTime,
  dangerPrSize,
  dangerPrTitle,
  dangerReviewers
} from '@runespoorstack/danger-plugins';

dangerAssignee();
dangerLockfileUpdate('rush');
dangerPrMergingTime(24);
dangerPrSize();
dangerPrTitle(
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test){1}(\([\w\-\.]+\))?(!)?: ([\w ])+([\s\S]*)/
);
dangerReviewers(1);
