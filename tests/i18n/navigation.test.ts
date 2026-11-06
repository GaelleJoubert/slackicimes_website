import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LOCALES } from "../../src/i18n/locales";
import {
  MAIN_NAVIGATION,
  isCurrentNavigationItem,
  navigationHref,
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

describe("section navigation entries", () => {
  const sectionItem: NavigationItem = {
    pageSlug: "stages-highline",
    labelKey: "faq",
    sectionId: "faq",
  };

  it("links to the section of the localized page", () => {
    expect(navigationHref(sectionItem, "en")).toBe("/en/stages-highline#faq");
  });

  it("never marks the section as the current page", () => {
    expect(isCurrentNavigationItem(sectionItem, "stages-highline")).toBe(false);
  });
});
