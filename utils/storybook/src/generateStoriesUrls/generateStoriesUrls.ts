const generateStoryUrl = (
  storybookUrl: string,
  storyPathComponent: string,
  storyPathVariant: string
) => {
  if (!storybookUrl || !storyPathComponent || !storyPathVariant) return '';
  return `${storybookUrl}/index.html?path=/docs/${storyPathComponent}--${storyPathVariant}`;
};

const generateStoryPathComponent = (storyTitle: string) =>
  storyTitle?.split('/').join('-').toLowerCase();

const generateStoryPathVariant = (storyVariant: string) =>
  storyVariant
    ?.split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();

export type StorybookStructure = {
  title: string;
  variants: string[];
}[];

export const generateStoriesUrls = (
  storybookUrl: string,
  storybookStructure: StorybookStructure
) => {
  if (!storybookUrl || !storybookStructure) return [];
  return storybookStructure.reduce((storiesUrlsAcc, stories) => {
    if (!stories.title || !stories.variants) return storiesUrlsAcc;
    const storyPathComponent = generateStoryPathComponent(stories.title);
    const storiesUrls = stories.variants
      .map((storyVariant) =>
        generateStoryUrl(storybookUrl, storyPathComponent, generateStoryPathVariant(storyVariant))
      )
      .filter((url) => url);
    return [...storiesUrlsAcc, ...storiesUrls];
  }, [] as string[]);
};
