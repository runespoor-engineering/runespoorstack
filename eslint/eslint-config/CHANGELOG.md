# Change Log - @runespoorstack/eslint-config

This log was last generated on Wed, 26 Feb 2025 14:43:53 GMT and should not be manually modified.

## 1.2.0
Wed, 26 Feb 2025 14:43:53 GMT

### Minor changes

- <br/>- `core/react-ts`, `core-react-js`: remove `testing-library` plugin and export that config as a separate mixin. <br/>- `mixing/testing-library-react`: export new mixin with preconfigured rules (`testing-library/consistent-data-testid`, `testing-library/no-debugging-utils`, `testing-library/prefer-explicit-assert`, `testing-library/prefer-user-event`)

## 1.1.5
Thu, 29 Aug 2024 08:13:53 GMT

### Patches

- base-ts/base-js: turn off `no-useless-constructor`, `no-empty-function`, `class-methods-use-this` rules.

## 1.1.4
Tue, 28 May 2024 09:19:52 GMT

### Patches

- The vitest eslint config has been updated to disable the 'vitest/max-expects' rule and enable the 'vitest/no-commented-out-tests', 'vitest/no-identical-title', 'vitest/no-import-node-test', 'vitest/require-to-throw-message', 'vitest/valid-describe-callback', and 'vitest/valid-expect' rules.

## 1.1.3
Wed, 15 May 2024 22:50:57 GMT

### Patches

- `core/base-ts` add additional extentions to `import/extensions` rule.

## 1.1.2
Fri, 26 Apr 2024 12:03:44 GMT

### Patches

- `dependencies`: <br/>- Upgrade `@typescript-eslint/parser@7.7.1`, `@typescript-eslint/eslint-plugin@7.7.1`. <br/>- Downgrade `eslint-plugin-vitest@0.4.1` to fix the broken `mixins/vitest` config.

## 1.1.1
Fri, 26 Apr 2024 08:59:27 GMT

### Patches

- `base-js`, `base-ts`, `react-js`, `react-ts`: <br/>- Disable `import/prefer-default-export` rule due to the frequent eslint disables in the codebases. The decision was made based on the following discussion - [What is the benefit of prefer-default-export?](https://github.com/airbnb/javascript/issues/1365). We have also decided not to disable default exports with `import/no-default-exports` as a lot of default exports might be a part of specification, like storybook configs or any other file-based frameworks.

## 1.1.0
Wed, 10 Apr 2024 16:10:58 GMT

### Minor changes

- dependencies: <br/>- Update the following dependencies: `@typescript-eslint/parser@7.6.0`, `@typescript-eslint/eslint-plugin@7.6.0`, `eslint-plugin-jest@28.2.0`, `eslint-plugin-react@7.34.1`, `eslint-plugin-storybook@0.8.0`, `eslint-plugin-tailwindcss@3.15.1`, `eslint-plugin-vitest@0.5.1`. <br/>- Update the following devDependencies: `typescript@5.4.5`, `eslint@8.57.0`, `tailwindcss@3.4.3`. <br/>- Update the following peerDependencies: `typescript@5.4.5`, `eslint@8.57.0`.

## 1.0.2
Wed, 03 Apr 2024 10:52:07 GMT

### Patches

- Turn off vitest `no-hooks` rule.

## 1.0.1
Fri, 01 Mar 2024 12:59:32 GMT

### Patches

- `vitest` mixin: provide `ignoreTopLevelDescribe` as `true` for `vitest/prefer-lowercase-title`

## 1.0.0
Thu, 15 Feb 2024 09:02:41 GMT

### Breaking changes

- Upgarde the following deps: `@typescript-eslint/parser@7.0.1`, `@typescript-eslint/eslint-plugin@7.0.1`, `eslint-plugin-jest@27.8.0`, `eslint-plugin-simple-import-sort@12.0.0`, `eslint-plugin-tailwindcss@3.14.2`, `eslint-plugin-vitest@0.3.22`.

## 0.4.0
Tue, 06 Feb 2024 12:25:58 GMT

### Minor changes

- `core/react-js`, `core/react-ts`: make the following rules `error`: `storybook/hierarchy-separator`, `storybook/prefer-pascal-case`.

## 0.3.0
Tue, 06 Feb 2024 09:12:22 GMT

### Minor changes

- Provide `Vitest` mixin. Use as `@runespoorstack/eslint-config/mixins/vitest`.

## 0.2.0
Sat, 03 Feb 2024 16:09:46 GMT

### Minor changes

- Upgrade `@typescript-eslint/parser` to `v6.20.0`, `@typescript-eslint/eslint-plugin` to `v6.20.0`, `eslint-plugin-tailwindcss` to `v3.14.1`

## 0.1.2
Mon, 29 Jan 2024 04:39:52 GMT

### Patches

- Provide the community standards.

## 0.1.1
Fri, 26 Jan 2024 07:36:04 GMT

### Patches

- Trigger publish.

## 0.1.0
Fri, 26 Jan 2024 06:26:37 GMT

### Minor changes

- Implement `ci-mr`, `ci`, `greetings` workflows.

