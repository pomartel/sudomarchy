# Sudomarchy

The personal blog of **PO Martel**, a computer science teacher in Montreal,
software developer, and Linux enthusiast: **<https://sudomarchy.com>**.

The articles share practical Omarchy and Hyprland tips and customizations:
keyboard shortcuts, window management, command-line tools, battery life, audio,
backups, and installation scripts. All project content and documentation are
written in English.

The site uses **Astro**, **TypeScript**, and **Tailwind CSS**, based on the
[AstroPaper](https://github.com/satnaing/astro-paper) theme. It includes Pagefind
search, an [RSS feed](https://sudomarchy.com/rss.xml), and light and dark themes.

## Local development

Requirements: Node.js 22.12.0 or later, and npm.
TypeScript stays on version 6 for compatibility with `@astrojs/check`.

```bash
npm ci
npm run dev
```

The development server is available at <http://localhost:4321> by default.

| Command | Purpose |
| --- | --- |
| `npm run build` | Generate the site in `dist/` and the Pagefind search index |
| `npm run build:check` | Run Astro type checks, build the site, and index it |
| `npm run preview` | Preview the latest build locally |
| `npm test` | Run the Node tests |
| `npm run lint` | Lint `src/` with Biome |
| `npm run check` | Check code and formatting in `src/` with Biome |

To check Pagefind search, build the site and then run the preview.

## Project structure

```text
src/
  content/blog/_YYYY/  Markdown posts organized by year
  content.config.ts   Post metadata schema
  assets/images/      Post images
  pages/              Pages, routes, RSS, and search
  layouts/            Page layouts
  components/         Astro components
  styles/             Styles and typography
  utils/              Content and image utilities
  consts.ts           Site identity and settings
public/               Static files, videos, and fonts
tests/                Image utility tests
astro.config.mjs      Astro and Markdown configuration
vercel.json           Vercel configuration and redirects
```

Posts require `title`, `description`, and `pubDatetime` metadata.
The `_YYYY` directories organize files without appearing in URLs:
`src/content/blog/_2026/colour-the-cat.md` maps to `/posts/colour-the-cat`.
Images in `src/assets/images/` can be referenced by filename.
See [AGENTS.md](AGENTS.md) for editorial conventions and agent instructions.

## Hosting

The repository includes Vercel configuration that runs `npm run build` and
publishes `dist/`. Redirects and HTTP headers are defined in `vercel.json`.
The `npm run deploy` script references a missing file and is not currently a
working deployment command.

## Licenses

- Documentation and blog posts: **CC BY 4.0**.
- Code: **MIT**. Code examples within posts may be used under either license.

See [LICENSE](LICENSE) for the full terms.
