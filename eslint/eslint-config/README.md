<div align="center">
  <h1>@runespoorstack/eslint-config</h1>
  <p>Stop maintaining hundreds of eslint configs in you projects. Start using the battle tested, ready for production et of Runespoor ESlint configs just with 4 lines of code.</p>
  <div>
    <a href="https://www.buymeacoffee.com/borisshulyak" target="_blank">
      <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
    </a>
  </div>
  <a href="https://github.com/runespoor-engineering/runespoorstack/blob/main/LICENSE">
    <img alt="GitHub License" src="https://img.shields.io/github/license/runespoor-engineering/runespoorstack">
  </a>
  <a href="https://github.com/runespoor-engineering/runespoorstack/issues">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/runespoor-engineering/runespoorstack?color=5d2de0">
  </a>
  <a href="https://www.npmjs.com/package/@runespoorstack/eslint-config">
    <img alt="npm downloads" src="https://img.shields.io/npm/dw/@runespoorstack/eslint-config">
  </a>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [✨ Features](#-features)
- [🦾 Installation](#-installation)
- [♾️ Usage](#️-usage)
  - [Choose the core config](#choose-the-core-config)
  - [Choose a mixins](#choose-a-mixins)
  - [Add your own rules](#add-your-own-rules)
  - [⚠️ `no-restricted-imports` overrides](#️-no-restricted-imports-overrides)
  - [⚠️ Linting `.storybook` folder](#️-linting-storybook-folder)
  - [Run `eslint`](#run-eslint)
- [🛠️ Contributing](#️-contributing)
- [💕 Special Thanks](#-special-thanks)
- [❤️ Support or Donate](#️-support-or-donate)

## ✨ Features

- Provides a full, battle tested, ready for production set of Runespoor ESlint configs.
- Well managed system of separated `core` and `mixins` configs:
  - `core/base-js`
  - `core/base-ts`
  - `core/react-js`
  - `core/react-ts`
  - `mixins/prettier`
  - `mixins/tailwind`
  - `mixins/jest`
  - `mixins/vitest`
- Out of the box `no-restricted-imports` rules that will save your time on dealing with bundle size.
- The configs are created over the best `eslint` plugin and configs:
  - `eslint-config-airbnb-base`
  - `eslint-config-airbnb`
  - `@typescript-eslint/parser`
  - `@typescript-eslint/eslint-plugin`
  - `eslint-plugin-prettier`
  - `eslint-config-prettier`
  - `eslint-plugin-jest`
  - `eslint-plugin-jest-formatting`
  - `eslint-plugin-import`
  - `eslint-plugin-simple-import-sort`
  - `eslint-import-resolver-custom-alias`
  - `eslint-plugin-jsx-a11y`
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-storybook`
  - `eslint-plugin-tailwindcss`
  - `eslint-plugin-testing-library`
  - `eslint-plugin-vitest`

## 🦾 Installation

```shell
npm i --save-dev @runespoorstack/eslint-config @rushstack/eslint-config@latest eslint@latest prettier@latest typescript@latest 
```

## ♾️ Usage

Create `.eslintrc.cjs` in the root of the project.

### Choose the core config

Use a native JavaScript base config:

```javascript
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  "extends": ["@runespoorstack/eslint-config/core/base-js"]
}
```

Use a TypeScript base config:

```javascript
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  "extends": ["@runespoorstack/eslint-config/core/base-ts"]
}
```

Use a native React base config:

```javascript
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  ignorePatterns: ['!.storybook'],
  "extends": ["@runespoorstack/eslint-config/core/react-js"]
}
```

Use a TypesScript React base config:

```javascript
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  ignorePatterns: ['!.storybook'],
  "extends": ["@runespoorstack/eslint-config/core/react-ts"]
}
```

### Choose a mixins

Use a Prettier mixin:

```javascript
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  ignorePatterns: ['!.storybook'],
  "extends": [
    "@runespoorstack/eslint-config/core/react-js", 
    "@runespoorstack/eslint-config/mixins/prettier"
  ]
}
```

Use a Tailwind mixin:

```javascript
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  ignorePatterns: ['!.storybook'],
  "extends": [
    "@runespoorstack/eslint-config/core/react-ts", 
    "@runespoorstack/eslint-config/mixins/prettier", 
    "@runespoorstack/eslint-config/mixins/tailwind"
  ]
}
```

Use a Jest mixin:

```javascript
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  ignorePatterns: ['!.storybook'],
  "extends": [
    "@runespoorstack/eslint-config/core/react-js", 
    "@runespoorstack/eslint-config/mixins/prettier", 
    "@runespoorstack/eslint-config/mixins/tailwind", 
  ],
   overrides: [
    {
       files: ['**/*.@(spec|test).[tj]s?(x)'], // or any other pattern
      extends: [
        '@runespoorstack/eslint-config/mixins/jest'
      ]
    }
  ]
}
```

Use a Vitest mixin:

```javascript
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  ignorePatterns: ['!.storybook'],
  "extends": [
    "@runespoorstack/eslint-config/core/react-js", 
    "@runespoorstack/eslint-config/mixins/prettier", 
    "@runespoorstack/eslint-config/mixins/tailwind", 
  ],
   overrides: [
    {
      files: ['**/*.@(spec|test).[tj]s?(x)'], // or any other pattern
      extends: [
        '@runespoorstack/eslint-config/mixins/vitest'
      ]
    }
  ]
}
```

### Add your own rules

```javascript
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  ignorePatterns: ['!.storybook'],
  "extends": [
    "@runespoorstack/eslint-config/core/react-js", 
    "plugin:@tanstack/eslint-plugin-query/recommended"
  ]
}
```

### ⚠️ `no-restricted-imports` overrides

Be careful with adding your own `no-restricted-imports` rules!
We use a set of predefined restriction rules to protect you from serious mistakes out of the box:

- `Use default imports from lodash/*.` - to save your bundle size.
- `Use custom 'render', 'renderHook' methods.` - to cover the 80% usage of these methods (you commonly use only the custom once).
- `Please use default @mui/icons-material/* import instead.` - to save your bundle size.
- `Use default imports from @mui/material/<Component>` - to save your bundle size.
= `MUI: Do not use the third level imports` - to save your bundle size.

If you define your own `no-restricted-imports`, all the predefined once would be cleared.
So in case of adding new rules or overriding only the separate rule, you should copy and paste the full `no-restricted-imports` rule definition from our source code.

### ⚠️ Linting `.storybook` folder

Make sure you have remove `.storybook` from ignore patterns to be able to lint this folder. By default eslint ignore all the `.*` files.

Use `ignorePatterns: ['!.storybook'],`

### Run `eslint`

Run `eslint` check:

```shell
eslint . --ext .ts,.tsx,.js,.jsx,.cjs,.mjs --quiet
```

Run `eslint` autofix:

```shell
eslint . --ext .ts,.tsx,.js,.jsx,.cjs,.mjs --fix
```

## 🛠️ Contributing

See the [CONTRIBUTING.md](https://github.com/runespoor-engineering/runespoorstack/blob/main/CONTRIBUTING.md) document.

## 💕 Special Thanks

- I want to say thank you to the best woman in the world, **my wife Diana** for her love, daily support, motivation and inspiration.

## ❤️ Support or Donate

If you are enjoying this work and feel extra appreciative, you could [buy me a book](https://bmc.link/borisshulyak)
📖 or 3 📖📖📖.
