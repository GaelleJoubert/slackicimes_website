# Slack'icîmes website: Claude Code Project Guide

Shared rules for the Slack'icîmes association website (Astro static site, French and English).
Personal preferences belong in `~/.claude/CLAUDE.md`; this file wins on any conflict.

Scope, URL contract, architecture and plan: `docs/project.md`. Read it before any structural change.

## General

- Write code, comments and chat in English. Site copy is French (reference) and English.
- Never generate `.md` files (summaries, quick references, solution docs) unless explicitly asked.
- Update `README.md` only when adding a feature or a shared component.
- Match existing structure and conventions before changing code.
- Be critical, neutral and objective. Do not affirm the user is right by default.

## Writing style

Never use arrows (`→`) or dashes (`—`, `-`) as punctuation in prose, comments, docs or site copy
you author. Use colons (`:`), or rephrase with periods, commas, or parentheses. Markdown list
bullets and table separators are fine.

## Clean code

### Naming

- Names must be self-explanatory. If you need a comment to explain a variable, rename it.
- Zero tolerance for magic numbers. Every numeric literal (except `0`, `1`, `-1`, and `2` for
  halving or doubling) must be a named constant or derived from one. Applies to assignments,
  arguments, conditions, indices, arithmetic. UI dimensions use the design tokens (see Design
  tokens).
- Variable names must reflect what they actually hold (e.g. `canonicalUrl`, not `url`, when other
  URLs are in scope). Misleading names are worse than bad names.
- Extract complex boolean conditions into well-named variables or functions so logic reads like
  plain English.
- No abbreviations like `dr`, `dc`, `idx`. Prefer `rowOffset`, `pointIndex`, `squaredDistance`.

### Functions

- One function = one task. Split functions that do two things.
- Keep functions short. A function that scrolls is too long.
- Keep cognitive complexity at or below 15. Extract helpers to flatten nested logic.
- Limit positional parameters to 3. Group related parameters into an object. Component props are
  exempt, but a long props list still hints that the component does too much.
- Single level of abstraction per function or component. Pages and sections must not contain
  low-level details (regex patterns, URL building, JSON-LD construction). Extract them to `lib/`.
- No side effects. A function named `buildCanonicalUrl` must not also register a redirect.
- Never return a manually counted value that must stay in sync with another part of the same
  function. Compute it from the source of truth.

### Comments

Default: no comment. Write self-explanatory names instead.

- Only allowed: one sentence explaining a non-obvious WHY (SEO constraint, browser quirk, Wix
  legacy behavior) that a reader would otherwise break.
- Never: what the code does, name restatements, step narration, fix/task/prompt/review history,
  design descriptions, multi-line JSDoc on obvious APIs.
- When tempted to comment, refactor first (extract a variable, rename, extract a function).
- Architecture or flow explanations go in `docs/`, not in code.
- Delete dead or outdated comments immediately.

### Principles

Apply KISS, YAGNI, SRP, Open/Closed, and Dependency Inversion. DRY with nuance: three similar lines
are fine, three identical blocks are not. YAGNI unless the change is already planned.

### Conditionals and errors

- Use guard clauses (early returns) to eliminate nesting.
- Prefer exceptions over error codes. Provide precise, actionable error messages; a broken build
  beats a silently broken page.
- Replace deep `if/else` chains with lookup maps or discriminated unions when applicable.

### Strings and hygiene

- Prefer template literals (`` `${origin}${path}` ``) over concatenation.
- Remove dead code (unused vars, unreachable branches, commented-out blocks). Version control is
  the archive.
- Write testable code. If it is hard to test, the design needs rethinking.
- Let Prettier and ESLint handle spacing, indentation, line length.
- TypeScript in strict mode. No `any`; no non-null assertions without a guard.

## Project layout

Run `ls` for the live tree. Tests live under `tests/`, mirroring `src/lib/`.

| Artifact       | Location                   | Notes                                               |
| :------------- | :------------------------- | :-------------------------------------------------- |
| Routes         | `src/pages/[...locale]/`   | thin files: pick content, compose sections          |
| Layouts        | `src/layouts/`             | `BaseLayout.astro` owns `<head>` and SEO tags       |
| UI components  | `src/components/ui/`       | presentational building blocks                      |
| Sections       | `src/components/sections/` | page sections composed from ui components           |
| Content        | `src/content/`             | collections with Zod schemas, one entry per locale  |
| Localization   | `src/i18n/`                | locales, UI strings, route mapping                  |
| Pure logic     | `src/lib/`                 | SEO, structured data, URL helpers                   |
| Site constants | `src/lib/site.ts`          | origin, organization data, social links             |
| Design tokens  | `src/styles/global.css`    | Tailwind `@theme` block                             |
| Images         | `src/assets/images/`       | optimized at build through `astro:assets`           |
| Static files   | `public/`                  | `robots.txt`, favicons: files that need a fixed URL |
| Wix reference  | `migration/`               | read only inventory of the old site                 |

