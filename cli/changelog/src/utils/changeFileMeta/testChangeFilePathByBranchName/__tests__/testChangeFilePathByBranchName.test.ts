import { testChangeFilePathByBranchName } from '../testChangeFilePathByBranchName';

describe('testChangeFilePathByBranchName', () => {
  it('should return `true` when paths match', () => {
    expect.hasAssertions();
    const result = testChangeFilePathByBranchName({
      branchName: 'feature/test-branch',
      changeFilePath: `/path/to/changes/feature-test-branch_2024-12-10-19-30-03-23.json`
    });
    expect(result).toBeTruthy();
  });

  it('should return `false` when branch names do not match', () => {
    expect.hasAssertions();
    const result = testChangeFilePathByBranchName({
      branchName: 'feature/test-branch',
      changeFilePath: `/path/to/changes/different-branch_2024-12-10-19-30-03-23.json`
    });
    expect(result).toBeFalsy();
  });

  it('should handle branch names with multiple slashes', () => {
    expect.hasAssertions();
    const result = testChangeFilePathByBranchName({
      branchName: 'feature/test/branch/name',
      changeFilePath: `/path/to/changes/feature-test-branch-name_2024-12-10-19-30-03-23.json`
    });
    expect(result).toBeTruthy();
  });
});
