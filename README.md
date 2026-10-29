# Slack'icîmes website

Source of [www.slackicimes.org](https://www.slackicimes.org), the website of the Slack'icîmes highline association. Built with Astro and Tailwind CSS, deployed to GitHub Pages.

## Development

Requires the Node version in `.nvmrc`.

```bash
npm install
npm run dev
```

| Command          | Purpose                                     |
| ---------------- | ------------------------------------------- |
| `npm run dev`    | Local dev server                            |
| `npm run build`  | Static build into `dist/`                   |
| `npm test`       | Unit tests and URL contract (after a build) |
| `npm run lint`   | ESLint                                      |
| `npm run check`  | Astro type checks                           |
| `npm run format` | Prettier                                    |

Work happens on feature branches created from `dev`, merged back into `dev` through pull requests. `main` is the release branch: merging `dev` into `main` deploys the site, since every push to `main` is built and deployed by `.github/workflows/deploy.yml` (pull requests are built but not deployed). Scope and architecture: `docs/project.md`.

Design tokens (colors, fonts, typography roles such as `page-title`, `section-title`, `timeline-title`, shadows and radii) live in `src/styles/global.css`, following the Claude Design redesign. Shared UI components live in `src/components/ui/`: layout (`Container`, `SectionIntro`, `Eyebrow`, `HighlightedText`), actions (`LinkButton`, `SubmitButton`, `NavigationLink`, `LanguageSwitcher`), cards and tiles (`CourseCard`, `ActivityCard`, `CalloutCard`, `QuoteCard`, `FactTile`, `KeyFactsBand`, `Stat`, `StepList`), lists (`DotList`, `InlineDotList`, `Timeline`, `TimelineEntry`), disclosures (`Disclosure`, `ReadMore`, `ToggleSign`), media (`FramedPicture`, `PhotoStrip`, `PhotoMosaic`, `PhotoGrid`, `VideoEmbed`), decoration (`SlacklineDivider`, `SlacklineIllustration`, `ChevronIcon`, `PlayIcon`) and forms (`TextField`, `ContactDetails`). Page sections live in `src/components/sections/`, with one folder per page (`home`, `stages`, `youth`, `past-editions`, `association`, `guestbook`, `contact`, `world-cup`) and shared ones at the root (site header and footers, FAQ, testimonials, contact block and form). The guestbook pages its testimonials with a small script; every testimonial stays in the HTML. Menu entries are declared in `src/i18n/navigation.ts` and their labels in `src/i18n/ui.ts`.

The World Cup page (`/coupe-du-monde`) follows its own Claude Design look: `cup-*` color tokens and typography roles in `src/styles/global.css`, self-hosted Clash Display and Inter fonts, and its sections in `src/components/sections/world-cup/`.
