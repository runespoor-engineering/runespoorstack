export const PACKAGE_JSON_FILE = 'package.json';

export enum ChangesTypes {
  Major = 'major',
  Minor = 'minor',
  Patch = 'patch',
  None = 'none'
}

export type ChangeData = {
  comment: string;
  type: ChangesTypes;
  author: string;
  issueLinks?: string[];
};

export type ChangelogRecord = {
  version: string;
  comment: string;
  type: ChangesTypes;
  date: string;
  author: string;
  issueLinks?: string[];
};

export enum ChangesTypesDescriptions {
  Major = 'These are breaking changes that are not backward compatible.\nExamples are: renaming a public class, adding/removing a non-optional parameter from a public API, or renaming a variable or function that is exported.',
  Minor = 'These are changes that are backward compatible (but not forward compatible).\nExamples are: adding a new public API or adding an optional parameter to a public API.',
  Patch = 'These are changes that are backward and forward-compatible.\nExamples are: Modifying a private API or fixing a bug in the logic of how an existing API works.',
  None = "These are changes that are backward and forward-compatible and don't require an immediate release.\nExamples are: Modifying dev tooling configurations like eslint."
}
