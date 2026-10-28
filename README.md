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
