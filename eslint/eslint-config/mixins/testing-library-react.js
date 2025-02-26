module.exports = {
  extends: ['plugin:testing-library/react'],
  rules: {
    'testing-library/consistent-data-testid': [
      'error',
      { testIdPattern: '^{fileName}-([A-Za-z]+-?)+$' }
    ],
    'testing-library/no-debugging-utils': [
      'error',
      {
        utilsToCheckFor: {
          debug: true,
          logTestingPlaygroundURL: true,
          prettyDOM: true,
          logRoles: true,
          logDOM: true,
          prettyFormat: true
        }
      }
    ],
    'testing-library/prefer-explicit-assert': 'error',
    'testing-library/prefer-user-event': ['error', { allowedMethods: [] }]
  }
};
