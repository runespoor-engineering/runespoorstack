module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2022: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['simple-import-sort', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        shorthandFirst: true,
        callbacksLast: true,
        reservedFirst: ['key', 'ref']
      }
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/no-unstable-nested-components': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        cjs: 'never',
        mjs: 'never',
        ts: 'never',
        jsx: 'never',
        tsx: 'never'
      }
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { peerDependencies: true }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            message: 'Use default imports from lodash/*.'
          },
          {
            name: '@testing-library/react',
            importNames: ['render', 'renderHook'],
            message: 'Use custom `render`, `renderHook` methods.'
          },
          {
            name: '@mui/icons-material',
            message: 'MUI: Please use default @mui/icons-material/* import instead.'
          },
          {
            name: '@mui/material',
            message: 'MUI: Use default imports from @mui/material/<Component> '
          }
        ],
        patterns: [
          {
            group: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
            message: 'MUI: Do not use the third level imports'
          }
        ]
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src'
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
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
