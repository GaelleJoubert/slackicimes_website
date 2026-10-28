import type { UiStrings } from "./ui";

export type NavigationLabelKey = keyof UiStrings["navigation"];

export interface NavigationItem {
  pageSlug: string;
  labelKey: NavigationLabelKey;
  children?: NavigationItem[];
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  { pageSlug: "association", labelKey: "association" },
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
      { pageSlug: "stages-jeunes", labelKey: "youthStages" },
      { pageSlug: "inscriptions", labelKey: "registrations" },
      { pageSlug: "livre-d-or", labelKey: "guestbook" },
    ],
  },
  { pageSlug: "contact", labelKey: "contact" },
];
