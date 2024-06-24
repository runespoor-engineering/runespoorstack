# Runespoor Stack

<a href="https://www.buymeacoffee.com/borisshulyak" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

- [Runespoor Stack](#runespoor-stack)
  - [🛠️ Contributing](#️-contributing)
  - [Monorepo](#monorepo)
  - [Merge Request CI](#merge-request-ci)
  - [Main CI](#main-ci)
  - [💕 Special Thanks](#-special-thanks)
  - [❤️ Support or Donate](#️-support-or-donate)

## 🛠️ Contributing

See the [CONTRIBUTING.md](https://github.com/runespoor-engineering/runespoorstack/blob/main/CONTRIBUTING.md) document.

## Monorepo

```mermaid
flowchart TB
    subgraph eslint
        eslint-config["eslint-config\n(Universal linting configuration)\nESLint/Prettier"]
    end

    subgraph date
        timezones["timezones\n(The updated list of timezones)"]
    end

    subgraph utils
        storybook-utils["storybook\n(Utils related to Storybook)"]
        git-utils["git\n(Utils related to Git)"]
    end

    subgraph apps
        archive["archive\n(Engineering Playbook)\nDocusaurus"]
    end

    subgraph bots
        danger["danger\n(Danger.js rules and plugins)\nDanger.js"]
    end

    eslint-config .-> archive
    eslint-config .-> danger
    eslint-config .-> storybook-utils
    eslint-config .-> git-utils

    style eslint fill:skyblue
    style date fill:yellow
    style utils fill:lightblue
    style apps fill:lightgreen
    style bots fill:orange
```

## Merge Request CI

![Merge Request CI](assets/ci-mr.png)

## Main CI

![Main CI](assets/ci-main.png)

## 💕 Special Thanks

- I want to say thank you to the best woman in the world, **my wife Diana** for her love, daily support, motivation and inspiration.

## ❤️ Support or Donate

If you are enjoying this work and feel extra appreciative, you could [buy me a book](https://bmc.link/borisshulyak)
📖 or 3 📖📖📖.