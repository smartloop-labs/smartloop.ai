# smartloop.ai

[![Deploy](https://github.com/smartloop-labs/smartloop.ai/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/smartloop-labs/smartloop.ai/actions/workflows/deploy-pages.yml)
[![Built with Docusaurus](https://img.shields.io/badge/built%20with-Docusaurus-3ECC5F?logo=docusaurus&logoColor=white)](https://docusaurus.io/)

The website and documentation for [Smartloop Studio](https://smartloop.ai) and
[Docent](https://github.com/smartloop-labs/docent), the command-line tool. It's a
static [Docusaurus](https://docusaurus.io/) site served from GitHub Pages at
**[smartloop.ai](https://smartloop.ai)**.

Found a typo or something out of date? Every docs page has an **Edit this page**
link at the bottom. See [CONTRIBUTING.md](CONTRIBUTING.md) for anything bigger.

## Quick start

You need Node.js 20 or later.

```sh
git clone https://github.com/smartloop-labs/smartloop.ai.git
cd smartloop.ai
npm ci
npm start
```

`npm start` opens a dev server at http://localhost:3000 that reloads as you edit.

| Command | What it does |
|---|---|
| `npm start` | Dev server with live reload |
| `npm run build` | Production build into `build/` (fails on broken links) |
| `npm run serve` | Serves `build/` the way GitHub Pages will |
| `npm run typecheck` | TypeScript check |
| `npm run clear` | Clears Docusaurus caches if a build acts strangely |

## What's where

```
docs/                 Documentation pages (Markdown/MDX), one file per page
  templates/          Use-case templates (Legal, ...)
sidebars.ts           Docs sidebar: the order and grouping of docs pages
src/pages/            Site pages: home, download, pricing, contact, legal
src/components/       React components shared by the pages
src/css/              Global styles and theme variables
src/utils/api.ts      Calls to the Smartloop API (contact form, downloads)
static/               Copied as-is to the site root (images, robots.txt, llms.txt)
starters/             Source for the downloadable sample projects
docusaurus.config.ts  Site config: navbar, footer, SEO, plugins
```

## Writing docs

A docs page is a Markdown file in `docs/`. Its URL comes from the file name:
`docs/skills.md` is published at `/docs/skills/`.

1. Add `docs/your-page.md` and start it with a `# Title`.
2. Add its id (`'your-page'`) to `sidebars.ts` where it belongs in the order.
3. Put screenshots next to the page in `docs/` and reference them relatively:
   `![Settings](settings.png)`.

Pages support MDX, so React components work too, and math via KaTeX
(`$E = mc^2$`). The [Docusaurus docs](https://docusaurus.io/docs/markdown-features)
cover the rest: admonitions (`:::tip`), tabs, code blocks with titles and line
highlighting.

To improve how a page appears in search results and link previews, give it a
`description` in front matter:

```md
---
description: Pack repeated prompts into skills that analyze documents and search the web.
---
```

## Deployment

Merging to `main` publishes the site; there's nothing to deploy by hand. Pull
requests are checked by CI first (type check and build).

## Contributing

Issues and pull requests are welcome. [CONTRIBUTING.md](CONTRIBUTING.md) covers
the workflow and the checks a PR has to pass.

## License

- **Documentation** (`docs/`, and the text and images of the site's pages) is
  licensed under [Creative Commons Attribution 4.0](LICENSE-docs) (CC BY 4.0).
- **Code** (everything else: components, config, scripts, workflows) is
  source-available under the [Business Source License 1.1](LICENSE) (`BUSL-1.1`).

For the code:

- You may read, modify, self-host and use it in production, including inside your company.
- You may not offer it to third parties as a hosted or embedded commercial product that competes with Smartloop's paid offerings.
- Each version converts to the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) four years after it is published.

For a commercial license or questions, contact [hello@smartloop.ai](mailto:hello@smartloop.ai).

Versions released before November 27, 2026 remain available under the MIT License to anyone who received them under it.

Neither license grants rights to Smartloop's names, logos or other
trademarks.
