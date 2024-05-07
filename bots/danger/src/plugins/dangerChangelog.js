import { danger, fail } from 'danger';

export const dangerChangelog = (filePatternsToChangelogMap, changelogsList) => {
  const shouldAdjustChangelog = filePatternsToChangelogMap.some(
    ([filePatterns, changelogPattern]) =>
      filePatterns.some(
        (filePattern) =>
          danger.git.modified_files.some((fileName) => fileName.match(filePattern)) &&
          !danger.git.modified_files.some((fileName) => fileName.match(changelogPattern))
      )
  );
  if (shouldAdjustChangelog) {
    const changelogsMarkdown = changelogsList?.map((changelog) => `<br/>- ${changelog}`).join('');
    const findChangelogMessage = changelogsMarkdown
      ? `Try to find the necessary changelog files: ${changelogsMarkdown}`
      : '';
    fail(`:exclamation: Changes require the changelog to be updated. ${findChangelogMessage}`);
  }
};
