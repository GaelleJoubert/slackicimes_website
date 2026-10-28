import { LOCALES, type Locale } from "./locales";
import { parseContentId } from "./routes";

interface OrderedEntry {
  id: string;
  data: { order: number };
}

function findMissingTranslations(contentIds: string[]): string[] {
  const existingIds = new Set(contentIds);
  const entrySlugs = new Set(contentIds.map(entrySlug));
  return [...entrySlugs].flatMap((entrySlug) =>
    LOCALES.map((locale) => `${locale}/${entrySlug}`).filter(
      (expectedId) => !existingIds.has(expectedId),
    ),
  );
}

export function assertTranslationsComplete(
  collectionName: string,
  contentIds: string[],
): void {
  const missingIds = findMissingTranslations(contentIds);
  if (missingIds.length > 0) {
    throw new Error(
      `Collection "${collectionName}" is missing translations: ${missingIds.join(", ")}.`,
    );
  }
}

export function entrySlug(contentId: string): string {
  return parseContentId(contentId).pageSlug;
}

export function entriesForLocale<Entry extends OrderedEntry>(
  entries: Entry[],
  locale: Locale,
): Entry[] {
  return entries
    .filter((entry) => parseContentId(entry.id).locale === locale)
    .sort((first, second) => first.data.order - second.data.order);
}
