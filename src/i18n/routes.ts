import { absoluteUrl } from "../lib/seo";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_SETTINGS,
  isLocale,
  type Locale,
} from "./locales";

const DEFAULT_HREFLANG = "x-default";

export interface AlternateLink {
  hreflang: string;
  href: string;
}

export interface LocalizedPage {
  locale: Locale;
  pageSlug: string;
}

export function localizedPath(pageSlug: string, locale: Locale): string {
  const localePrefix = locale === DEFAULT_LOCALE ? "" : locale;
  const segments = [localePrefix, pageSlug].filter(Boolean);
  return `/${segments.join("/")}`;
}

export function buildAlternateLinks(pageSlug: string): AlternateLink[] {
  const localeLinks = LOCALES.map((locale) => ({
    hreflang: LOCALE_SETTINGS[locale].hreflang,
    href: absoluteUrl(localizedPath(pageSlug, locale)),
  }));
  const defaultLink = {
    hreflang: DEFAULT_HREFLANG,
    href: absoluteUrl(localizedPath(pageSlug, DEFAULT_LOCALE)),
  };
  return [...localeLinks, defaultLink];
}

// The glob loader turns "<locale>/index.md" into the bare "<locale>" id.
export function parseContentId(contentId: string): LocalizedPage {
  const [localeSegment = "", pageSlug = ""] = contentId.split("/");
  if (!isLocale(localeSegment)) {
    throw new Error(
      `Content id "${contentId}" must start with a locale among ${LOCALES.join(", ")}.`,
    );
  }
  return { locale: localeSegment, pageSlug };
}

export function toRestRouteParam(path: string): string | undefined {
  const pathWithoutLeadingSlash = path.slice(1);
  return pathWithoutLeadingSlash || undefined;
}
