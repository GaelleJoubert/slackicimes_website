import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LOCALES } from "../../src/i18n/locales";
import {
  MAIN_NAVIGATION,
  type NavigationItem,
} from "../../src/i18n/navigation";

const CONTENT_PAGES_DIRECTORY = join(
  import.meta.dirname,
  "..",
  "..",
  "src",
  "content",
  "pages",
);

function flattenNavigation(items: NavigationItem[]): NavigationItem[] {
  return items.flatMap((item) => [
    item,
    ...flattenNavigation(item.children ?? []),
  ]);
}

const navigationSlugs = flattenNavigation(MAIN_NAVIGATION).map(
  (item) => item.pageSlug,
);

describe.each(navigationSlugs)("navigation entry %s", (pageSlug) => {
  it.each(LOCALES)("has a %s content page", (locale) => {
    const contentFile = join(CONTENT_PAGES_DIRECTORY, locale, `${pageSlug}.md`);
    expect(existsSync(contentFile)).toBe(true);
  });
});
