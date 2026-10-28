import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { assertTranslationsComplete, entriesForLocale } from "./content";
import type { Locale } from "./locales";
import { pageContentId } from "./routes";

type LocalizedCollectionName =
  "stages" | "faq" | "testimonials" | "team" | "festivalEditions";

type SingleEntryCollectionName = "home" | "festival" | "association";

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

export async function getSingleEntryContent<
  Name extends SingleEntryCollectionName,
>(collectionName: Name, locale: Locale): Promise<CollectionEntry<Name>> {
  const entries: CollectionEntry<Name>[] = await getCollection(collectionName);
  const content = entries.find((entry) => entry.id === locale);
  if (!content) {
    throw new Error(
      `Missing "${collectionName}" content for "${locale}": add a ${locale}.yaml entry to that collection.`,
    );
  }
  return content;
}

export async function getGallery(
  gallerySlug: string,
  locale: Locale,
): Promise<CollectionEntry<"galleries">> {
  const contentId = pageContentId(gallerySlug, locale);
  const gallery = await getEntry("galleries", contentId);
  if (!gallery) {
    throw new Error(
      `Missing gallery "${contentId}": add src/content/galleries/${contentId}.yaml.`,
    );
  }
  return gallery;
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
