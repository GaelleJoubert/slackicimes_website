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

Every push to `main` is built and deployed by `.github/workflows/deploy.yml`. Scope and architecture: `docs/project.md`.

Design tokens (colors inspired by the Wix theme, fonts, typography roles) live in `src/styles/global.css`. Shared UI components (`Container`, `Section`, `SectionHeading`, `LinkButton`, `NavigationLink`, `LanguageSwitcher`, `Disclosure`, `Quote`, `ImageCard`, `ImageGallery`, `ContactDetails`, `TextField`, `SubmitButton`) live in `src/components/ui/`; page sections (site header and footer, home highlights, feature blocks, festival gallery, stage overview and details, FAQ, testimonials, contact details, contact form) in `src/components/sections/`. Menu entries are declared in `src/i18n/navigation.ts` and their labels in `src/i18n/ui.ts`.
