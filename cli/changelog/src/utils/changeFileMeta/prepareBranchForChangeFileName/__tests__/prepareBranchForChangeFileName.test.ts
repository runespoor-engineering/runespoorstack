import { prepareBranchForChangeFileName } from '../prepareBranchForChangeFileName';

describe('prepareBranchForChangeFileName', () => {
  it('should replace forward slashes with hyphens', () => {
    expect.hasAssertions();
    const result = prepareBranchForChangeFileName({ branchName: 'feature/branch/name' });
    expect(result).toBe('feature-branch-name');
  });

  it('should return original string if no forward slashes', () => {
    expect.hasAssertions();
    const result = prepareBranchForChangeFileName({ branchName: 'main' });
    expect(result).toBe('main');
  });

  it('should handle multiple consecutive forward slashes', () => {
    expect.hasAssertions();
    const result = prepareBranchForChangeFileName({ branchName: 'feature//branch///name' });
    expect(result).toBe('feature--branch---name');
  });

  it('should remove remote name prefix if provided', () => {
    expect.hasAssertions();
    const result = prepareBranchForChangeFileName({
      branchName: 'origin/feature/branch',
      remoteName: 'origin'
    });
    expect(result).toBe('feature-branch');
  });

  it('should handle branch name without remote prefix', () => {
    expect.hasAssertions();
    const result = prepareBranchForChangeFileName({
      branchName: 'feature/branch',
      remoteName: 'origin'
    });
    expect(result).toBe('feature-branch');
  });
});
