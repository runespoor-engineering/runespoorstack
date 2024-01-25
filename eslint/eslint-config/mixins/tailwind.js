module.exports = {
  extends: [
    'plugin:tailwindcss/recommended',
  ],
  settings: {
    tailwindcss: {
      callees: ['cn', 'classnames', 'clsx', 'ctl', 'cva', 'tv'],
      config: 'tailwind.config.js', // returned from `loadConfig()` utility if not provided
      cssFiles: ['**/*.css', '!**/node_modules', '!**/.*', '!**/dist', '!**/build'],
      cssFilesRefreshRate: 5_000,
      removeDuplicates: true,
      skipClassAttribute: false,
      whitelist: [],
      tags: [],
      classRegex: '^class(Name)?$'
    }
  }
}