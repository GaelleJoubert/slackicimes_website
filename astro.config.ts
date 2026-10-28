import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import { DEFAULT_LOCALE, LOCALES, LOCALE_SETTINGS } from "./src/i18n/locales";
import { LEGACY_REDIRECTS } from "./src/lib/redirects";
import { absoluteUrl } from "./src/lib/seo";
import { SITE_ORIGIN } from "./src/lib/site";

const legacyRedirectUrls = new Set(
  Object.keys(LEGACY_REDIRECTS).map((path) => absoluteUrl(path)),
);

const sitemapLanguages = Object.fromEntries(
  LOCALES.map((locale) => [locale, LOCALE_SETTINGS[locale].sitemapLanguage]),
);

export default defineConfig({
  site: SITE_ORIGIN,
  // Wix URLs have no trailing slash; "file" output lets GitHub Pages serve them as is.
  trailingSlash: "never",
  build: { format: "file" },
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
  },
  redirects: LEGACY_REDIRECTS,
  env: {
    schema: {
      SITE_INDEXABLE: envField.boolean({
        context: "server",
        access: "public",
        default: false,
      }),
    },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: DEFAULT_LOCALE, locales: sitemapLanguages },
      filter: (pageUrl) => !legacyRedirectUrls.has(pageUrl),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