Dependencies point inward: pages use layouts, sections and content; sections use ui components;
everything may use `lib/` and `i18n/`; `lib/` imports nothing from the rest of the project.
Content never contains layout; components never hardcode copy.

## SEO and URL contract

Search rankings are the main migration risk. These rules are not negotiable without an explicit
decision from the user.

- The URL contract in `docs/project.md` is binding. Never rename, remove or add a trailing slash to
  a listed URL. A removed page needs a redirect entry pointing straight at its final target.
- Every page renders through `BaseLayout` with a unique title and meta description per locale.
- Exactly one `<h1>` per page.
- Every content image has a meaningful `alt` in the page's language; decorative images use
  `alt=""`.
- `hreflang` alternates (`fr-fr`, `en-us`, `x-default` to French) come from the route mapping in
  `src/i18n/`, never hand written per page.
- Structured data is built by `lib/` functions and rendered by the layout, never inlined in pages.
- No client JavaScript by default. A `client:*` directive needs a reason the reviewer can see in
  the component's purpose (a form, a carousel); static HTML is always the first option.

## Images and assets

- Never reference images in `src/assets/` as raw string paths. Import them and render with
  `<Image>` or `<Picture>` from `astro:assets`, with explicit `widths`/`sizes` for responsive
  images.
- `public/` is only for files that must keep a fixed URL. Do not put content images there.

## UI components

For links styled as buttons and for actions, use the shared components in `src/components/ui/`;
never style a raw `<a>` or `<button>` as a button inside a section. If no shared component fits,
add one there.

### Clickable or not

Visitors on phones have no hover, so the look alone must say what reacts to a finger. Interactive
and informative elements never share a cue.

- A navy hard shadow means "press me": it sits under the whole thing you press. Buttons and round
  icon buttons use `shadow-pressable`, clickable cards and clickable photos use `shadow-card`
  (`PRESSABLE_CARD_CLASSES`), in navy, or `shadow-ink` on dark sections. Nothing else has a navy
  shadow.
