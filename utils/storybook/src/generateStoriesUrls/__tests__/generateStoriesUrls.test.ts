import { generateStoriesUrls, StorybookStructure } from '../generateStoriesUrls.ts';

describe('generateStoriesUrls', () => {
  it('should generate the story URLs based on the provided `storybookUrl` and `storybookStructure` arguments', () => {
    const mockStorybookUrl = 'https://storybook.example.com';
    const mockStorybookStructure = [
      { title: 'Components/Button', variants: ['Default', 'Primary', 'Secondary'] },
      { title: 'Components/Modal', variants: ['Basic', 'Large', 'Small'] }
    ];
    const result = generateStoriesUrls(mockStorybookUrl, mockStorybookStructure);
    expect(result).toEqual([
      'https://storybook.example.com/index.html?path=/docs/components-button--default',
      'https://storybook.example.com/index.html?path=/docs/components-button--primary',
      'https://storybook.example.com/index.html?path=/docs/components-button--secondary',
      'https://storybook.example.com/index.html?path=/docs/components-modal--basic',
      'https://storybook.example.com/index.html?path=/docs/components-modal--large',
      'https://storybook.example.com/index.html?path=/docs/components-modal--small'
    ]);
  });

  it('should generate the story path component by replacing `/` symbols with `-` one and setting the sting to lower case', () => {
    const mockStorybookUrl = 'https://storybook.example.com';
    const mockStorybookStructure = [
      {
        title: 'Components/SomeCategory/ComponentName',
        variants: ['Default']
      }
    ];
    const result = generateStoriesUrls(mockStorybookUrl, mockStorybookStructure);
    expect(result).toEqual([
      'https://storybook.example.com/index.html?path=/docs/components-somecategory-componentname--default'
    ]);
  });

  it('should generate the story path variant by splitting by capital letter, joining by `-` symbol, and setting the string to lower case', () => {
    const mockStorybookUrl = 'https://storybook.example.com';
    const mockStorybookStructure = [
      { title: 'Components/Button', variants: ['DefaultStoryVariant'] }
    ];
    const result = generateStoriesUrls(mockStorybookUrl, mockStorybookStructure);
    expect(result).toEqual([
      'https://storybook.example.com/index.html?path=/docs/components-button--default-story-variant'
    ]);
  });

  it('should return an empty array if `storybookUrl` is not provided', () => {
    const mockStorybookUrl = undefined as unknown as string;
    const mockStorybookStructure = [
      { title: 'Components/Button', variants: ['Default', 'Primary', 'Secondary'] },
      { title: 'Components/Modal', variants: ['Basic', 'Large', 'Small'] }
    ];
    const result = generateStoriesUrls(mockStorybookUrl, mockStorybookStructure);
    expect(result).toEqual([]);
  });

  it('should return an empty array if `storybookStructure` is not provided', () => {
    const mockStorybookUrl = 'https://storybook.example.com';
    const mockStorybookStructure = undefined as unknown as StorybookStructure;
    const result = generateStoriesUrls(mockStorybookUrl, mockStorybookStructure);
    expect(result).toEqual([]);
  });

  it('should return an empty array if `storybookStructure` is empty', () => {
    const mockStorybookUrl = 'https://storybook.example.com';
    const mockStorybookStructure = [] as StorybookStructure;
    const result = generateStoriesUrls(mockStorybookUrl, mockStorybookStructure);
    expect(result).toEqual([]);
  });

  it('should skip the story URL if story title is not provided', () => {
    const mockStorybookUrl = 'https://storybook.example.com';
    const mockStorybookStructure = [
      { title: undefined, variants: ['Default', 'Primary', 'Secondary'] },
      { title: 'Components/Modal', variants: ['Basic', 'Large', 'Small'] }
    ];
    const result = generateStoriesUrls(
      mockStorybookUrl,
      mockStorybookStructure as StorybookStructure
    );
    expect(result).toEqual([
      'https://storybook.example.com/index.html?path=/docs/components-modal--basic',
      'https://storybook.example.com/index.html?path=/docs/components-modal--large',
      'https://storybook.example.com/index.html?path=/docs/components-modal--small'
    ]);
  });

  it('should skip the story URL if story variants is not provided', () => {
    const mockStorybookUrl = 'https://storybook.example.com';
    const mockStorybookStructure = [
      { title: 'Components/Button' },
      { title: 'Components/Modal', variants: ['Basic', 'Large', 'Small'] }
    ] as StorybookStructure;
    const result = generateStoriesUrls(mockStorybookUrl, mockStorybookStructure);
    expect(result).toEqual([
      'https://storybook.example.com/index.html?path=/docs/components-modal--basic',
      'https://storybook.example.com/index.html?path=/docs/components-modal--large',
      'https://storybook.example.com/index.html?path=/docs/components-modal--small'
    ]);
  });

  it('should skip the story URL if story variant is not provided', () => {
    const mockStorybookUrl = 'https://storybook.example.com';
    const mockStorybookStructure = [
      { title: 'Components/Button', variants: [undefined, 'Primary', 'Secondary'] },
      { title: 'Components/Modal', variants: ['Basic', 'Large', 'Small'] }
    ] as StorybookStructure;
    const result = generateStoriesUrls(mockStorybookUrl, mockStorybookStructure);
    expect(result).toEqual([
      'https://storybook.example.com/index.html?path=/docs/components-button--primary',
      'https://storybook.example.com/index.html?path=/docs/components-button--secondary',
      'https://storybook.example.com/index.html?path=/docs/components-modal--basic',
      'https://storybook.example.com/index.html?path=/docs/components-modal--large',
      'https://storybook.example.com/index.html?path=/docs/components-modal--small'
    ]);
  });
});
