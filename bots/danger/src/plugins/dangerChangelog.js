const { danger, fail } = require('danger');

const dangerChangelog = (filesRegexToChangelogMap, changelogsList) => {
  const shouldAdjustChangelog = filesRegexToChangelogMap.some(
    ([filesRegex, changelogRegex]) =>
      danger.git.modified_files.some((fileName) => fileName.match(filesRegex)) &&
      !danger.git.modified_files.some((fileName) => fileName.match(changelogRegex))
  );
  if (shouldAdjustChangelog) {
    const changelogsMarkdown = changelogsList?.map((changelog) => `<br/>- ${changelog}`).join('');
    const findChangelogMessage = changelogsMarkdown
      ? `Try to find the necessary changelog files: ${changelogsMarkdown}`
      : '';
    fail(`:exclamation: Changes require the changelog to be updated. ${findChangelogMessage}`);
  }
};

module.exports = {
  dangerChangelog
};
