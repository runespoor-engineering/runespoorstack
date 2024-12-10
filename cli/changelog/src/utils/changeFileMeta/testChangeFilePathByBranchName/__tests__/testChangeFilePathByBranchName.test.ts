import { testChangeFilePathByBranchName } from '../testChangeFilePathByBranchName';

describe('testChangeFilePathByBranchName', () => {
  it('should return `true` for valid change file name matching branch', () => {
    expect.hasAssertions();
    const result = testChangeFilePathByBranchName({
      branchName: 'feature/test-branch',
      changeFileName: '/path/to/feature-test-branch_2024-01-15-10-30-45-00.json'
    });
    expect(result).toBeTruthy();
  });

  it('should return `false` for change file from different branch', () => {
    expect.hasAssertions();
    const result = testChangeFilePathByBranchName({
      branchName: 'feature/test-branch',
      changeFileName: '/path/to/other-branch_2024-01-15-10-30-45-00.json'
    });
    expect(result).toBeFalsy();
  });

  it('should return `false` for invalid date format', () => {
    expect.hasAssertions();
    const result = testChangeFilePathByBranchName({
      branchName: 'feature/test-branch',
      changeFileName: '/path/to/feature-test-branch_2024-01-15.json'
    });
    expect(result).toBeFalsy();
  });

  it('should return `false` for invalid file extension', () => {
    expect.hasAssertions();
    const result = testChangeFilePathByBranchName({
      branchName: 'feature/test-branch',
      changeFileName: '/path/to/feature-test-branch_2024-01-15-10-30-45-00.txt'
    });
    expect(result).toBeFalsy();
  });
});
