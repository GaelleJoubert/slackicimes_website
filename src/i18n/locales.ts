export const LOCALES = ["fr", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

interface LocaleSettings {
  htmlLang: string;
  hreflang: string;
  sitemapLanguage: string;
  openGraphLocale: string;
}

export const LOCALE_SETTINGS: Record<Locale, LocaleSettings> = {
  fr: {
    htmlLang: "fr",
    hreflang: "fr-fr",
    sitemapLanguage: "fr-FR",
    openGraphLocale: "fr_FR",
  },
  en: {
    htmlLang: "en",
    hreflang: "en-us",
    sitemapLanguage: "en-US",
    openGraphLocale: "en_US",
  },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
