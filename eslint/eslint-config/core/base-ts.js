module.exports = {
  root: true,
  env: {
    "commonjs": true,
    "es2022": true,
    "node": true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['simple-import-sort'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', { peerDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'always',
        'cjs': 'always',
        'mjs': 'always'
      }
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'func-names': 'error',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-restricted-imports': [
      'error',
      {
        name: 'lodash',
        message: 'Use default imports from lodash/*.'
      }
    ],
  }
};