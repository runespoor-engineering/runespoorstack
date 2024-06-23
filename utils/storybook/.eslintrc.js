// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: [
    '@runespoorstack/eslint-config/core/base-ts',
    '@runespoorstack/eslint-config/mixins/prettier',
    '@runespoorstack/eslint-config/mixins/jest'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
