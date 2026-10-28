import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { assertTranslationsComplete, entriesForLocale } from "./content";
import type { Locale } from "./locales";
import { pageContentId } from "./routes";

type LocalizedCollectionName = "stages" | "faq" | "testimonials";

export async function getLocalizedCollection<
  Name extends LocalizedCollectionName,
>(collectionName: Name, locale: Locale): Promise<CollectionEntry<Name>[]> {
  const entries: CollectionEntry<Name>[] = await getCollection(collectionName);
  assertTranslationsComplete(
    collectionName,
    entries.map((entry) => entry.id),
  );
  return entriesForLocale(entries, locale);
}

export async function getPageEntry(
  pageSlug: string,
  locale: Locale,
): Promise<CollectionEntry<"pages">> {
  const contentId = pageContentId(pageSlug, locale);
  const page = await getEntry("pages", contentId);
  if (!page) {
    throw new Error(
      `Missing page content "${contentId}": add src/content/pages/${contentId}.md.`,
    );
  }
  return page;
}
