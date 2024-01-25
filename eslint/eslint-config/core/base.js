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
  settings: {
    jest: {
      version: 29
    }
  },
  plugins: ['simple-import-sort', 'jest', 'jest-formatting'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest-formatting/recommended'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: true,
        tabWidth: 2,
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'none',
        bracketSameLine: false
      },
      { usePrettierrc: false }
    ],
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
    'no-restricted-imports': [
      'error',
      {
        name: 'lodash',
        message: 'Use default imports from lodash/*.'
      }
    ],
    'func-names': 'error',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error']
  }
};