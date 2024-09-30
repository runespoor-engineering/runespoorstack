<div align="center">
  <h1>@runespoorstack/feature-toggles-imperative</h1>
  <p>Imperative feature toggles as code for JavaScript and TypeScript.</p>
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
  <a href="https://www.npmjs.com/package/@runespoorstack/feature-toggles-imperative">
    <img alt="npm downloads" src="https://img.shields.io/npm/dw/@runespoorstack/feature-toggles-imperative">
  </a>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Context](#context)
- [✨ Features](#-features)
- [🦾 Installation](#-installation)
- [♾️ Usage](#️-usage)
- [🛠️ Contributing](#️-contributing)
- [💕 Special Thanks](#-special-thanks)
- [❤️ Support or Donate](#️-support-or-donate)

## Context

This package implement something that is called [Release Feature Toggles](https://runespoor-engineering.github.io/runespoorstack/docs/engineering-playbook/CI-CD/feature-flags#release-toggles).
It is the simplest way to manage feature toggles - as code.

## ✨ Features

- Convenient way to define feature toggles in code.
- Validate feature toggles configuration.
- Feature toggles history (via VSC).
- Zero dependencies.

## 🦾 Installation

```shell
npm i --save-dev @runespoorstack/feature-toggles-imperative
```

## ♾️ Usage

List app environments:

```typescript
const ENVS = ['dev', 'qa', 'prod'] as const;
```

Use env variable name to get the current environment (vite example). You can use NODE_ENV or set your own variable:

```typescript
const ENVS = ['dev', 'qa', 'prod'] as const;

const ENV_NAME = import.meta.env.VITE_ENV_NAME;
```

Define feature toggles configuration:

```typescript
const FEATURE_TOGGLES = {
  feature1: {
    meta: {
      description: 'Feature 1',
      createdAt: '2023-01-01',
      createdBy: 'John Doe'
    },
    enabled: {
      dev: true,
      qa: false,
      prod: false
    },
  },
  feature2: {
    meta: {
      description: 'Feature 2',
      createdAt: '2023-01-02',
      createdBy: 'Jane Doe'
    },
    enabled: {
      dev: false,
      qa: false,
      prod: true
    },
    value: {
      dev: 'value4',
      qa: 'value5',
      prod: 'value6'
    }
  }
} as const;
```

Create feature toggles:

```typescript
const { getFeatureToggle } = createFeatureToggles({
  featureToggles: FEATURE_TOGGLES,
  envs: ENVS,
  env: ENV_NAME
});
```

Use feature toggles:

```typescript
const feature1 = getFeatureToggle('feature2');
console.log(feature1);
// {
//   meta: {
//     description: 'Feature 1',
//     createdAt: '2023-01-01',
//     createdBy: 'John Doe'
//   },
//   enabled: true,
//   value: 'value6'
// }
```

## 🛠️ Contributing

See the [CONTRIBUTING.md](https://github.com/runespoor-engineering/runespoorstack/blob/main/CONTRIBUTING.md) document.

## 💕 Special Thanks

- I want to say thank you to the best woman in the world, **my wife Diana** for her love, daily support, motivation and inspiration.

## ❤️ Support or Donate

If you are enjoying this work and feel extra appreciative, you could [buy me a book](https://bmc.link/borisshulyak)
📖 or 3 📖📖📖.
