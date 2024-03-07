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
        archive["archive\nDocusaurus App\n(Engineering Playbook)"]
    end

    eslint-config .-> archive

    style apps fill:lightgreen
    style eslint fill:skyblue
    style date fill:yellow
```

## Merge Request CI

```mermaid
flowchart LR
    greetings((Greetings))
    mr-ci((MR CI/CD))

    setup>checkout\ngit\nnode]
    rush-change>Verify Change Logs\nrush change --verify]
    rush-list>List packages\nrush list --version]
    rush-install>Install deps\nrush install]
    rush-lint>Lint\nrush lint]
    rush-rebuild>Rebuild packages\nrush rebuild]

    mr-ci .-> setup --> rush-change --> rush-list --> rush-install --> rush-lint --> rush-rebuild
    
    
```

## Main CI

```mermaid
flowchart LR
    main-ci((Main CI/CD))

    setup>checkout\ngit\nnode]
    rush-change>Verify Change Logs\nrush change --verify]
    rush-list>List packages\nrush list --version]
    rush-install>Install deps\nrush install]
    rush-lint>Lint\nrush lint]
    rush-rebuild>Rebuild packages\nrush rebuild]
    rush-publish>Publish packages\nrush publish]

    main-ci .-> setup --> rush-change --> rush-list --> rush-install --> rush-lint --> rush-rebuild --> rush-publish
    
```

## 💕 Special Thanks

- I want to say thank you to the best woman in the world, **my wife Diana** for her love, daily support, motivation and inspiration.

## ❤️ Support or Donate

If you are enjoying this work and feel extra appreciative, you could [buy me a book](https://bmc.link/borisshulyak)
📖 or 3 📖📖📖.