module.exports = {
  extends: ['plugin:storybook/recommended'],
  overrides: [
    {
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        'storybook/hierarchy-separator': 'error',
        'storybook/prefer-pascal-case': 'error'
      }
    }
  ]
};
