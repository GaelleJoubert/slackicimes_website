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

## Design system: Crête

The V2 site follows the design system « Crête » (Claude Design canvas
https://claude.ai/artifact/MJQquWWGY4BDuNo114r1wn, board "Design system « Crête »"; the
Accueil and Stages highline boards are the reference pages). A calm system that lets the mountain
speak: soft corners, flat colors, no shadows, light typography, large photos, mountain ridges.

When the canvas and this file disagree, this file wins; flag the gap to the user.

### Principles

- Soft: slightly rounded corners, never pills or sharp boxes.
- Flat: no shadow anywhere. Depth comes from flat color blocks, 1px rules and white space.
- Natural: one family of greens from light to deep. Sections alternate these flat colors; coral is
  reserved for actions.
- Photo first: images take the space, without frame or offset. Text sits beside or below a
  photo, rarely on top of it.

### Colors

Defined once in the `@theme` block of `src/styles/global.css`. Use the generated utilities
(`bg-forest`, `text-slate`), never a hex value in a component.

| Token    | Hex       | Role                                             |
| :------- | :-------- | :----------------------------------------------- |
| `snow`   | `#F6F5F1` | page background, text and buttons on dark blocks |
| `moss`   | `#E4EBDA` | fill of clickable cards, tabs, callouts          |
| `lichen` | `#C8D8B0` | light section background                         |
| `rule`   | `#C9D1C2` | 1px rules and outlines                           |
| `stone`  | `#59666A` | secondary text, captions, labels                 |
| `slate`  | `#1D2A2E` | text, secondary buttons, arrow squares           |
| `forest` | `#2E463B` | dark section, eyebrows on light backgrounds      |
| `lake`   | `#2D6A73` | dark section, key figures band, focus ring       |
| `coral`  | `#B5492F` | actions only (primary button, link underline)    |

- Body text on light backgrounds uses slate or `#3B484C` for long paragraphs; on dark blocks use
  snow, with `#C9D4C3` for secondary text.
- Coral never marks information. On dark blocks, link underlines use the light coral
  `#E58A6F`.
- Every text color pair passes WCAG AA (4.5:1, 3:1 from 24px). Check new pairs before using them.

### Typography

Two families, loaded with `@fontsource`: Fraunces (variable, with italic) for the voice,
Hanken Grotesk for information. Sections pick a role class or component; they never combine raw
size and weight utilities.

| Role          | Font and weight     | Size / line height (desktop) |
| :------------ | :------------------ | :--------------------------- |
| Hero title    | Fraunces 500        | 168 / 0.88, home only        |
| Page title    | Fraunces 500        | 88 to 112 / 0.92             |
| Section title | Fraunces 580        | 48 to 52 / 1.05              |
| Card title    | Fraunces 580        | 26 to 28 / 1.15              |
| Accent        | Fraunces 500 italic | in titles, forest color      |
| Key figure    | Fraunces 500 or 580 | 26 to 36 / 1                 |
| Lead          | Hanken 400          | 20 / 1.55                    |
| Body          | Hanken 400          | 17 / 1.65                    |
| Eyebrow       | Hanken 600 capitals | 13, letter spacing 0.14em    |
| Label         | Hanken capitals     | 12, letter spacing 0.12em    |
| Caption       | Hanken 400          | 14 / 1.5                     |

Every eyebrow starts with the line and mountain glyph (a slackline over a ridge). Titles shrink on
phones (page title about 64, section title 36).

### Shapes

- Radius `control` (6px): buttons, inputs, arrow squares, tabs, small panels.
- Radius `card` (10px): cards and photos inside the content.
- No radius: photos that touch the edge of the screen.
- Rules are 1px in `rule`. A block title may carry a 2px slate rule above it.
- No drop shadow, no offset frame, no gradient (the only gradient allowed is the dark shade that
  keeps text readable over the bottom of the hero photo). Tailwind's default shadows stay
  disabled.

### Skylines

Mountain ridges replace straight lines. The profiles live in `src/lib/skylines.ts` (drawn on a
1440 × 100 grid) and render through the shared `Skyline` component; never paste a path into a
page or section.

