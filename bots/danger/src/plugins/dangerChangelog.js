import { danger, fail } from 'danger';

/**
 * This function checks if the user's git changes are in the specified file patterns and if so, it fails the build with a message to update the changelog.
 *
 * @param {Array<RegExp>} filePatterns - An array of regular expressions representing the file patterns to check for.
 * @param {Array<string>} changelogsList - An array of strings representing the changelogs file paths.
 *
 * @returns {void} - No return value. If the conditions are met, it will fail the build.
 */
export const dangerChangelog = (filePatterns, changelogsList) => {
  const shouldAdjustChangelog = danger.git.modified_files.some((fileName) =>
    filePatterns.some((pattern) => fileName.match(pattern))
  );
  if (shouldAdjustChangelog) {
    const changelogsMarkdown = changelogsList?.map((changelog) => `<br/>- ${changelog}`).join('');
    const findChangelogMessage = changelogsMarkdown
      ? `Try to find the necessary changelog files: ${changelogsMarkdown}`
      : '';
    fail(`:exclamation: Changes require the changelog to be updated. ${findChangelogMessage}`);
  }
};
