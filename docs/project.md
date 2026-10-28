# Slack'icîmes website: scope, architecture, plan

## Goal

Replace the Wix site at https://www.slackicimes.org with an open source static site, without losing search rankings.

1. **Phase 1: replica.** Same pages, same URLs, same text, same SEO metadata, in French and English. Responsive, mobile first (72% of search clicks come from mobile).
2. **Phase 2: redesign.** New visual identity (Claude Design), integrated into the same components. URLs and SEO setup do not change.

The step by step migration checklist lives in the shared doc: https://claude.ai/artifact/UyGs3pBgsSqtvwDE7EGEDf

## Stack

| Need                       | Choice                                                                                             |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| Framework                  | Astro (static output) + Tailwind CSS                                                               |
| Hosting                    | GitHub Pages, deployed by GitHub Actions on push to `main`                                         |
| Domain and DNS             | OVH (domain only)                                                                                  |
| Contact form               | Web3Forms (public access key, honeypot spam field)                                                 |
| Registrations and payments | HelloAsso (already used by the association), linked or embedded                                    |
| Videos                     | YouTube embeds through youtube-nocookie.com (approved by the user); Facebook videos as plain links |
| Tests                      | Vitest                                                                                             |

No server, no database, no client side framework. JavaScript ships only where a component truly needs it.

## URL contract

Every URL Google knows must keep working after the switch. `migration/wix-inventory.json` is the source of truth for the old site (titles, descriptions, headings, text, images, links).

### Pages (French at the root, English under `/en`)

| French                                  | English                                    | Search clicks (16 months) |
| --------------------------------------- | ------------------------------------------ | ------------------------- |
| `/stages-highline`                      | `/en/stages-highline`                      | 932 / 35                  |
| `/`                                     | `/en`                                      | 691 / 89                  |
| `/winter-festislack`                    | `/en/winter-festislack`                    | 333 / 126                 |
| `/association`                          | `/en/association`                          | 66 / 0                    |
| `/stages-jeunes`                        | `/en/stages-jeunes`                        | 15 / 0                    |
| `/contact`                              | `/en/contact`                              | 4 / 0                     |
| `/inscriptions`                         | `/en/inscriptions`                         | 2 / 0                     |
| `/livre-d-or`                           | `/en/livre-d-or`                           | 0 / 0                     |
| `/anciennes-editions-winter-festislack` | `/en/anciennes-editions-winter-festislack` | new URL                   |

The top three pages carry 87% of clicks: copy them with the most care.

### Redirects

GitHub Pages serves static files only, so redirects are Astro `redirects` entries (instant meta refresh, which Google treats as permanent). Always point straight at the final URL, never chain.

| Old URL                                                               | Target                                     |
| --------------------------------------------------------------------- | ------------------------------------------ |
| `/copie-de-winter-festislack`, `/old-winterfestislack-editions`       | `/anciennes-editions-winter-festislack`    |
| `/en/copie-de-winter-festislack`, `/en/old-winterfestislack-editions` | `/en/anciennes-editions-winter-festislack` |
| `/event-details/*` (9 past 2024 events)                               | `/stages-highline`                         |
| `/prestations` (removed page, 1 search click)                         | `/contact`                                 |
| `/en/prestations`                                                     | `/en/contact`                              |
| `/inscriptions-winter-festislack` (removed page, 1 search click)      | `/winter-festislack`                       |
| `/en/inscriptions-winter-festislack`                                  | `/en/winter-festislack`                    |
| `/expeditions` (removed page)                                         | `/association`                             |
| `/en/expeditions`                                                     | `/en/association`                          |

Bare domain to `www` and HTTP to HTTPS are handled by GitHub Pages with real 301s.

## SEO rules

- Canonical URL on `https://www.slackicimes.org`, no trailing slash, matching the Wix URLs exactly.
- `hreflang` alternates on every page: `fr-fr`, `en-us`, and `x-default` pointing to French (same as Wix today).
- One H1 per page. Unique title and meta description per page and per language.
- Every content image has a meaningful alt text in the page's language.
- Structured data: `WebSite` and `Organization` site wide, `Event` for stages and the festival.
- `sitemap-index.xml` (both languages, with hreflang) generated at build time; `robots.txt` points to it. Resubmit it in Search Console at cutover (Wix used `sitemap.xml`).
- Pages are `noindex` unless the build runs with `SITE_INDEXABLE=true`. In CI it comes from the repository variable `SITE_INDEXABLE`: set it to `true` only at cutover.

## Architecture

```
src/
  pages/            routes only: thin files that pick content and compose sections
    [...locale]/    one file per page, built at /<slug> (French) and /en/<slug> (English)
  layouts/          BaseLayout owns <head>: SEO tags, hreflang, structured data
  components/
    ui/             presentational building blocks (Button, Card, Section, Image)
    sections/       page sections built from ui components (Hero, StageList, Faq)
  content/          content collections, one entry per locale: pages, stages, faq, testimonials
  i18n/             locale config, UI strings, French/English route mapping
  lib/              pure functions: SEO metadata, structured data builders, URL helpers
  styles/           global.css with the Tailwind @theme design tokens
  assets/images/    content images, optimized at build
public/             robots.txt, favicons, static files served as is
tests/              unit tests for lib, URL contract test
migration/          Wix inventory (read only reference for the replica)
```

Every localized collection must hold each entry in both locales: `getLocalizedCollection` fails the build on a missing translation.

Dependency direction: `pages` depend on `layouts`, `sections` and `content`; `sections` depend on `ui`; everything may use `lib` and `i18n`; `lib` depends on nothing in the project. Content never contains layout, components never hardcode copy.

## Testing

- `lib` functions are pure and unit tested.
- A URL contract test builds the site and checks that every URL in the table above exists in `dist/`, and that every redirect points to an existing page.
- Before each release: Lighthouse on the top three pages (mobile), and a link check.

## Open questions

- GitHub Pages may redirect `/en` to `/en/` because an `en/` folder exists next to `en.html`. Check on the first deployment; if it does, decide between accepting `/en/` as the canonical or another layout.
- The custom domain is set in the repository's Pages settings (Actions deployments ignore a `CNAME` file).

- Which page each backlink (lesarcs.com, explore-savoie.com, slacklinesport.org) targets: the export does not say.
- English page titles still in French on Wix (`/en/association`): translate in Phase 1 or keep as is?
- `/en/anciennes-editions-winter-festislack` is empty on Wix: translate or point it to the French page.
