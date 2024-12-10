import { prepareBranchForChangeFileName } from '../prepareBranchForChangeFileName';

describe('prepareBranchForChangeFileName', () => {
  it('should replace forward slashes with hyphens', () => {
    expect.hasAssertions();
    const result = prepareBranchForChangeFileName('feature/branch/name');
    expect(result).toBe('feature-branch-name');
  });

  it('should return original string if no forward slashes', () => {
    expect.hasAssertions();
    const result = prepareBranchForChangeFileName('main');
    expect(result).toBe('main');
  });

  it('should handle multiple consecutive forward slashes', () => {
    expect.hasAssertions();
    const result = prepareBranchForChangeFileName('feature//branch///name');
    expect(result).toBe('feature--branch---name');
  });
});
