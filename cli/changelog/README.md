<div align="center">
  <h1>@runespoorstack/changelog-manager</h1>
  <p>The Runespoor CLI for changelog management and semantic versioning.</p>
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
  <a href="https://www.npmjs.com/package/@runespoorstack/changelog-manager">
    <img alt="npm downloads" src="https://img.shields.io/npm/dw/@runespoorstack/changelog-manager">
  </a>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Setup](#setup)
- [Manual commands](#manual-commands)
- [🛠️ Contributing](#️-contributing)
- [💕 Special Thanks](#-special-thanks)
- [❤️ Support or Donate](#️-support-or-donate)

Read the full [documentation](https://runespoor-engineering.github.io/runespoorstack/docs/cli/changelog-manager/usage).

## Install

```shell
npm install --save-dev @runespoorstack/changelog-manager
```

## Setup

Add npm scripts to your `package.json` file.

```json
{
  ...
  "scripts": {
    ...
    "changelog:change": "rune change",
    "changelog:verify": "rune verify",
    "changelog:apply": "rune apply"
  }
  ...
}
```

Integrate `rune verify` command with your Merge Request CI (GitHub Actions example). 
Make sure to add this job on the **beginning** of your pipeline:

```yml
name: Merge Request CI
on:
  pull_request:
    branches:
      - '*'

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}

jobs:
  changelog-verify:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Setup Node
      uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Verify Changelog
      run: npm run changelog:verify

  ...

```

Integrate `rune apply` command with your Main CI (GitHub Actions example).
Make sure to add this job on the **end** of your pipeline:

```yml
name: Main CI
on:
  push:
    branches:
      - main

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: ${{ github.ref == 'refs/heads/main' }}


jobs:

  ...

  changelog-apply:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Setup Node
      uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Apply Changelog
      run: npm run changelog:apply
```

## Manual commands

Run `rune change` command and commit the resulted files to provide change files, before opening any Merge Request:

```shell
npm run changelog:change
```

## 🛠️ Contributing

See the [CONTRIBUTING.md](https://github.com/runespoor-engineering/runespoorstack/blob/main/CONTRIBUTING.md) document.

## 💕 Special Thanks

- I want to say thank you to the best woman in the world, **my wife Diana** for her love, daily support, motivation and inspiration.

## ❤️ Support or Donate

If you are enjoying this work and feel extra appreciative, you could [buy me a book](https://bmc.link/borisshulyak)
📖 or 3 📖📖📖.
