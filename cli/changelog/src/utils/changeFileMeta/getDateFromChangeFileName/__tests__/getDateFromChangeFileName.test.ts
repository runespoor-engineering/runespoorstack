import { getDateFromChangeFileName } from '../getDateFromChangeFileName';

describe('getDateFromChangeFileName', () => {
  it('should return null for invalid filename format', () => {
    expect.hasAssertions();
    expect(getDateFromChangeFileName('invalid-filename')).toBeNull();
    expect(getDateFromChangeFileName('')).toBeNull();
  });

  it('should correctly parse date from valid filename', () => {
    expect.hasAssertions();

    const result = getDateFromChangeFileName('branch-name_2023-12-25-14-30-45-123.json');

    expect(result).toBeInstanceOf(Date);
    expect(result?.toISOString().startsWith('2023-12-25T14:30:45')).toBeTruthy();
  });
});
