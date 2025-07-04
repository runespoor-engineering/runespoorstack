<div align="center">
  <h1>@runespoorstack/eslint-cli</h1>
  <p>The Runespoor CLI for smooth eslint integration and management.</p>
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
    <img alt="npm downloads" src="https://img.shields.io/npm/dw/@runespoorstack/eslint-cli">
  </a>
</div>

## Table of Contents

- [Overview](#overview)
- [Why Continuous ESLint Fixing?](#why-continuous-eslint-fixing)
- [The Right Way vs Wrong Way to Add ESLint](#the-right-way-vs-wrong-way-to-add-eslint)
- [Core Commands](#core-commands)
- [Installation](#installation)
- [Usage](#usage)
  - [Check Commands](#check-commands)
  - [Disable Command](#disable-command)
  - [Command Options](#command-options)
- [Integration with Git Hooks](#integration-with-git-hooks)
  - [Husky Setup](#husky-setup)
  - [Pre-commit Hook Example](#pre-commit-hook-example)
- [Use Cases](#use-cases)
- [Examples](#examples)
- [🛠️ Contributing](#️-contributing)
- [💕 Special Thanks](#-special-thanks)
- [❤️ Support or Donate](#️-support-or-donate)

## Overview

`@runespoorstack/eslint-cli` is a powerful command-line tool designed to help development teams maintain clean, eslint-compliant codebases by detecting and managing `/* eslint-disable */` comments.

The tool enables teams to:

- **Prevent technical debt accumulation** by catching eslint-disable comments before they enter the codebase
- **Maintain code quality standards** through automated checks in CI/CD pipelines
- **Gradually migrate legacy code** by temporarily disabling eslint for specific files while working toward full compliance

## Why Continuous ESLint Fixing?

### The Problem with Accumulated ESLint Violations

When ESLint violations accumulate over time, teams often resort to adding `/* eslint-disable */` comments as a quick fix. While this temporarily silences the linter, it creates several long-term issues:

- **Technical debt grows exponentially** - Each disabled file becomes harder to fix later
- **Code quality degrades** - Team members lose sight of what's actually broken
- **Refactoring becomes risky** - Disabled files may contain hidden bugs or anti-patterns
- **New violations slip through** - It becomes impossible to distinguish new issues from old ones

### The Continuous Fixing Approach

Instead of accumulating violations, this CLI promotes a **continuous fixing methodology**:

1. **Catch violations early** - Prevent new `eslint-disable` comments from entering the codebase
2. **Fix incrementally** - Address existing violations gradually without overwhelming the team
3. **Maintain visibility** - Keep a clear picture of code quality across the entire project
4. **Enable safe refactoring** - Ensure that all code follows consistent standards

### How This CLI Helps

- **Pre-commit validation** - Automatically check staged files before commits
- **CI/CD integration** - Fail builds when eslint-disable comments are detected
- **Gradual migration** - Temporarily disable eslint for legacy files while working toward compliance
- **Team awareness** - Make eslint violations visible to the entire development team

## The Right Way vs Wrong Way to Add ESLint

### ❌ How to Add ESLint to an Existing Project INCORRECTLY

Many developers follow this painful approach:

✅ **Step 1:** I have configured the ESLint rules using the best configs and plugins. I have even written my own rules using `no-restricted-syntax` rule. It was really great job.

✅ **Step 2:** I have configured the Linting job in the CI pipeline to be sure all the new changes would be linted.

⚠️ **Step 3:** I have run the ESLint check... The thousands of errors were auto-fixed. But the thousands of other errors should be fixed manually...

📛 **Step 4:** I have spent days or even weeks fixing such errors. While I was doing this, the whole team was writing code that brought more and more errors. I pulled all the new changes into my branch, fixed new errors, and resolved merge conflicts. I had a feeling that this would never end. But I coped with it - all the errors were fixed, the MR was merged, and the team received a project covered with ESLint rules and Prettier config.

#### What's Wrong with This Method?

❌ **Time-consuming** - I have spent so much time doing it.

❌ **Git authorship issues** - I have been assigned to each file of the project. So GitHub has suggested me as a reviewer on each PR.

❌ **Broken git blame** - The usage of `git blame` has become terrible.

> The `git blame` command is a versatile troubleshooting utility that displays author metadata attached to specific committed lines in a file. This is used to examine specific points of a file's history and get context as to who the last author was that modified the line. After a massive ESLint fix, all lines point to the person who fixed the linting, not the original author who wrote the logic.

❌ **Team disruption** - While fixing thousands of errors, the team continues adding new violations.

❌ **Merge conflicts** - Constantly pulling new changes and resolving conflicts during the fix process.

### ✅ How to Add ESLint to an Existing Project CORRECTLY

Here's the much better approach this CLI enables:

✅ **Step 1:** Configure ESLint rules (same as above)

✅ **Step 2:** Configure CI pipeline (same as above)

✅ **Step 3:** Add `/* eslint-disable */` to all files that have violations:

```bash
npx lintspoor disable
```

✅ **Step 4:** Create a team convention: "If you make changes in some file, you should delete the `/* eslint-disable */` line and fix all the ESLint errors in that file." Always leave code cleaner than you found it.

✅ **Step 5:** Add this convention as a checklist point in your MR template and set up the pre-commit hook:

```bash
npx husky add .husky/pre-commit "npx lintspoor check-staged"
```

✅ **Step 6:** Merge the MR and all the team starts following this convention.

#### What You Get with This Approach

✅ **Fast implementation** - I have finished this task so quickly.

✅ **Correct git authorship** - I have not been assigned to each file. GitHub suggests the correct user as a reviewer on each PR.

✅ **Preserved git blame** - The git blame was not broken - you can still see who wrote the original logic.

✅ **Pleasant experience** - It was really a pleasure experience of adding ESLint and Prettier to an existing project.

✅ **Gradual improvement** - Files get fixed naturally as part of regular development work.

✅ **No team disruption** - The team can continue working normally while the codebase gradually improves.

> **How is point 3 solved?** It's really easy and you can do it right now - we've created this npm package with exactly this functionality!

## Core Commands

| Command        | Description                                                 | Use Case                               |
| -------------- | ----------------------------------------------------------- | -------------------------------------- |
| `check`        | Check all files for `/* eslint-disable */` comments         | CI/CD pipelines, full project audits   |
| `check-staged` | Check only staged files for `/* eslint-disable */` comments | Pre-commit hooks, focused validation   |
| `disable`      | Add `/* eslint-disable */` to files matching patterns       | Legacy code migration, temporary fixes |

## Installation

### NPM

```bash
npm install -g @runespoorstack/eslint-cli
```

### Yarn

```bash
yarn global add @runespoorstack/eslint-cli
```

### PNPM

```bash
pnpm add -g @runespoorstack/eslint-cli
```

### Local Installation (Recommended)

```bash
npm install --save-dev @runespoorstack/eslint-cli
```

## Usage

### Check Commands

#### Check All Files

```bash
# Check all JavaScript/TypeScript files in current directory
lintspoor check

# Check files in specific directory
lintspoor check --rootDir ./src

# Check files with custom patterns
lintspoor check --pattern "\.ts$" "\.tsx$"
```

#### Check Staged Files

```bash
# Check only staged files (perfect for pre-commit hooks)
lintspoor check-staged

# Check staged files in specific directory
lintspoor check-staged --rootDir ./src

# Check staged files with custom patterns
lintspoor check-staged --pattern "\.test\.ts$"
```

### Disable Command

⚠️ **Use with caution** - This command should primarily be used for legacy code migration.

```bash
# Disable eslint for all JS/TS files
lintspoor disable

# Disable eslint for files in specific directory
lintspoor disable --rootDir ./legacy

# Disable eslint for specific file patterns
lintspoor disable --pattern "\.test\.ts$" "\.spec\.js$"
```

### Command Options

All commands support the following options:

| Option                     | Description                | Default           | Example                     |
| -------------------------- | -------------------------- | ----------------- | --------------------------- |
| `-r, --rootDir <path>`     | Directory to search/modify | `./`              | `--rootDir ./src`           |
| `-p, --pattern <regex...>` | File patterns to match     | `\.[cm]?[jt]sx?$` | `--pattern "\.ts$" "\.js$"` |

## Integration with Git Hooks

### Husky Setup

1. **Install Husky**:

```bash
npm install --save-dev husky
npx husky install
```

2. **Add to package.json**:

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

### Pre-commit Hook Example

Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Check staged files for eslint-disable comments
npx lintspoor check-staged

# Optional: Also run your regular linting
npm run lint-staged
```

### Advanced Git Hook Setup

For more sophisticated workflows, you can combine multiple checks:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Checking staged files for eslint-disable comments..."
npx lintspoor check-staged

echo "🧹 Running ESLint on staged files..."
npx lint-staged

echo "🧪 Running tests related to staged files..."
npm run test:staged
```

### CI/CD Integration

#### GitHub Actions

```yaml
name: Code Quality Check
on: [push, pull_request]

jobs:
  eslint-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - name: Check for eslint-disable comments
        run: npx lintspoor check
```

#### Jenkins

```groovy
pipeline {
    agent any
    stages {
        stage('ESLint Disable Check') {
            steps {
                sh 'npx lintspoor check'
            }
        }
    }
}
```

## Use Cases

### 1. **New Projects** - Start Clean

```bash
# Set up pre-commit hook to prevent eslint-disable comments
npx husky add .husky/pre-commit "npx lintspoor check-staged"
```

### 2. **Legacy Projects** - Gradual Migration Strategy

```bash
# Step 1: Disable eslint for all existing files
lintspoor disable

# Step 2: Add precommit hook to check that changed files don't contain eslint-disable
npx husky add .husky/pre-commit "npx lintspoor check-staged"

# Step 3: Gradually fix files one by one
# - Pick a file to refactor
# - Remove the /* eslint-disable */ comment
# - Fix all ESLint violations in that file
# - Commit the clean file

# Step 4: Repeat until all files are clean
# Eventually, your entire codebase will be ESLint-compliant!
```

**🎯 The Beauty of This Approach:**

- **No pressure** - Fix files at your own pace during regular development
- **Quality gates** - New code is always clean thanks to the pre-commit hook
- **Visible progress** - You can track how many files still need attention
- **Risk mitigation** - Each file is fixed individually, reducing the chance of introducing bugs

### 3. **Code Review Process** - Quality Gates

```bash
# Add to your CI/CD pipeline
lintspoor check
```

### 4. **Monorepo Management** - Targeted Checks

```bash
# Check specific packages
lintspoor check --rootDir ./packages/ui
lintspoor check --rootDir ./packages/api

# Check only test files
lintspoor check --pattern "\.test\.[jt]sx?$" "\.spec\.[jt]sx?$"
```

## Examples

### Example 1: Clean Project Setup

```bash
# 1. Install the CLI
npm install --save-dev @runespoorstack/eslint-cli husky

# 2. Set up git hooks
npx husky install
npx husky add .husky/pre-commit "npx lintspoor check-staged"

# 3. Add CI check
# (Add to your .github/workflows/ci.yml or similar)
```

### Example 2: Legacy Project Migration

```bash
# 1. Temporarily disable eslint for all existing files
lintspoor disable

# 2. Set up prevention for new violations
npx husky add .husky/pre-commit "npx lintspoor check-staged"

# 3. Create a tracking issue to gradually remove eslint-disable comments

# 4. As you refactor files, remove the eslint-disable comment and fix violations
```

### Example 3: Targeted File Pattern Checking

```bash
# Only check TypeScript files
lintspoor check --pattern "\.ts$" "\.tsx$"

# Only check test files
lintspoor check-staged --pattern "\.test\." "\.spec\."

# Check multiple directories
lintspoor check --rootDir ./src
lintspoor check --rootDir ./tests
```

### Example 4: Package.json Scripts

```json
{
  "scripts": {
    "lint:check-disable": "lintspoor check",
    "lint:check-staged": "lintspoor check-staged",
    "lint:disable-legacy": "lintspoor disable --rootDir ./legacy",
    "precommit": "lintspoor check-staged && npm run lint",
    "ci:quality": "lintspoor check && npm run lint && npm run test"
  }
}
```

## 🛠️ Contributing

See the [CONTRIBUTING.md](https://github.com/runespoor-engineering/runespoorstack/blob/main/CONTRIBUTING.md) document.

## 💕 Special Thanks

- I want to say thank you to the best woman in the world, **my wife Diana** for her love, daily support, motivation and inspiration.

## ❤️ Support or Donate

If you are enjoying this work and feel extra appreciative, you could [buy me a book](https://bmc.link/borisshulyak)
📖 or 3 📖📖📖.
