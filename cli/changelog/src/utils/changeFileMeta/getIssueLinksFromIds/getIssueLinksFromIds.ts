import { generateIssueLink } from '../generateIssueLink/generateIssueLink';

export const getIssueLinksFromIds = (issueIds: string, issueLinkPattern: string): string[] => {
  return issueIds
    .split(',')
    .map((issueId) => issueId.trim())
    .filter((issueId) => Boolean(issueId))
    .map((issueId) => generateIssueLink({ issueId, issueLinkPattern })) as string[];
};
