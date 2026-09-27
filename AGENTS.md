# Agent instructions

## Project and scope

Sudomarchy is PO Martel's personal blog at <https://sudomarchy.com>.
It covers his Omarchy and Hyprland tips and customizations: shortcuts, windows,
Bash tools, battery life, audio, backups, and machine setup.
The static site uses Astro, TypeScript, and Tailwind CSS, based on AstroPaper.

- Keep the entire project in English, including posts, UI text, documentation, code comments, and agent instructions. The language of a user request does not change the project's language.
- Do not create or propose new posts without an explicit request. Edit existing posts only within the requested scope.
- Commands and paths in posts are examples for readers. Editing them does not authorize running them or changing the local machine's configuration.
- Keep changes focused on the request and preserve unrelated work already in the repository.
- After making changes, commit and push only the relevant files. Show the important diffs and a link to the GitHub commit.
- Never commit secrets or `.env` files.

## Voice and content

- Preserve the personal, first-person voice: direct, friendly, practical, occasionally humorous, and free of promotional language.
- Tutorials typically start with a real problem, explain the solution, and provide short configuration or command examples.
- Do not invent personal experiences, test results, or compatibility claims about Omarchy or Hyprland versions. Verify changed technical claims against relevant sources.
- Preserve credits, source links, and update notes. Avoid rewriting an entire post for a targeted correction.

## Repository map

| Path | Purpose |
| --- | --- |
| `src/content/blog/_YYYY/` | Markdown posts organized by year |
| `src/content.config.ts` | Content collection and metadata schema |
| `src/consts.ts` | Site identity, language, timezone, and global settings |
| `src/constants.ts` | Additional social links |
| `src/config.ts` | Constant re-exports |
| `src/pages/` | Pages, post routes, RSS, and search |
| `src/layouts/`, `src/components/` | Astro layouts and components |
| `src/styles/` | Global styles, typography, code blocks, and alerts |
| `src/assets/images/` | Post images processed by Astro |
| `public/` | Files served as-is, including videos, fonts, and favicon |
| `src/utils/` | URLs, post filtering, images, and Markdown transformations |
| `tests/` | Node tests for image resolution and Markdown transformations |
| `astro.config.mjs` | Integrations, Markdown, Shiki, and sitemap |
| `vercel.json` | Vercel build settings, redirects, and HTTP headers |

## Post conventions

- Use a descriptive kebab-case `.md` filename in `src/content/blog/_YYYY/`.
- Required metadata fields are `title`, `description`, and `pubDatetime`. Do not use `pubDate`. The schema in `src/content.config.ts` is authoritative.
- Use ISO 8601 dates. `pubDatetime` accepts a string; write `modDatetime` as an unquoted YAML date, such as `modDatetime: 2026-09-27`.
- Preserve the publication date and use `modDatetime` for substantial updates. Change `draft` or `unlisted` only when the request calls for it.
- `draft: true` excludes a post from production. `unlisted: true` hides it from listings and RSS but leaves its page accessible; it does not provide access control.
- Directories prefixed with `_` are omitted from URLs: `_2026/colour-the-cat.md` becomes `/posts/colour-the-cat`. Avoid duplicate filenames across years and preserve published URLs. Add a redirect in `vercel.json` if a rename is necessary.
- A future publication date filters production listings through `postFilter.ts`, but does not prevent page generation. It is not equivalent to marking a post as a draft.
- Put new post images in `src/assets/images/`. Markdown references such as `![Alternative text](image.png)` resolve from that directory, as do `heroImage: image.png` and `ogImage: image.png`. Provide appropriate alternative text.
- Paths starting with `/` refer to files in `public/`; explicit relative paths and remote URLs are also supported. Update all references when moving existing media.
- Preserve code fence languages, the `file=...` attribute, and Shiki annotations (`[!code ++]`, `[!code --]`, `[!code highlight]`). The `code-block-highlights.md` draft contains examples.

## Commands and validation

Use npm and keep `package-lock.json` consistent with `package.json`.

- `npm ci`: install locked dependencies.
- `npm test`: run the existing tests.
- `npm run build`: build the site into `dist/`, then generate its Pagefind index.
- `npm run build:check`: run Astro type checks before building and indexing.
- `npm run lint` / `npm run check`: run Biome checks on `src/`.

Build the site after content or rendering changes. For logic changes, also run
relevant tests; use `build:check` for Astro or TypeScript changes. For documentation
changes only, review paths, commands, and examples, then run `git diff --check`.
Report failures and limitations without presenting them as successful validation.

Do not start a persistent development server in agent mode by default. Prefer
builds, and start a preview only when requested. Avoid global formatting commands
that would change files outside the task's scope.

Do not update dependencies for a simple content edit. When an update is requested,
check versions with `npm outdated` and `npm view <package> version`, target the
latest compatible stable releases, and do not downgrade to work around an error.
Some declared scripts (`deploy`, `add-source-metadata`, `remove-tags`) reference
missing files; do not recommend them as working commands.
