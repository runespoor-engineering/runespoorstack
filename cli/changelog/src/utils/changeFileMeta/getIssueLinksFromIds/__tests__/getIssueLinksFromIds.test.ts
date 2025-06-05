import { getIssueLinksFromIds } from '../getIssueLinksFromIds';

describe('getIssueLinksFromIds', () => {
  const issueLinkPattern = 'https://example.com/issues/{{id}}';

  it('should generate links for multiple comma-separated IDs', () => {
    expect.hasAssertions();

    const issueIds = 'ABC-123,DEF-456,GHI-789';
    const result = getIssueLinksFromIds(issueIds, issueLinkPattern);

    expect(result).toStrictEqual([
      'https://example.com/issues/ABC-123',
      'https://example.com/issues/DEF-456',
      'https://example.com/issues/GHI-789'
    ]);
  });

  it('should handle IDs with spaces around them', () => {
    expect.hasAssertions();

    const issueIds = ' ABC-123 , DEF-456,  GHI-789 ';
    const result = getIssueLinksFromIds(issueIds, issueLinkPattern);

    expect(result).toStrictEqual([
      'https://example.com/issues/ABC-123',
      'https://example.com/issues/DEF-456',
      'https://example.com/issues/GHI-789'
    ]);
  });

  it('should handle a single ID', () => {
    expect.hasAssertions();

    const issueIds = 'ABC-123';
    const result = getIssueLinksFromIds(issueIds, issueLinkPattern);

    expect(result).toStrictEqual(['https://example.com/issues/ABC-123']);
  });

  it('should filter out empty IDs', () => {
    expect.hasAssertions();

    const issueIds = 'ABC-123,,DEF-456, ,GHI-789';
    const result = getIssueLinksFromIds(issueIds, issueLinkPattern);

    expect(result).toStrictEqual([
      'https://example.com/issues/ABC-123',
      'https://example.com/issues/DEF-456',
      'https://example.com/issues/GHI-789'
    ]);
  });

  it('should return an empty array for empty input', () => {
    expect.hasAssertions();

    const issueIds = '';
    const result = getIssueLinksFromIds(issueIds, issueLinkPattern);

    expect(result).toStrictEqual([]);
  });

  it('should return an empty array for input with only spaces and commas', () => {
    expect.hasAssertions();

    const issueIds = ' , , ';
    const result = getIssueLinksFromIds(issueIds, issueLinkPattern);

    expect(result).toStrictEqual([]);
  });

  it('should work with different link patterns', () => {
    expect.hasAssertions();

    const issueIds = 'ABC-123';
    const customPattern = 'https://custom-domain.com/ticket/{{id}}';
    const result = getIssueLinksFromIds(issueIds, customPattern);

    expect(result).toStrictEqual(['https://custom-domain.com/ticket/ABC-123']);
  });

  it('should work with a complex issue ID format', () => {
    expect.hasAssertions();

    const issueIds = 'PROJECT-123,TEAM-456';
    const result = getIssueLinksFromIds(issueIds, issueLinkPattern);

    expect(result).toStrictEqual([
      'https://example.com/issues/PROJECT-123',
      'https://example.com/issues/TEAM-456'
    ]);
  });

  it('should handle unusual characters in issue IDs', () => {
    expect.hasAssertions();

    const issueIds = 'ABC_123,XYZ.789';
    const result = getIssueLinksFromIds(issueIds, issueLinkPattern);

    expect(result).toStrictEqual([
      'https://example.com/issues/ABC_123',
      'https://example.com/issues/XYZ.789'
    ]);
  });
});
