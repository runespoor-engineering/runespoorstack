import { testChangeFilePathByBranchName } from '../testChangeFilePathByBranchName';

describe('testChangeFilePathByBranchName', () => {
  it('should return true when change file path matches branch name', () => {
    expect.hasAssertions();

    const result = testChangeFilePathByBranchName({
      branchName: 'feature/test',
      changeFilePath: '/path/to/feature-test_2023-01-01.json'
    });

    expect(result).toBeTruthy();
  });

  it('should return false when change file path does not match branch name', () => {
    expect.hasAssertions();

    const result = testChangeFilePathByBranchName({
      branchName: 'feature/test',
      changeFilePath: '/path/to/other-branch_2023-01-01.json'
    });

    expect(result).toBeFalsy();
  });

  it('should handle remote name prefix correctly', () => {
    expect.hasAssertions();

    const result = testChangeFilePathByBranchName({
      branchName: 'origin/feature/test',
      changeFilePath: '/path/to/feature-test_2023-01-01.json',
      remoteName: 'origin'
    });

    expect(result).toBeTruthy();
  });

  it('should handle branch names without slashes', () => {
    expect.hasAssertions();

    const result = testChangeFilePathByBranchName({
      branchName: 'main',
      changeFilePath: '/path/to/main_2023-01-01.json'
    });

    expect(result).toBeTruthy();
  });

  it('should handle multiple consecutive slashes in branch name', () => {
    expect.hasAssertions();

    const result = testChangeFilePathByBranchName({
      branchName: 'feature//branch///name',
      changeFilePath: '/path/to/feature--branch---name_2023-01-01.json'
    });

    expect(result).toBeTruthy();
  });
});
