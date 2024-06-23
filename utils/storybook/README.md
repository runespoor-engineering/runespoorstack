<div align="center">
  <h1>@runespoorstack/storybook-utils</h1>
  <p>The Runespoor set of Storybook utils.</p>
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
  <a href="https://www.npmjs.com/package/@runespoorstack/danger-plugins">
    <img alt="npm downloads" src="https://img.shields.io/npm/dw/@runespoorstack/storybook-utils">
  </a>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [✨ Features](#-features)
- [🦾 Installation](#-installation)
- [♾️ Usage](#️-usage)
- [🛠️ Contributing](#️-contributing)
- [💕 Special Thanks](#-special-thanks)
- [❤️ Support or Donate](#️-support-or-donate)

## ✨ Features

- Generate stories urls based on the provided storybook structure.

## 🦾 Installation

```shell
npm i --save-dev @runespoorstack/storybook-utils
```

## ♾️ Usage

**generateStoriesUrls**
```
const storybookUrl = 'https://storybook.example.com';
const storybookStructure = [
  { title: 'Components/Button', variants: ['Default', 'Primary', 'Secondary'] },
  { title: 'Components/Modal', variants: ['Basic', 'Large', 'Small'] }
];
const storiesUrls = generateStoriesUrls(storybookUrl, storybookStructure);
console.log(storiesUrls);
// [
//   'https://storybook.example.com/index.html?path=/docs/components-button--default',
//   'https://storybook.example.com/index.html?path=/docs/components-button--primary',
//   'https://storybook.example.com/index.html?path=/docs/components-button--secondary',
//   'https://storybook.example.com/index.html?path=/docs/components-modal--basic',
//   'https://storybook.example.com/index.html?path=/docs/components-modal--large',
//   'https://storybook.example.com/index.html?path=/docs/components-modal--small'
// ]
```

## 🛠️ Contributing

See the [CONTRIBUTING.md](https://github.com/runespoor-engineering/runespoorstack/blob/main/CONTRIBUTING.md) document.

## 💕 Special Thanks

- I want to say thank you to the best woman in the world, **my wife Diana** for her love, daily support, motivation and inspiration.

## ❤️ Support or Donate

If you are enjoying this work and feel extra appreciative, you could [buy me a book](https://bmc.link/borisshulyak)
📖 or 3 📖📖📖.
