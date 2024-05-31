# Runespoor Stack

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

    subgraph apps
        archive["archive\n(Engineering Playbook)\nDocusaurus"]
    end

    subgraph bots
        danger["danger\n(Danger.js rules and plugins)\nDanger.js"]
    end

    eslint-config .-> archive
    eslint-config .-> danger

    style apps fill:lightgreen
    style eslint fill:skyblue
    style date fill:yellow
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