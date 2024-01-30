// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Runespoor Engineering',
  tagline:
    'Start developing high-quality software, discover effective approaches to team interactions, and learn how to build a great engineering culture.',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'BorysShulyak', // Usually your GitHub org/user name.
  projectName: '@runespoorstack/archive', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/runespoor-engineering/runespoorstack/blob/main/apps/archive'
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/runespoor-engineering/runespoorstack/blob/main/apps/archive'
        },
        theme: {
          customCss: './src/css/custom.css'
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Runespoor Engineering',
        logo: {
          alt: 'Runespoor Engineering Playbook Logo',
          src: 'img/logo.png'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'engineeringPlaybookSidebar',
            position: 'left',
            label: 'Engineering Playbook'
          },
          {
            href: 'https://github.com/runespoor-engineering/runespoorstack/blob/main/apps/archive',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Engineering Playbook',
                to: '/docs/category/engineering-playbook'
              }
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/BorysShulyak'
              },
              {
                label: 'DevTo',
                href: 'https://dev.to/borysshulyak'
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/boris-shulyak-1a3b441b7'
              }
            ]
          },
          {
            title: 'Appreciate',
            items: [
              {
                label: 'Buy me a book',
                href: 'https://bmc.link/borisshulyak'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Runespoor Engineering, Inc. Built with Docusaurus.`
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula
      }
    })
};

export default config;
