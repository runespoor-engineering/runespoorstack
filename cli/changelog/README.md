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
- [Core Commands](#core-commands)
- [Key Features](#key-features)
- [Use Cases](#use-cases)
- [Usage](#usage)
  - [Install](#install)
  - [Setup](#setup)
  - [Manual commands](#manual-commands)
- [🛠️ Contributing](#️-contributing)
- [💕 Special Thanks](#-special-thanks)
- [❤️ Support or Donate](#️-support-or-donate)

A specialized CLI tool (`@runespoor/changelog-manager`) designed for managing changelogs and semantic versioning in single repositories, particularly optimized for Continuous Integration and Trunk Based Development workflows.

## Core Commands

1. `rune change`
   - Interactive command to document changes before merging
   - Generates timestamped JSON files containing change details
   - Captures change type (major/minor/patch/none), description, author, and optional issue links

2. `rune verify`
   - CI-focused validation command
   - Ensures proper change files exist and are valid
   - Verifies branch differences and file naming conventions

3. `rune apply`
   - Processes accumulated change files
   - Automatically bumps version numbers based on change types
   - Updates CHANGELOG.md and package.json
   - Commits and pushes changelogs

## Key Features

- **Automated Version Management**: Intelligently handles semantic versioning based on change types
- **Standardized Change Documentation**: Enforces consistent changelog formats
- **CI/CD Integration**: Built-in commands for verification in CI pipelines
- **Issue Tracking**: Optional integration with issue tracking systems
- **Git Integration**: Automated commit and push functionality

## Use Cases

- Maintaining consistent changelog entries across team members
- Automating version bumps based on change significance
- Enforcing change documentation in CI/CD pipelines
- Tracking changes with associated issue references
- Standardizing release documentation

The tool essentially automates the often manual and error-prone process of maintaining changelogs and version numbers in a development workflow.

## Usage

### Install

```shell
npm install --save-dev @runespoorstack/changelog-manager
```

### Setup

Add npm scripts to your `package.json` file.

```json
{
  ...
  "scripts": {
    ...
    "changelog:change": "rune change --issueLinkPattern https://jira.com/browse/{{issueId}}",
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
      run: npm run changelog:verify -- --sourceBranch origin/${{ github.head_ref || github.ref_name }} -- --remoteName origin

  ...

```

Integrate `rune apply` command with your Main CI (GitHub Actions example).
Authorize the git user and personal access token as a secret to be able to push to the repository. [Read the Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
I suggest creating the separate service account for such purposes.
Make sure to add this job to the **end** of your pipeline:

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
      with:
        fetch-depth: 2
        token: ${{ secrets.ACTIONS_PTA }}

    - name: Git set author name
      run: git config --global user.name "ServiceAccount"

    - name: Git set author email
      run: git config --global user.email "serviceaccount@gmail.com"

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

### Manual commands

Run `rune change` command and commit the resulted files to provide change files, before opening any Merge Request:

```shell
npm run changelog:change
```

For more information, read the technical [documentation](https://runespoor-engineering.github.io/runespoorstack/docs/cli/changelog-manager/tech-insights).

## 🛠️ Contributing

See the [CONTRIBUTING.md](https://github.com/runespoor-engineering/runespoorstack/blob/main/CONTRIBUTING.md) document.

## 💕 Special Thanks

- I want to say thank you to the best woman in the world, **my wife Diana** for her love, daily support, motivation and inspiration.

## ❤️ Support or Donate

If you are enjoying this work and feel extra appreciative, you could [buy me a book](https://bmc.link/borisshulyak)
📖 or 3 📖📖📖.
