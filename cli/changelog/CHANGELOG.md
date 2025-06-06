# Change Log - @runespoorstack/changelog-manager

This log was last generated on Thu, 05 Jun 2025 23:09:01 GMT and should not be manually modified.

## 0.9.3
Thu, 05 Jun 2025 23:09:01 GMT

_Version update only_

## 0.9.2
Thu, 05 Jun 2025 22:55:18 GMT

_Version update only_

## 0.9.1
Thu, 05 Jun 2025 22:33:25 GMT

_Version update only_

## 0.9.0
Mon, 02 Jun 2025 14:50:29 GMT

### Minor changes

- `<br/>- `cli/changelog`: add ability to keep multiple changelogs. `change`, `verify`, `apply` commands: add `location` option to provide location of change files. <br/>- `apply` command: add `changelogFileLocation` option to provide path to changelog path.

## 0.8.2
Sat, 10 May 2025 08:24:41 GMT

### Patches

- `apply` command: remove extra indentations during `CHANGELOG.md` generation.

## 0.8.1
Thu, 27 Mar 2025 20:50:53 GMT

### Patches

- `apply`: ensure issue links are displayed only if present

## 0.8.0
Thu, 27 Mar 2025 10:26:08 GMT

### Minor changes

- `change`, `apply` commands:  provide ability to log more than one issue link

## 0.7.5
Wed, 26 Feb 2025 14:43:53 GMT

_Version update only_

## 0.7.4
Sun, 23 Feb 2025 09:54:09 GMT

### Patches

- `deps`: upgrade `commander`, `@inquirer/input`, `@inquirer/select`, `@inquirer/confirm`, `semver`

## 0.7.3
Tue, 04 Feb 2025 08:33:07 GMT

### Patches

- `apply`: skip git hooks on pushing changelogs.

## 0.7.2
Sat, 01 Feb 2025 01:16:03 GMT

### Patches

- `verify`: fetch all branches

## 0.7.1
Sat, 01 Feb 2025 00:56:50 GMT

### Patches

- `verify`: fetch source branch

## 0.7.0
Sat, 01 Feb 2025 00:16:00 GMT

### Minor changes

- `verify`, `apply`, `change` commands: provide `remoteName` options and fetch only needed branches

## 0.6.2
Wed, 15 Jan 2025 08:24:58 GMT

### Patches

- `generateIssueLink`: return `undefined` if `issueId` is not provided so that `apply` command will not add `issueLink` to the changelog.

## 0.6.1
Tue, 07 Jan 2025 11:27:04 GMT

### Patches

- `modifyChangelogTextFile`: adjust changelog template

## 0.6.0
Thu, 02 Jan 2025 10:24:59 GMT

### Minor changes

- `change`, `apply`: provide the ability to log issue link.

## 0.5.1
Wed, 11 Dec 2024 12:04:22 GMT

### Patches

- `verify`: use default `remoteName` if one is not provided

## 0.5.0
Wed, 11 Dec 2024 11:41:53 GMT

### Minor changes

- `verify`: provide `remoteName` option

## 0.4.21
Wed, 11 Dec 2024 10:06:32 GMT

### Patches

- `getExistingChangeFilePath`: test change file on `source` branch name

## 0.4.20
Wed, 11 Dec 2024 09:52:43 GMT

### Patches

- Improve `change file` verification.

## 0.4.14
Tue, 10 Dec 2024 19:26:24 GMT

### Patches

- `verify`, `change`: verify change file based on branch name + date, not only

## 0.4.13
Tue, 10 Dec 2024 07:27:59 GMT

### Patches

- `apply`: add condition for final git commands.

## 0.4.12
Tue, 10 Dec 2024 07:17:41 GMT

### Patches

- Make `changes` directory safe.

## 0.4.11
Tue, 10 Dec 2024 06:56:11 GMT

### Patches

- `apply`: remove useless logs.

## 0.4.10
Tue, 10 Dec 2024 06:27:51 GMT

### Patches

- `apply`: stage deleted change files

## 0.4.8
Tue, 10 Dec 2024 05:52:15 GMT

### Patches

- Fix critical issues.

## 0.4.2
Tue, 10 Dec 2024 02:45:15 GMT

### Patches

- `verify`: provide more informative error message.

## 0.4.1
Tue, 10 Dec 2024 02:26:12 GMT

### Patches

- `change`: fix `no changes directory` error.

## 0.4.0
Tue, 10 Dec 2024 01:42:14 GMT

### Minor changes

- Add author info to changelog.

## 0.3.0
Tue, 10 Dec 2024 00:50:59 GMT

### Minor changes

- Save changelog in `CHAGELOG.json` file.

## 0.2.1
Tue, 10 Dec 2024 00:18:09 GMT

### Patches

- `generateChangeFileName`: replace `/` symbol with `-` in branch name.

## 0.2.0
Tue, 10 Dec 2024 00:03:33 GMT

### Minor changes

- **appy** command: apply all change files.
- Implement commits count verification for `change` command.

## 0.1.1
Thu, 29 Aug 2024 08:13:53 GMT

_Version update only_

## 0.1.0
Sat, 20 Jul 2024 23:19:46 GMT

### Minor changes

- Implement `change file` creation

## 0.0.1
Sat, 20 Jul 2024 21:41:02 GMT

### Patches

- Create the package and implement `change` command placeholder.

