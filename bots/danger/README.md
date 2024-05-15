<div align="center">
  <h1>@runespoorstack/danger-bot</h1>
  <p>The Runespoor set of PR linters using Danger.js</p>
  <a href="https://github.com/runespoor-engineering/runespoorstack/blob/main/LICENSE">
    <img alt="GitHub License" src="https://img.shields.io/github/license/runespoor-engineering/runespoorstack">
  </a>
  <a href="https://github.com/runespoor-engineering/runespoorstack/issues">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/runespoor-engineering/runespoorstack?color=5d2de0">
  </a>
  <a href="https://www.npmjs.com/package/@runespoorstack/danger-plugins">
    <img alt="npm downloads" src="https://img.shields.io/npm/dw/@runespoorstack/danger-plugins">
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

- Review the PR assignee
- Review the changelog updating on a PRs
- Review the lockfile updating on a PRs
- Review the PR merging time
- Review the PR size
- Review the PR title
- Review the PR reviewers

## 🦾 Installation

```shell
npm i --save-dev @runespoorstack/danger-plugins 
```

## ♾️ Usage

Create the script file and run it in the CI, following the [Danger.js guide](https://danger.systems/js/guides/getting_started).

```
import {
  dangerAssignee,
  dangerLockfileUpdate,
  dangerPrMergingTime,
  dangerPrSize,
  dangerPrTitle,
  dangerReviewers
} from '@runespoorstack/danger-plugins'

dangerAssignee();
dangerLockfileUpdate('npm');
dangerPrMergingTime(48);
dangerPrSize(777);
dangerPrTitle(/^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test){1}(\([\w\-\.]+\))?(!)?: ([\w ])+([\s\S]*)/);
dangerReviewers(3);
```

## 🛠️ Contributing

See the [CONTRIBUTING.md](https://github.com/runespoor-engineering/runespoorstack/blob/main/CONTRIBUTING.md) document.

## 💕 Special Thanks

- I want to say thank you to the best woman in the world, **my wife Diana** for her love, daily support, motivation and inspiration.

## ❤️ Support or Donate

If you are enjoying this work and feel extra appreciative, you could [buy me a book](https://bmc.link/borisshulyak)
📖 or 3 📖📖📖.
