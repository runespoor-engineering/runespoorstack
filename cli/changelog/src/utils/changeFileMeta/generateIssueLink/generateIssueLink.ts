import { ISSUE_ID_REGEXP } from '../../../constants/regexp';

export const generateIssueLink = ({
  issueId,
  issueLinkPattern
}: {
  issueId: string;
  issueLinkPattern: string;
}) => {
  if (!issueId) return undefined;
  const issueLink = issueLinkPattern.replace(ISSUE_ID_REGEXP, issueId);
  return issueLink;
};