- Profiles: `crete` (the original ridge), `montBlanc` (Mont Blanc massif seen from Les Arcs),
  `pourri` (Mont Pourri from Arc 1800), `casse` (Grande Casse, Vanoise). Vary profiles from one
  section to the next; a profile may be mirrored horizontally.
- Divider: a straight separator between two content blocks may become a ridge: 2px slate stroke,
  full content width, 40px high (24px on phones). The 1px rules of tables, lists and key facts
  stay straight.
- Edge: the bottom of a colored block may follow a ridge filled with the next block's color,
  72px high (43px on phones). Once or twice per page, so it stays an event. Leave enough bottom
  padding that the ridge never touches content.
- Background: a colored block may carry 2 or 3 white ridges behind its content: 1.5px strokes,
  each one lower and fainter than the previous (85, 45, 20% opacity on lichen; 16, 9, 5% on
  forest or lake). They never sit under long text without a contrast check.
- Skylines are decorative: `aria-hidden="true"`, no interaction, strokes with
  `vector-effect="non-scaling-stroke"` so they keep their width when stretched.

### Clickable or not

Without shadows, the look alone must still tell a phone user what reacts to a finger.
Interactive and informative elements never share a cue.

- Buttons are filled or outlined rectangles with radius `control`, at least 48px high. Three
  levels: `primary` (coral fill, white text, one per section), `secondary` (slate 1.5px outline,
  fills slate on hover), and a text link for low priority. On dark blocks: `onDark` (snow fill,
  slate text) and a text link underlined in light coral.
- A clickable card is a moss fill (snow on a lichen section) with radius `card` and a 44px slate
  arrow square in a corner: the whole card opens a page. On hover or tap the square turns coral
  and the title gets a coral underline. A clickable card has no outline.
- An outlined square (slate 1.5px, radius `control`) announces another action: `+` unfolds a
  disclosure, play, phone, external link. It fills slate once a disclosure is open.
- Links inside text use `.text-link` (`.text-link-on-dark` on dark blocks): always underlined in
  coral. Navigation lists (header, footers, section bars) are exempt.
- Information lies flat: 1px rules, square forest bullets, figures in Fraunces, no fill, no
  arrow, no coral. A moss panel without an arrow square is a callout, not a link. Photos that are
  not links have no frame and no badge.
- No pills for information: eyebrows are the glyph plus capitals, facts are plain text separated
  by rules or dots.
- Keyboard focus shows a lake ring on every interactive element.
- For links styled as buttons and for actions, use the shared components in
  `src/components/ui/`; never style a raw `<a>` or `<button>` inside a section. If no shared
  component fits, add one there.

### World Cup pages

The World Cup pages keep their own palette (pink, navy) until a Crête version is designed in
Claude Design and approved by the user. Do not restyle them on your own.

### Tokens and responsive

- Mobile first: base utility classes target phones; `sm:`, `md:`, `lg:` only enlarge. Check every
  change at 375px wide before desktop.
- On mobile, each section should fit one screen when possible: at 375 × 812, a section stays within
  the viewport minus the sticky header (about 740px). Rearrange the mobile layout (smaller media,
  side by side blocks, a carousel) rather than letting a section run over several screens.
- Colors, fonts, font sizes, spacing, radii and breakpoints are defined once in the `@theme`
  block of `src/styles/global.css`. Never use arbitrary values (`p-[13px]`, `text-[#1a1a1a]`) or
  inline `style` attributes. If no token fits, add one to `@theme`, keeping the existing scale.
- Spacing comes from eight named tokens that grow on desktop by themselves (never add an `md:`
  size to them). Generous white space wins: when in doubt, take the larger role. Values are
  phone, then desktop.
  - `section` (72, 128): vertical padding of every section (`py-section`). When two sections in
    a row share a background, the second one drops its top padding.
  - `page-top` (64, 120): top padding of a page's first section, under the header.
  - `block` (48, 72): between big groups inside a section, such as an intro and its grid.
  - `stack` (16, 24): between the elements of a text group: eyebrow, title, paragraphs, buttons.
  - `grid` (24, 32): between cards or tiles in a grid or list.
  - `card` (28, 40) and `tile` (20, 24): inner padding of panels and large cards, of small cards
    and tiles.
  - `inline` (12, 16): between items in a row, such as buttons side by side.
- Content width: 1280px maximum, with 40px side padding on desktop and 20px on phones.

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
