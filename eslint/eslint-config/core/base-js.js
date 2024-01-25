module.exports = {
  root: true,
  env: {
    "commonjs": true,
    "es2022": true,
    "node": true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['simple-import-sort'],
  extends: [
    'airbnb-base'
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
    'no-restricted-imports': [
      'error',
      {
        name: 'lodash',
        message: 'Use default imports from lodash/*.'
      }
    ],
  }
};