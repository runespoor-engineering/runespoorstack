require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: [
    '@runespoorstack/eslint-config/core/react-js',
    '@runespoorstack/eslint-config/mixins/prettier'
  ],
  rules: {
    'import/no-unresolved': ['error', { ignore: ['^@theme', '^@docusaurus'] }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@site': '.'
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
