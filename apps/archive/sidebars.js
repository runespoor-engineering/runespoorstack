/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // engineeringPlaybookSidebar: [{ type: 'autogenerated', dirName: '.' }]
  engineeringPlaybookSidebar: [
    {
      type: 'category',
      label: 'Engineering Playbook',
      collapsible: true,
      collapsed: true,
      items: [
        'engineering-playbook/engineering-playbook-checklist',
        {
          type: 'category',
          label: 'Source Control',
          items: [
            'engineering-playbook/source-control/tech-stack',
            'engineering-playbook/source-control/issues-to-keep-track-on',
            'engineering-playbook/source-control/repository-settings',
            'engineering-playbook/source-control/changelog',
            'engineering-playbook/source-control/dependabot',
            'engineering-playbook/source-control/labels',
            'engineering-playbook/source-control/changelog',
            'engineering-playbook/source-control/pull-request-template',
            'engineering-playbook/source-control/feature-issue-template',
            'engineering-playbook/source-control/docs-issue-template',
            'engineering-playbook/source-control/bug-issue-template',
            'engineering-playbook/source-control/managing-dependencies',
            'engineering-playbook/source-control/simple-react-files-stricture'
          ]
        },
        {
          type: 'category',
          label: 'Agile',
          items: [
            {
              type: 'category',
              label: 'Basics',
              items: [
                'engineering-playbook/agile/basics/basics',
                'engineering-playbook/agile/basics/agile-roles',
                'engineering-playbook/agile/basics/agile-ceremonies-basics',
                'engineering-playbook/agile/basics/agile-backlog-management',
                'engineering-playbook/agile/basics/the-sprint',
                'engineering-playbook/agile/basics/retrospectives'
              ]
            },
            {
              type: 'category',
              label: 'Advanced',
              items: [
                'engineering-playbook/agile/advanced/scrum-rhythm',
                'engineering-playbook/agile/advanced/definition-of-ready',
                'engineering-playbook/agile/advanced/definition-of-done'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'Processes',
          items: [
            'engineering-playbook/processes/goals',
            'engineering-playbook/processes/lead',
            'engineering-playbook/processes/critical-chain',
            'engineering-playbook/processes/delayIn-managerial-decision-making',
            'engineering-playbook/processes/tech-interview',
            'engineering-playbook/processes/onboarding'
          ]
        },
        {
          type: 'category',
          label: 'Code Review',
          items: [
            'engineering-playbook/code-review/code-review',
            'engineering-playbook/code-review/code-review-formalization'
          ]
        },
        {
          type: 'category',
          label: 'Design Review',
          items: [
            'engineering-playbook/design-review/design-review',
            'engineering-playbook/design-review/decision-log',
            'engineering-playbook/design-review/design-decision-log',
            'engineering-playbook/design-review/architecture-decision-record'
          ]
        },
        {
          type: 'category',
          label: 'Testing',
          items: [
            'engineering-playbook/testing/why-automated-testing',
            'engineering-playbook/testing/ideal-testing-trophy',
            'engineering-playbook/testing/test-desiderata',
            'engineering-playbook/testing/tdd',
            'engineering-playbook/testing/testing-conventions',
            'engineering-playbook/testing/integration-testsing-coverage',
            'engineering-playbook/testing/impact-analyses',
            'engineering-playbook/testing/recommened-linters',
            'engineering-playbook/testing/adding-eslint-to-an-existing-project',
            'engineering-playbook/testing/eslint-over-conventions'
          ]
        },
        {
          type: 'category',
          label: 'Patterns and Refactoring',
          items: ['engineering-playbook/patterns-and-refactoring/patterns-and-refactoring']
        },
        {
          type: 'category',
          label: 'CI/CD',
          items: [
            'engineering-playbook/CI-CD/continuous-integration',
            'engineering-playbook/CI-CD/copy-paste-analyzing',
            'engineering-playbook/CI-CD/feature-flags'
          ]
        },
        {
          type: 'category',
          label: 'Authentication',
          items: ['engineering-playbook/authentication/basic-authentication']
        },
        {
          type: 'category',
          label: 'GraphQL',
          items: ['engineering-playbook/graphql/graphql-disadvantages']
        },
        {
          type: 'category',
          label: 'State Management',
          items: ['engineering-playbook/state-management/redux-hidden-dependencies']
        },
        {
          type: 'category',
          label: 'Developer Experience',
          items: ['engineering-playbook/developer-experience/recommended-soft']
        },
        {
          type: 'category',
          label: 'Growth',
          items: [
            'engineering-playbook/growth/growth-in-depth-or-breadth',
            'engineering-playbook/growth/company-engineering-culture',
            'engineering-playbook/growth/engineer-salary-review'
          ]
        }
      ]
    }
  ]
};

export default sidebars;
