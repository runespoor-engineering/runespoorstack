require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    'storybook-static',
    'html',
    'coverage',
    '!.storybook'
  ],
  extends: [
    '@runespoorstack/eslint-config/core/react-ts',
    '@runespoorstack/eslint-config/mixins/prettier',
    '@runespoorstack/eslint-config/mixins/tailwind'
  ],
  overrides: [
    {
      files: ['**/*.@(spec|test).[tj]s?(x)'],
      extends: ['@runespoorstack/eslint-config/mixins/vitest']
    }
  ]
};