- Clickable cards have no outline: a tint fill (cloud by default, or the card's tone) plus the card
  shadow. A plain link card has no badge, since opening a page is what a shadowed card does.
- An action badge (`ActionBadge`, or `ToggleSign` for details) appears only when the tap does
  something else: +/− unfolds, play, phone, external. It is a flat coral circle inside a card;
  only a badge standing alone (`ReadMore`) takes `STANDALONE_BADGE_CLASSES`. Information never has
  a coral circle.
- Information lies flat: no shadow, no navy outline, no badge. Panels holding content (forms,
  details, team cards) keep a mist outline without a frame. Only photos that are not links keep a
  colored frame (`shadow-raised` in coral, sky, mist or blush), never navy.
- Everything pressable sinks into its shadow on tap and on desktop hover (`press-sink` for buttons,
  `card-sink` for cards). A disclosure only sinks while closed. Keyboard focus shows the global sky
  ring.
- Links inside text use `.text-link` (or `.text-link-on-dark`, `.rich-text`): always underlined in
  coral. Navigation lists (header, footers, section bars) are exempt.
- No pills for information: eyebrows are a colored dot plus uppercase text, facts are plain text
  separated by coral dots. Coral fills are reserved for actions.
- Buttons have three levels: `primary` (coral, one per section), `secondary` (paper with navy
  outline), and a text link for low priority. Use the `OnDark` variants on dark sections.
- World Cup pages follow the same rules in their palette: pink (`cup-pink-strong`) replaces coral
  for primary buttons and badges (`ActionBadge tone="cupPink"`), shadows are `cup-ink` on dark and
  `cup-navy` on light, and clickable tiles use a `cup-surface` fill with the card shadow. Their thin outlines are information; pink fills are for actions only.

## Design tokens and responsive

- Mobile first: base utility classes target phones; `sm:`, `md:`, `lg:` only enlarge. Check every
  change at 375px wide before desktop.
- On mobile, each section should fit one screen when possible: at 375 × 812, a section stays within
  the viewport minus the sticky header (about 740px). Rearrange the mobile layout (smaller media,
  side by side blocks, a carousel) rather than letting a section run over several screens.
- Colors, fonts, font sizes, spacing scale, radii, shadows and breakpoints are defined once in the
  `@theme` block of `src/styles/global.css`. Use the utilities they generate.
- Never use arbitrary values (`p-[13px]`, `text-[#1a1a1a]`, `w-[372px]`) or inline `style`
  attributes. If no token fits, add one to `@theme`, keeping the existing scale.
- Shadows share one direction: a hard diagonal offset toward the bottom right, no blur. Use
  `shadow-raised` for photos that are not links, `shadow-card` for clickable cards and photos,
  `shadow-pressable` for buttons and small controls,
  `text-shadow-raised` for text over photos. Their distances grow on desktop by themselves, so never
  add an `md:` shadow size. Change the color with `shadow-<color>` only. Tailwind's default
  shadows are disabled; a new shadow need is a new token in `@theme`, in the same direction.
- Spacing comes from eight named tokens that grow on desktop by themselves (never add an `md:`
  size to them). Generous white space wins: when in doubt, take the larger role.
  - `section`: vertical padding of every section (`py-section`). When two sections in a row share
    a background, the second one drops its top padding (`pb-section`) so the gap stays one step.
  - `page-top`: top padding of a page's first section, under the header (`pt-page-top`).
  - `block`: between big groups inside a section, such as an intro and its grid of cards.
  - `stack`: between the elements of a text group: eyebrow, title, paragraphs, buttons.
  - `grid`: between cards or tiles in a grid or list.
  - `card` and `tile`: inner padding of panels and large cards (`p-card`), of small cards and
    tiles (`p-tile`).
  - `inline`: between items in a row, such as buttons side by side.
- Typography roles (page title, section title, body, caption) are component classes or components;
  sections pick a role, they do not combine raw size and weight utilities.

## Localization

- Astro i18n routing: French is the default locale at the root, English under `/en`.
- Page copy lives in content collections, one entry per locale. Short UI strings (navigation,
  buttons, form labels) live in `src/i18n/ui.ts`, keyed in `camelCase`, grouped by area.
- Never hardcode user-facing strings in components.
- French is the reference: every key and every content entry exists in both locales. A missing
  translation fails the build, it never falls back silently.

## Forms and third parties

- Contact form: Web3Forms. The access key is public by design and lives in `src/lib/site.ts`.
  Always keep the honeypot field and the reply-to set to the visitor's email.
- Registrations and payments: HelloAsso links or embeds. Never collect payment or participant data
  on the site itself.
- Any third-party script needs explicit approval from the user (privacy and performance).

## Testing

- `src/lib/` functions are pure and unit tested with Vitest (`tests/**/*.test.ts`).
- The URL contract test runs against `dist/` after a build: every contract URL exists, every
  redirect resolves to an existing page, every page has one `<h1>`, a title and a description.

## Git

- `dev` is the integration branch and the base for local work: branch from `dev` and open every
  pull request against `dev`.
- `main` is the release branch (every push deploys): it only receives pull requests from `dev`,
  opened by the user when a release is ready.
- Commit messages and PR titles: `type: Capitalized sentence`, with `fix`, `feat`, `refactor` or
  `chore` (e.g. `fix: Restore the English title of the festival page`).

## Agent workflow (reviewers: skip this section)

### Commands

npm scripts only, with the Node version from `.nvmrc`:

- `npm run dev`: local dev server.
- `npm run build`: static build into `dist/`.
- `npm run check`: `astro check` (types and templates).
- `npm run lint` and `npm run format`.
- `npm test`: Vitest, including the URL contract test (needs a build first).

### Running and verification

Claude may run the dev server and builds, and look at pages in the built-in browser to compare them
with the Wix site (prefer the `agent-browser` skill over raw Playwright). Claude never deploys,
never pushes to `main` or `dev`, never opens a pull request against `main`, and never changes DNS,
GitHub Pages settings or third-party accounts: those belong to the user.

### Definition of done

Before calling a task done:

1. `npm run format`.
2. `npm run lint` and `npm run check`.
3. `npm run build` then `npm test`.
4. New or changed copy exists in both locales (see Localization).
5. Changed pages checked at mobile width (375px) and desktop.
6. No URL from the contract changed without a redirect (see SEO and URL contract).
7. `/clean-comments`, when the skill is installed.

### Skills

- Astro and library docs: `context7-auto-research`.
- UI and design: `frontend-design`; review with `web-design-guidelines`.
- Browser checks: `agent-browser`.
- Commit messages and PR descriptions: `/write-summary`.
