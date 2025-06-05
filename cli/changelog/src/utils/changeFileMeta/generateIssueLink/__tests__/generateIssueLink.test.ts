import { generateIssueLink } from '../generateIssueLink';

describe('generateIssueLink', () => {
  it('should replace issue ID placeholder with actual ID', () => {
    expect.hasAssertions();

    const result = generateIssueLink({
      issueId: '123',
      issueLinkPattern: 'https://github.com/org/repo/issues/{{issueId}}'
    });

    expect(result).toBe('https://github.com/org/repo/issues/123');
  });

  it('should handle different placeholder formats and link patterns', () => {
    expect.hasAssertions();

    const result = generateIssueLink({
      issueId: 'ABC-123',
      issueLinkPattern: 'https://jira.company.com/{{issueId}}/browse'
    });

    expect(result).toBe('https://jira.company.com/ABC-123/browse');
  });

  it('should return `undefined` if `issueId` is not provided', () => {
    expect.hasAssertions();

    const result = generateIssueLink({
      issueId: '',
      issueLinkPattern: 'https://jira.company.com/{{issueId}}/browse'
    });

    expect(result).toBeUndefined();
  });
});
