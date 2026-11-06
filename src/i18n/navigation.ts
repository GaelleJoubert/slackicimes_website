import { FAQ_SECTION_ID } from "../lib/site";
import type { Locale } from "./locales";
import { localizedPath } from "./routes";
import type { UiStrings } from "./ui";

export type NavigationLabelKey = keyof UiStrings["navigation"];

export interface NavigationItem {
  pageSlug: string;
  labelKey: NavigationLabelKey;
  sectionId?: string;
  children?: NavigationItem[];
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  { pageSlug: "association", labelKey: "association" },
  { pageSlug: "coupe-du-monde", labelKey: "worldCup" },
  {
    pageSlug: "winter-festislack",
    labelKey: "winterFestislack",
    children: [
      {
        pageSlug: "anciennes-editions-winter-festislack",
        labelKey: "pastEditions",
      },
    ],
  },
  {
    pageSlug: "stages-highline",
    labelKey: "stages",
    children: [
      { pageSlug: "slackcamp", labelKey: "slackcamp" },
      { pageSlug: "stages-jeunes", labelKey: "youthStages" },
      { pageSlug: "inscriptions", labelKey: "registrations" },
      { pageSlug: "livre-d-or", labelKey: "guestbook" },
      {
        pageSlug: "stages-highline",
        labelKey: "faq",
        sectionId: FAQ_SECTION_ID,
      },
    ],
  },
  { pageSlug: "prestations", labelKey: "services" },
  { pageSlug: "contact", labelKey: "contact" },
];

export const FOOTER_SITE_LINKS: NavigationItem[] = [
  { pageSlug: "association", labelKey: "association" },
  { pageSlug: "coupe-du-monde", labelKey: "worldCup" },
  { pageSlug: "winter-festislack", labelKey: "winterFestislack" },
  { pageSlug: "stages-highline", labelKey: "stages" },
  { pageSlug: "slackcamp", labelKey: "slackcamp" },
  { pageSlug: "prestations", labelKey: "services" },
];

export const FOOTER_CONTACT_LINKS: NavigationItem[] = [
  { pageSlug: "inscriptions", labelKey: "registrations" },
  { pageSlug: "livre-d-or", labelKey: "guestbook" },
];

export function navigationHref(item: NavigationItem, locale: Locale): string {
  const pagePath = localizedPath(item.pageSlug, locale);
  return item.sectionId ? `${pagePath}#${item.sectionId}` : pagePath;
}

export function isCurrentNavigationItem(
  item: NavigationItem,
  currentPageSlug: string,
): boolean {
  return item.pageSlug === currentPageSlug && !item.sectionId;
}
